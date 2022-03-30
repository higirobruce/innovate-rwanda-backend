/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
import db from '../models';
import generic from '../helpers/Generic';

import responseWrapper from '../helpers/responseWrapper';
import { NOT_FOUND, OK } from '../constants/statusCodes';

import * as events from '../constants/eventNames';
import { eventEmitter } from '../config/eventEmitter';

const logger = require('../helpers/LoggerMod');

/**
 * Blog class controller
 */
export default class BlogController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async blogPost(req, res) {
    const { activities } = req.body;
    const fields = req.body;
    const author = req.user;
    const blog = await db.Blog.create({
      title: fields.title,
      content: fields.content,
      category: fields.category,
      companyId: author.companyId,
      author: author.id,
      image: fields.image,
      status: fields.status,
    });

    const activitiesToLoad = [];
    for (let i = 0; i < activities.length; i++) {
      activitiesToLoad.push({ typeOfPost: 'blog', postId: blog.id, activityId: activities[i] });
    }
    if (activitiesToLoad.length > 0) {
      await db.AudienceForPost.bulkCreate(activitiesToLoad);
    }


    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: author,
      description: `${author.firstName} ${author.lastName} published a blog post titled '${fields.title}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Blog saved'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async approveOrDeclineBlogPost(req, res) {
    const { decision } = req.body;
    const blog = await db.Blog.findOne({ where: { id: req.body.blogId, status: { [db.Op.not]: decision } }, attributes: ['id', 'title', 'content', 'image', 'companyId'] });

    if (!blog) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Blog  could have been already treated'
      });
    }
    await blog.update({ status: decision });
    if (decision === 'approved') {
      const parameters = {
        id: req.body.blogId, title: blog.title, description: blog.content, file_name: blog.image, format: 'Blog', companyId: blog.companyId
      };

      eventEmitter.emit(events.NOTIFY, {
        type: 'post approval',
        parameters
      });

      return responseWrapper({
        res,
        status: OK,
        message: 'Post approved'
      });
    }
    return responseWrapper({ res, status: OK, message: `Blog ${decision}` });
  }

  /**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} Response
 */
  static async manageBlogPost(req, res) {
    const { decision } = req.body;
    const blog = await db.Blog.findOne({ where: { id: req.body.blogId, status: { [db.Op.not]: decision } }, attributes: ['id', 'title', 'content', 'image', 'companyId', 'messages'] });
    if (blog) {
      if (req.body.message) {
        if (blog.messages) {
          blog.messages[blog.messages.length] = req.body.message;
        } else {
          blog.messages = [];
          blog.messages[0] = req.body.message;
        }
        await blog.update({ status: decision, messages: blog.messages });
      } else {
        await blog.update({ status: decision });
      }
      if (decision === 'approved') {
        const parameters = {
          id: req.body.blogId, title: blog.title, description: blog.content, file_name: blog.image, format: 'Blog', companyId: blog.companyId
        };
        eventEmitter.emit(events.LOG_ACTIVITY, {
          actor: req.user,
          description: `${req.user.firstName} ${req.user.lastName} has approved a blog titled '${blog.title}'`
        });

        eventEmitter.emit(events.NOTIFY, {
          type: 'post approval',
          parameters,
        });

        return responseWrapper({
          res,
          status: OK,
          message: 'Post approved'
        });
      }
      res.status(200).json({ message: `Blog ${decision}` });
    } else {
      res.status(404).json({ message: 'Blog  could have been already treated' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getApprovedBlogsList(req, res) {
    let where = { status: 'approved' };
    const {
      companyType,
      topic,
      year,
      orderType,
      orderValue,
      search,
    } = req.query;

    try {
      if (companyType) {
        let companiesId;
        await generic.getCompaniesIdPerType(companyType, (theCompanies) => {
          companiesId = theCompanies.map(company => company.id);
        });
        where = {
          ...where,
          companyId: { [db.Op.in]: companiesId },
        };
      }
      if (topic) {
        let postsId;
        await generic.getPostsIdPerActivity('blog', topic, (thepostsId) => {
          postsId = thepostsId.map(postId => postId.postId);
        });
        if (postsId) {
          where = {
            ...where,
            id: { [db.Op.in]: postsId }
          };
        }
      }
      if (year) {
        where = {
          ...where,
          [db.Op.and]: db.sequelize.where(db.sequelize.literal('EXTRACT(YEAR FROM "Blog"."updatedAt")'), year),
        };
      }
      // manage search query
      if (search) {
        const search_value = search.trim();
        where = {
          ...where,
          [db.Op.or]: [
            { title: { [db.Op.iLike]: `%${search_value}%` } },
            { content: { [db.Op.iLike]: `%${search_value}%` } },
            { category: { [db.Op.iLike]: `%${search_value}%` } }
          ],
        };
      }
      // manage orders
      let orderT;
      if (orderType === 'title') {
        orderT = 'title';
      } else {
        orderT = 'updatedAt';
      }
      const order = [[orderT, orderValue || 'DESC']];

      const blogPosts = await db.Blog.findAll({
        where,
        order,
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('Blog.id'),
                  db.Op.eq,
                  db.sequelize.col('AudienceForPosts.postId')
                ),
                db.sequelize.where(
                  db.sequelize.col('AudienceForPosts.typeOfPost'),
                  db.Op.eq,
                  'blog'
                )
              ],
            },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.activityId'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                  )],
              },
            }]
          }
        ],
      });
      if (blogPosts && blogPosts.length > 0) {
        return res.status(200).json({
          result: blogPosts,
        });
      }
      return res.status(404).json({
        result: [],
        error: 'No blog posts found at this moment',
      });
    } catch (error) {
      // console.log(error)
      logger.customLogger.log('error', error);
      return res
        .status(400)
        .send({ message: 'No blogs found at this moment' });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getBlogsListPerCompany(req, res) {
    const blogPosts = await db.Blog
      .findAll({
        where: {
          companyId: req.params.companyId,
          status: {
            [db.Op.not]: 'deleted'
          }
        },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('Blog.id'),
                  db.Op.eq,
                  db.sequelize.col('AudienceForPosts.postId')
                ),
                db.sequelize.where(
                  db.sequelize.col('AudienceForPosts.typeOfPost'),
                  db.Op.eq,
                  'blog'
                )
              ],
            },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.activityId'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                  )],
              },
            }]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
    if (blogPosts && blogPosts.length > 0) {
      return res.status(200).json({
        result: blogPosts,
      });
    }
    return res.status(404).json({
      result: [],
      error: 'No Blog Posts found',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getBlogsList(req, res) {
    let blogPosts;
    if (req.params.status === 'all') {
      blogPosts = await db.Blog
        .findAll({
          include: [
            { model: db.Company, attributes: [['coName', 'companyName']] },
            { model: db.User, attributes: ['firstName', 'lastName'] },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Blog.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'blog'
                  )
                ],
              },
              include: [{
                model: db.BusinessActivities,
                attributes: ['name'],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.activityId'),
                      db.Op.eq,
                      db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                    )],
                },
              }]
            }
          ],
          order: [['createdAt', 'DESC']]
        });
    } else {
      blogPosts = await db.Blog
        .findAll({
          where: {
            status: req.params.status,
          },
          include: [
            { model: db.Company, attributes: [['coName', 'companyName']] },
            { model: db.User, attributes: ['firstName', 'lastName'] },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Blog.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'blog'
                  )
                ],
              },
              include: [{
                model: db.BusinessActivities,
                attributes: ['name'],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.activityId'),
                      db.Op.eq,
                      db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                    )],
                },
              }]
            }
          ],
          order: [['createdAt', 'DESC']]
        });
    }
    if (blogPosts && blogPosts.length > 0) {
      return res.status(200).json({
        result: blogPosts,
      });
    }
    return res.status(404).json({
      result: [],
      error: 'No Blog Posts found',
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getBlogInfo(req, res) {
    const blog = await db.Blog
      .findOne({
        where: {
          id: req.params.blogId,
        },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('Blog.id'),
                  db.Op.eq,
                  db.sequelize.col('AudienceForPosts.postId')
                ),
                db.sequelize.where(
                  db.sequelize.col('AudienceForPosts.typeOfPost'),
                  db.Op.eq,
                  'blog'
                )
              ],
            },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.activityId'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                  )],
              },
            }]
          }
        ]
      });
    return blog
      ? res.status(200).json({
        result: blog
      })
      : res.status(404).json({
        error: 'Sorry, Blog not found',
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async editBlogInfo(req, res) {
    const update = await db.Blog
      .update((req.body), {
        where: {
          id: req.params.blogId
        },
      });
    return update
      ? res.status(200).json({
        result: 'Edited Successfully'
      })
      : res.status(404).json({
        error: 'Sorry, No record edited',
      });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async deleteBlog(req, res) {
    const foundBlog = await db.Blog.findOne({
      where: {
        id: req.params.blogId
      }
    });

    if (!foundBlog) {
      return responseWrapper({
        res,
        status: NOT_FOUND,
        message: 'Blog not found',
      });
    }


    await foundBlog.update({
      status: 'deleted'
    });

    eventEmitter.emit(events.LOG_ACTIVITY, {
      actor: req.user,
      description: `${req.user.firstName} deleted a blog titled '${foundBlog.title}'`
    });

    return responseWrapper({
      res,
      status: OK,
      message: 'Blog has been deleted successfully'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getBlogsFiltered(req, res) {
    const { filterBy } = req.query;
    const filterValue = req.query.filterValue.trim();
    let blogPosts;

    if (filterBy === 'company') {
      blogPosts = await db.Blog.findAll({
        where: { companyId: filterValue, status: 'approved' },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Blog.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'blog')] },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
            }]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
    } else if (filterBy === 'company-type') {
      let companiesId;
      await generic.getCompaniesIdPerType(filterValue, (theCompanies) => {
        companiesId = theCompanies.map(company => company.id);
      });

      blogPosts = await db.Blog.findAll({
        where: { companyId: { [db.Op.in]: companiesId }, status: 'approved' },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Blog.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'blog')] },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
            }]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
    } else if (filterBy === 'topic') {
      let postsId;
      await generic.getPostsIdPerActivity('blog', filterValue, (thepostsId) => {
        postsId = thepostsId.map(postId => postId.postId);
      });

      blogPosts = await db.Blog.findAll({
        where: { id: { [db.Op.in]: postsId }, status: 'approved' },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Blog.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'blog')] },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
            }]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
    } else if (filterBy === 'year') {
      blogPosts = await db.Blog.findAll({
        where: { status: 'approved', [db.Op.and]: db.sequelize.where(db.sequelize.literal('EXTRACT(YEAR FROM "Blog"."updatedAt")'), filterValue) },
        include: [
          { model: db.Company, attributes: [['coName', 'companyName']] },
          { model: db.User, attributes: ['firstName', 'lastName'] },
          {
            model: db.AudienceForPost,
            attributes: [['activityId', 'activity']],
            on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Blog.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'blog')] },
            include: [{
              model: db.BusinessActivities,
              attributes: ['name'],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] }
            }]
          }
        ],
        order: [['updatedAt', 'DESC']]
      });
    }

    if (blogPosts && blogPosts.length > 0) {
      return res.status(200).json({ result: blogPosts });
    }
    return res.status(404).json({ result: [], error: 'No Blog Posts found' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async getBlogsSorted(req, res) {
    const { sortBy } = req.query;
    const sortValue = req.query.sortValue.trim();
    let blogPosts;

    if (sortValue === 'desc' || sortValue === 'asc') {
      if (sortBy === 'date') {
        blogPosts = await db.Blog.findAll({
          where: { status: 'approved' },
          include: [
            { model: db.Company, attributes: [['coName', 'companyName']] },
            { model: db.User, attributes: ['firstName', 'lastName'] },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Blog.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'blog')] },
              include: [{
                model: db.BusinessActivities,
                attributes: ['name'],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] }
              }]
            }
          ],
          order: [['updatedAt', sortValue]]
        });
      } else if (sortBy === 'title') {
        blogPosts = await db.Blog.findAll({
          where: { status: 'approved' },
          include: [
            { model: db.Company, attributes: [['coName', 'companyName']] },
            { model: db.User, attributes: ['firstName', 'lastName'] },
            {
              model: db.AudienceForPost,
              attributes: [['activityId', 'activity']],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Blog.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'blog')] },
              include: [{
                model: db.BusinessActivities,
                attributes: ['name'],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] }
              }]
            }
          ],
          order: [['title', sortValue]]
        });
      }
    }
    if (blogPosts && blogPosts.length > 0) {
      return res.status(200).json({ result: blogPosts });
    }
    return res.status(404).json({ result: [], error: 'No Blog Posts found' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response
   */
  static async searchForBlogs(req, res) {
    const searchValue = req.query.searchValue.trim();
    generic.searchForBlogs(searchValue, result => res.status(result[0]).send(result[1]));
  }
}
