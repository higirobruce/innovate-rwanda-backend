import db from "../models";

export default class CompanyController {
  static async getCompaniesList(req, res) {
    try {
      const companies = await db["Company"].findAll({
        order: [['createdAt', 'DESC']],
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
        order: [['createdAt', 'DESC']]
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

  static async approveOrDeclineCompany(req, res) {
   const response = await db["Company"]
      .update(
        { status: req.body.decision },
        {
          where: {
            id: req.body.id,
          },
        }
      )
      return res.status(200).json({
        message: response
      })
  }
   
  static async getCompanyInfo(req, res) {
    try {
      const company = await db["Company"].findOne({
        where: {
          id: req.params.companyId,
        },
        raw: true,
      });
      const owner = await db["User"].findOne({
        where: {
          companyId: company.id,
        },
        raw: true
      });
      delete owner.password;
      return company
        ? res.status(200).json({
            result: { company, owner },
          })
        : res.status(404).json({
            error: "Sorry, Company not found",
          });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Company not found" });
    }
  }

  static async getCompanyInfoPublic(req, res) {
    try {
      const company = await db["Company"].findOne({
        where: {
          slug: req.params.companyId,
          status: "approved"
        },
        raw: true,
      });
      const owner = await db["User"].findOne({
        where: {
          companyId: company.id,
        },
        raw: true
      });
      delete owner.password;
      return company
        ? res.status(200).json({
            result: { company, owner },
          })
        : res.status(404).json({
            error: "Sorry, Company not found",
          });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Company not found" });
    }
  }

  static async editCompanyInfo(req, res) {
    try {
      const response = await db["Company"]
        .update((req.body), {
          where: {
            id: req.body.id
          },
        })
        return res.status(200).json({
          message: response
        })
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Edit failed" });
    }
  }
}
