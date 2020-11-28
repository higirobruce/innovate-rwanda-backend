import db from "../models";

export default class CompanyController {
  static async getCompaniesList(req, res) {
    try {
      const companies = await db["Company"].findAll({
        raw: true,
      });
      if (companies && companies.length > 0) {
        return res.status(200).json({
          result: companies,
        });
      }
      return res.status(404).json({
        result: [],
        error: "No companies found at this moment",
      });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "No companies found at this moment" });
    }
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
