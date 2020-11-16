const models = require('../models');

const jobPost =  (req, res) => {
    models.Job.create({
        title: req.body.title,
        description: req.body.description,
        status: 'pending approval'
    }).then((result) => {
        res.status(200).send({
            message: 'Job Posted'
        });
    }).catch( (error) => {
        res.status(401).send({
            message: "Something went wrong"
        })
    });
}

const approveJobPost =  (req, res) => {
    // To do: Do more here, once approved send notifications right away or?
    models.Job.update({ status: req.body.decision }, {
      where: {
        id: req.body.id
      }
    }).then(() => {
      res.status(200).send({
          message: 'approved'
      });
    }).catch((err) => {
      res.status(401).send({
          message: "An error occurred",
          err: err
      })
  });
}

const getJobsList =  (req, res) => {
    //To do: Date of deadline need to be set so we don't show outdated ones
    if (req.params.status =="all") {
        models.Job.findAll().then(jobPosts => {
            console.log("All jobs posted:", JSON.stringify(jobPosts, null, 4));
            res.status(200).send({
                result: jobPosts
            });
        }).catch( (err) => {
            res.status(401).send({
                message: "list of jobs posted not got"
            })
        });
    } else {
        models.Job.findAll({
            where: {
              status: req.params.status
            }
          }).then(jobPosts => {
            res.status(200).send({
                result: jobPosts
            });
        }).catch( (err) => {
            res.status(401).send({
                message: "list of jobs not got"
            });
        })
    }
}

module.exports = {
    jobPost,
    approveJobPost,
    getJobsList,
}