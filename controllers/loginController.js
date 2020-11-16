const bcrypt = require('bcrypt');
const models = require('../models');

const login =  (req, res) => {
    models.User.findOne({
        where: { email: req.body.email }}).then(user => {
            if (!user) {
                res.status(403).send({
                    message: "Wrong Email"
                });
            }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (result == true) {
                models.Company.findOne({
                    where: { id: user.companyId }}).then(company => {
                        if (!company) {
                            res.status(201).send({ // To do: Add user to session for later use
                                message: "login exist",
                                user: user,
                                companyInfo: "Company info not there"
                            });
                        } else {
                            res.status(200).send({ // To do: Add user to session for later use
                                message: "login exist",
                                user: user,
                                companyInfo: company
                            });
                        }
                    }).catch( (err) => {
                        res.status(403).send({
                            message: "Error - company info not got"
                        });
                    })
            } else if (result == false) {
                res.status(403).send({
                    message: "Wrong Password"
                });
            } else if (err) {
                res.status(403).send({
                    message: "Error occurred -- checking password"
                });
            }
        });
    }).catch((err) => {
        res.status(401).send({
            message: "Error occurred"
        })
        console.log(err);
    });
}

module.exports = {
    login,
}