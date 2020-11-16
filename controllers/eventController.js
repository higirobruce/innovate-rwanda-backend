const models = require('../models');

const eventPost =  (req, res) => {
    models.Event.create({
        title: req.body.title,
        description: req.body.description,
        status: 'pending approval'
    }).then((result) => {
        res.status(200).send({
            message: 'Event Posted'
        });
    }).catch( (error) => {
        res.status(401).send({
            message: "Something went wrong"
        })
    });
}

const approveEventPost =  (req, res) => {
    // To do: Do more here, once approved send notifications right away or?
    models.Event.update({ status: req.body.decision }, {
      where: {
        id: req.body.id
      }
    }).then(() => {
      res.status(200).send({
          message: 'approved'
      });
    }).catch((err) => {
      res.status(401).send({
          message: "An error occurred"
      })
  });
}

const getEventsList =  (req, res) => {
    //To do: Date of deadline need to be set so we don't show outdated ones
    if (req.params.status =="all") {
        models.Event.findAll().then(eventPosts => {
            console.log("All jobs posted:", JSON.stringify(eventPosts, null, 4));
            res.status(200).send({
                result: eventPosts
            });
        }).catch( (err) => {
            res.status(401).send({
                message: "list of events posted not got"
            })
        });
    } else {
        models.Event.findAll({
            where: {
                status: req.params.status
            }
        }).then(eventPosts => {
            res.status(200).send({
                result: eventPosts
            });
        }).catch( (err) => {
            res.status(401).send({
                message: "list of events not got"
            });
        })
    }
}

module.exports = {
    eventPost,
    approveEventPost,
    getEventsList,
}