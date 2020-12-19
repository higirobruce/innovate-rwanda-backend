import db from "../models";
import { UniqueConstraintError } from "sequelize";

export default class CompanyController {
  static async getCompaniesList(req, res) {
    try {
      const companies = await db["Company"].findAll({

        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db["BusinessActivities"],
          },
          {
            model: db["ActivitiesOfCompany"],
            attributes: ["companyId", "activityId"],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
                ),],
            },
            include: [
              {
                model: db["BusinessActivities"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                    ),],
                },
              },]
          }],
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
      console.log(err)
      return res
        .status(400)
        .send({ message: "No companies found at this moment" });
    }
  }

  static async getApprovedCompaniesList(req, res) {
    try {
      const companies = await db["Company"].findAll({
        where: {
          status: "approved",
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db["BusinessActivities"],
          },
          {
            model: db["ActivitiesOfCompany"],
            attributes: ["companyId", "activityId"],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
                ),],
            },
            include: [
              {
                model: db["BusinessActivities"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                    ),],
                },
              },]
          }],
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
      console.log(err)
      return res
        .status(400)
        .send({ message: "No companies found at this moment" });
    }
  }

  static async getApprovedCompaniesByType(req, res) {
    try {
      const companies = await db["Company"].findAll({
        where: {
          status: "approved",
          coType: req.params.type,
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db["BusinessActivities"],
          },
          {
            model: db["ActivitiesOfCompany"],
            attributes: ["companyId", "activityId"],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
                ),],
            },
            include: [
              {
                model: db["BusinessActivities"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                    ),],
                },
              },]
          }],
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
      console.log(err);
      return res
        .status(400)
        .send({ message: "No companies found at this moment" });
    }
  }

  static async approveOrDeclineCompany(req, res) {
    try {
      const decision = req.body.decision;
      const response = await db["Company"]
        .update(
          { status: decision },
          {
            where: {
              id: req.body.id,
            },
          }
        )
      if (response) {
        return res.status(200).json({
          message: "Company " + decision
        })
      }
    } catch (err) {
      console.log(err)
      return res
        .status(400)
        .send({ message: "Decision not set at this moment" });
    }
  }

  static async getCompanyInfo(req, res) {
    try {
      const company = await db["Company"].findOne({
        where: {
          id: req.params.companyId,
        },
        include: [
          {
            model: db["BusinessActivities"],
          },
          {
            model: db["ActivitiesOfCompany"],
            attributes: ["companyId", "activityId"],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
                ),],
            },
            include: [
              {
                model: db["BusinessActivities"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                    ),],
                },
              },]
          }],
      });
      const owner = await db["User"].findOne({
        where: {
          companyId: company.id,
        },
        raw: true,
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
          slug: req.params.slug,
          status: "approved",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db["BusinessActivities"],
          },
          {
            model: db["ActivitiesOfCompany"],
            attributes: ["companyId", "activityId"],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
                ),],
            },
            include: [
              {
                model: db["BusinessActivities"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                    ),],
                },
              },]
          }],
      });
      return company
        ? res.status(200).json({
          result: { company },
        })
        : res.status(404).json({
          error: "Sorry, Company not found",
        });
    } catch (err) {
      console.log("err", err)
      return res.status(400).send({ message: "Sorry, Company not found" });
    }
  }

  static async getCompanyMyInfo(req, res) {
    try {
      const owner = await db["User"].findOne({
        where: {
          id: req.user.id,
        },
        raw: true,
      });
      const company = await db["Company"].findOne({
        where: {
          id: owner.companyId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db["BusinessActivities"],
          },
          {
            model: db["ActivitiesOfCompany"],
            attributes: ["companyId", "activityId"],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.companyId'),
                  db.Op.eq,
                  db.sequelize.col('Company.id')
                ),],
            },
            include: [
              {
                model: db["BusinessActivities"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                    ),],
                },
              },]
          }],
      });
      delete owner.password;
      console.log(company)
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
        .update(req.body, {
          where: {
            id: req.body.id
          },
        })
      return res.status(200).json({
        message: response
      })
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Company not found" });
    }
  }

  static async deleteCompany(req, res) {
    try {
      var response = await db["Company"]
        .update(
          { status: "deleted" },
          {
            where: {
              id: req.body.companyId,
            },
          }
        )
      if (response) {
        response = await db["User"]
          .update(
            { status: "inactive" },
            {
              where: {
                companyId: req.body.companyId,
              },
            }
          )
        response = await db["Blog"]
          .update(
            { status: "inactive" },
            {
              where: {
                companyId: req.body.companyId,
              },
            }
          )
        response = await db["Job"]
          .update(
            { status: "inactive" },
            {
              where: {
                companyId: req.body.companyId,
              },
            }
          )
        response = await db["Event"]
          .update(
            { status: "inactive" },
            {
              where: {
                companyId: req.body.companyId,
              },
            }
          )
      }
      return response
        ? res.status(200).json({
          message: "Deleted Successfully"
        })
        : res.status(404).json({
          message: "Sorry, Failed to delete the record completely"
        });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Decision not set at this moment" });
    }
  }

  static async addActivity(req, res) {
    try {
      const response = await db['ActivitiesOfCompany'].create(req.body);
      return res.status(200).send({
        message: response,
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(409).send({
          error:
            "Activity already added for the company",
          field: error.errors[0].path,
        });
      }
      console.log(err)
      return res.status(400).send({
        message: "Activity not added at this moment"
      });
    }
  }

  static async removeActivity(req, res) {
    const response = await db["ActivitiesOfCompany"]
      .destroy({
        where: {
          companyId: req.body.companyId,
          activityId: req.body.activityId
        },
      })
    if (response) {
      return res.status(200).json({
        message: "Activity Removed"
      })
    } else {
      return res.status(200).json({
        message: "Activity not yet added"
      })
    }
  } catch(err) {
    console.log(err)
    return res
      .status(400)
      .send({ message: "Activity not removed..Try again later" });
  }
}
