const bcrypt = require('bcrypt');
const models = require('../models');
const saltRounds = 10;

const register =  (req, res) => {
    models.Company.create({ 
        coName: req.body.coName,
        coType: req.body.coType,
        coWebsite: req.body.coWebsite,
        districtBasedIn: req.body.districtBasedIn,
        areaOfInterest: req.body.areaOfInterest, 
        shortDescription: req.body.shortDescription,
        status: 'pending approval'
    }).then((result) => {
        bcrypt.hash(req.body.password, saltRounds, function(err, hashPassword) {
            models.User.create({ 
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                jobTitle: req.body.jobTitle,
                password: hashPassword, 
                role: req.body.role,
                companyId: result.id,
                status: 'new' 
            }).then( (result) => {
                res.status(200).send({
                    message: 'Account Created'
                });
            }).catch( (err) => {
                res.status(401).send({
                    message: "Something went wrong - User Account"
                    //err: err
                })
            });
        });
    }).catch( (error) => {
        res.status(401).send({
            message: "Something went wrong - Company Account"
            //error: error
        })
    });
}

module.exports = {
    register,
}