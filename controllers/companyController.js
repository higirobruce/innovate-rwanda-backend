const models = require('../models');

const getCompaniesList =  (req, res) => {
    models.Company.findAll().then(companys => {
        console.log("All companies:", JSON.stringify(companys, null, 4));
        res.status(200).send({
            result: companys
        });
    }).catch( (err) => {
        res.status(401).send({
            message: "list not got"
        })
    });
}

const getApprovedCompaniesList =  (req, res) => {
    models.Company.findAll({
        where: {
          status: 'approved'
        }
      }).then(companys => {
        console.log("All companies:", JSON.stringify(companys, null, 4));
        res.status(200).send({
            result: companys
        });
    }).catch( (err) => {
        res.status(401).send({
            message: "list not got"
        })
    });
}

const approveCompanyRegistration =  (req, res) => {
    models.Company.update({ status: req.body.decision }, {
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

module.exports = {
    getCompaniesList,
    getApprovedCompaniesList,
    approveCompanyRegistration,
}