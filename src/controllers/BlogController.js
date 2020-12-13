import db from "../models";

export default class BlogController {
  static async blogPost(req, res) {
    try {
      const response = await db['Blog'].create(req.body);
      if (response) {
        return res.status(200).send({
          message: "Blog Submitted",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " Blog not posted at this moment" });
    }
  }

  static async approveOrDeclineBlogPost(req, res) {
    // To do: Do more here, once approved send notifications right away or?
    try {
      const response = await db['Blog']
        .update(
          { status: req.body.decision },
          {
            where: {
              id: req.body.blogId,
            },
          }
        );
      return res.status(200).json({
        message: response
      })
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Action failed" });
    }
  }

  static async getApprovedBlogsList(req, res) {
    try {
      const blogPosts = await db["Blog"].findAll({
        where: {
          status: "approved",
        },
        order: [['createdAt', 'DESC']],
        raw: true,
      });
      if (blogPosts && blogPosts.length > 0) {
        return res.status(200).json({
          result: blogPosts,
        });
      }
      return res.status(404).json({
        result: [],
        error: "No blog posts found at this moment",
      });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "No blogs found at this moment" });
    }
  }

  static async getBlogsListPerCompany(req, res) {
    try {
      // companyId is slug
      const blogPosts = await db['Blog']
        .findAll({
          where: {
            companyId: req.params.companyId,
            status: {
              [db.Op.not]: 'deleted'
            }
          },
          order: [['createdAt', 'DESC']]
        });
      if (blogPosts && blogPosts.length > 0) {
        return res.status(200).json({
          result: blogPosts,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Blog Posts found",
        });
      }
    } catch (err) {
      return res.status(400).send({ message: " List of blogs not got at this moment" });
    }
  }

  static async getBlogsList(req, res) {
    try {
      var blogPosts;
      if (req.params.status == "all") {
        blogPosts = await db['Blog']
          .findAll({
            order: [['createdAt', 'DESC']]
          });
      } else {
        blogPosts = await db['Blog']
          .findAll({
            where: {
              status: req.params.status,
            },
            order: [['createdAt', 'DESC']]
          });
      }
      if (blogPosts && blogPosts.length > 0) {
        return res.status(200).json({
          result: blogPosts,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Blog Posts found",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " List of blogs not got at this moment" });
    }
  }

  static async getBlogInfo(req, res) {
    try {
      const blog = await db["Blog"]
        .findOne({
          where: {
            id: req.params.blogId,
          },
          raw: true,
        });
      return blog
        ? res.status(200).json({
          result: blog
        })
        : res.status(404).json({
          error: "Sorry, Blog not found",
        });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Blog not found" });
    }
  }

  static async editBlogInfo(req, res) {
    try {
      const update = await db["Blog"]
        .update((req.body), {
          where: {
            id: req.params.blogId
          },
        });
      return update
        ? res.status(200).json({
          result: "Edited Successfully"
        })
        : res.status(404).json({
          error: "Sorry, No record edited",
        });
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Edit failed" });
    }
  }

  static async deleteBlog(req, res) {
    try {
      const response = await db['Blog']
        .update(
          { status: "deleted" },
          {
            where: {
              id: req.params.blogId,
            },
          }
        );
      return response
        ? res.status(200).json({
          message: "Deleted Successfully"
        })
        : res.status(404).json({
          message: "Sorry, No record deleted"
        });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Action failed" });
    }
  }

  static async getBlogsFiltered(req, res) {
    try {
      const filterBy = req.body.filterBy;
      const filterValue = req.body.filterValue;
      var blogPosts;
      if (filterBy == "company") {
        blogPosts = await db['Blog']
          .findAll({
            where: {
              companyId: filterValue,
              status: "approved"
            },
            order: [['createdAt', 'DESC']]
          });
      } else if (filterBy == "topic") {
        let likeOp = db.Op.like;
        blogPosts = await db['Blog']
          .findAll({
            where: {
              status: "approved",
              tags: {
                [likeOp]: "%" + filterValue + "%"
              }
            },
            order: [['createdAt', 'DESC']]
          });
      } else if (filterBy == "year") {
        let andOp = db.Op.and;
        blogPosts = await db['Blog']
          .findAll({
            where: {
              status: "approved",
              andOp: db.sequelize.where(db.sequelize.literal('EXTRACT(YEAR FROM "Blog"."updatedAt")'), filterValue)
            },
            order: [['updatedAt', 'DESC']]
          });
      }
      if (blogPosts && blogPosts.length > 0) {
        return res.status(200).json({
          result: blogPosts,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Blog Posts found",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: " List of blogs not got at this moment" });
    }
  }

  static async getBlogsSorted(req, res) {
    try {
      const sortBy = req.body.sortBy;
      const sortValue = req.body.sortValue;
      var blogPosts;
      if (sortBy == "date") {
        if (sortValue == "desc" || sortValue == "asc") {
          blogPosts = await db['Blog']
            .findAll({
              where: {
                status: "approved"
              },
              order: [['updatedAt', sortValue]]
            });
        }
      } else if (sortBy == "title") {
        blogPosts = await db['Blog']
          .findAll({
            where: {
              status: "approved"
            },
            order: [['title', sortValue]]
          });
      }
      if (blogPosts && blogPosts.length > 0) {
        return res.status(200).json({
          result: blogPosts,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Blog Posts found",
        });
      }
    } catch (err) {
      return res.status(400).send({ message: " List of blogs not got at this moment" });
    }
  }
}
