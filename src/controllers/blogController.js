import db from "../models";

export default class BlogController {
  static async blogPost(req, res) {
    db['Blog'].create({
      title: req.body.title,
      content: req.body.content,
      status: "pending approval",
    })
      .then((result) => {
        res.status(200).send({
          message: "Blog Posted",
        });
      })
      .catch((error) => {
        res.status(401).send({
          message: "Something went wrong",
        });
      });
  }

  static async approveBlogPost(req, res) {
    // To do: Do more here, once approved send notifications right away or?
    db['Blog'].update(
      { status: req.body.decision },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then(() => {
        res.status(200).send({
          message: "approved",
        });
      })
      .catch((err) => {
        res.status(401).send({
          message: "An error occurred",
        });
      });
  }

  static async getBlogsList(req, res) {
    //To do: Date of deadline need to be set so we don't show outdated ones
    if (req.params.status == "all") {
      db['Blog'].findAll({order: [['createdAt', 'DESC']]})
        .then((blogPosts) => {
          res.status(200).send({
            result: blogPosts,
          });
        })
        .catch((err) => {
          res.status(401).send({
            message: "list of blogs posted not got",
          });
        });
    } else {
      db['Blog'].findAll({
        where: {
          status: req.params.status,
        },
        order: [['createdAt', 'DESC']]
      })
        .then((blogPosts) => {
          res.status(200).send({
            result: blogPosts,
          });
        })
        .catch((err) => {
          res.status(401).send({
            message: "list of blogs not got",
          });
        });
    }
  }
}
