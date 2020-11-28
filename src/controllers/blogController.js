import db from "../models";

export default class BlogController {
  static async blogPost(req, res) {
    try {
      const response = await db['Blog'].create(req.body);
      console.log(response)
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
        const update = await db['Blog']
          .update(
            { status: req.body.decision },
            {
              where: {
                id: req.body.blogId,
              },
            }
          );
          return update
            ? res.status(200).json({
                message: req.body.decision
              })
            : res.status(404).json({
              error: "Sorry, Approval/Decline failed",
            });
    } catch (err) {
        return res.status(400).send({ message: "Sorry, Action failed" });
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
            id: req.body.blogId
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
}
