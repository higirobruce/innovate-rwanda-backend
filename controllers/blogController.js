const models = require('../models');

const blogPost =  (req, res) => {
    models.Blog.create({
        title: req.body.title,
        content: req.body.content,
        status: 'pending approval'
    }).then((result) => {
        res.status(200).send({
            message: 'Blog Posted'
        });
    }).catch( (error) => {
        res.status(401).send({
            message: "Something went wrong"
        })
    });
}

const approveBlogPost =  (req, res) => {
    // To do: Do more here, once approved send notifications right away or?
    models.Blog.update({ status: req.body.decision }, {
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

const getBlogsList =  (req, res) => {
    //To do: Date of deadline need to be set so we don't show outdated ones
    if (req.params.status =="all") {
        models.Blog.findAll().then(blogPosts => {
            console.log("All blogs posted:", JSON.stringify(blogPosts, null, 4));
            res.status(200).send({
                result: blogPosts
            });
        }).catch((err) => {
            res.status(401).send({
                message: "list of blogs posted not got"
            })
        });
    } else {
        models.Blog.findAll({
            where: {
                status: req.params.status
            }
        }).then(blogPosts => {
            res.status(200).send({
                result: blogPosts
            });
        }).catch( (err) => {
            res.status(401).send({
                message: "list of blogs not got"
            });
        })
    }
}

module.exports = {
    blogPost,
    approveBlogPost,
    getBlogsList,
}