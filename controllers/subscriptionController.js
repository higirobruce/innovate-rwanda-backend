const models = require('../models');

const subscribeToNotification =  (req, res) => {
    models.Subscription.create({
        email: req.body.email,
        status: 'subscribed'
    }).then((result) => {
        res.status(200).send({
            message: 'Subscribed'
        });
    }).catch( (error) => {
        res.status(401).send({
            message: "Something went wrong"
        })
    });
}

const unsubscribeFromNotification =  (req, res) => {
    models.Subscription.update({ status: 'unsubscribed' }, {
        where: {
          email: req.body.email
        }
      }).then(() => {
        res.status(200).send({
            message: 'Unsubscribed'
        });
      }).catch((err) => {
        res.status(401).send({
            message: "An error occurred"
        })
    });
}

const getSubscriptions =  (req, res) => {
    if (req.params.status =="all") {
        models.Subscription.findAll().then(subscriptions => {
            res.status(200).send({
                result: subscriptions
            });
        }).catch( (err) => {
            res.status(401).send({
                message: "list of subscriptions not got",
                err: err
            })
        });
    } else {
        models.Subscription.findAll({
            where: {
              status: req.params.status
            }
          }).then(subscriptions => {
            res.status(200).send({
                result: subscriptions
            });
        }).catch( (err) => {
            res.status(401).send({
                message: "list of subscriptions not got",
                err: err
            })
        })
    }
}

module.exports = {
  subscribeToNotification,
  unsubscribeFromNotification,
  getSubscriptions,
}