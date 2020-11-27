import db from "../models";

export default class EvenController {
  static async eventPost(req, res) {
    db['Event'].create({
      title: req.body.title,
      description: req.body.description,
      status: "pending approval",
    })
      .then((result) => {
        res.status(200).send({
          message: "Event Posted",
        });
      })
      .catch((error) => {
        res.status(401).send({
          message: "Something went wrong",
        });
      });
  }

  static async approveEventPost(req, res) {
    // To do: Do more here, once approved send notifications right away or?
    db['Event'].update(
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

  static async getEventsList(req, res) {
    //To do: Date of deadline need to be set so we don't show outdated ones
    if (req.params.status == "all") {
      db['Event'].findAll({order: [['createdAt', 'DESC']]})
        .then((eventPosts) => {
          res.status(200).send({
            result: eventPosts,
          });
        })
        .catch((err) => {
          res.status(401).send({
            message: "list of events posted not got",
          });
        });
    } else {
      db['Event'].findAll({
        where: {
          status: req.params.status,
        },
        order: [['createdAt', 'DESC']]
      })
        .then((eventPosts) => {
          res.status(200).send({
            result: eventPosts,
          });
        })
        .catch((err) => {
          res.status(401).send({
            message: "list of events not got",
          });
        });
    }
  }
}
