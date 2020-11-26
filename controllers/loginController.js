const bcrypt = require('bcrypt');
const models = require('../models');

const login =  (req, res,next) => {
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
                        //req.message = "login exist"
                        user.password =''
                        res.locals.user = user
                        if (!company) {
                            res.locals.companyInfo = "Company info not there"                            
                        } else {
                            res.locals.companyInfo = company
                        }
                        next();
                    }).catch( (err) => {
                        console.log(err);
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