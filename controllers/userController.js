const models = require('../models');

const getUsersList =  (req, res) => {
    models.User.findAll({attributes: ['firstName', 'lastName','email','jobTitle','role','companyId','status']}).then(users => {
        res.status(200).send({
            result: users
        });
    }).catch( (err) => {
        res.status(401).send({
            message: "list of users not got"
        })
    });
}

module.exports = {
    getUsersList,
}