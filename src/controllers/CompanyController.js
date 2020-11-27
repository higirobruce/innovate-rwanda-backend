import db from "../models";

export default class CompanyController {
  static async getCompaniesList(req, res) {
    db["Company"]
      .findAll()
      .then((companys) => {
        return res.status(200).send({
          result: companys,
        });
      })
      .catch((err) => {
        return res.status(400).send({
          message: "Something went wrong",
        });
      });
  }

  static async getApprovedCompaniesList(req, res) {
    db["Company"]
      .findAll({
        where: {
          status: "approved",
        },
      })
      .then((companys) => {
        res.status(200).send({
          result: companys,
        });
      })
      .catch((err) => {
        res.status(401).send({
          message: "list not got",
        });
      });
  }

  static async approveCompanyRegistration(req, res) {
    db["Company"]
      .update(
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

  static async getCompanyInfo(req, res) {
    db["Company"]
      .findOne({
        where: {
          id: req.params.companyId,
        },
      })
      .then((company) => {
        res.status(200).send({
          companyInfo: company,
        });
      })
      .catch((err) => {
        res.status(401).send({
          message: "Company Info Got",
        });
      });
  }
}
