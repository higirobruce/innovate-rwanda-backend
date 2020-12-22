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
            attributes: ["name"]
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
                attributes: ["name"],
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
            attributes: ["name"]
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
                attributes: ["name"],
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
            attributes: ["name"]
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
                attributes: ["name"],
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
            attributes: ["name"]
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
                attributes: ["name"],
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
            attributes: ["name"]
          },
          {
            model: db["ActivitiesOfCompany"],
            attributes: ["activityId"],
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
                attributes: ["name"],
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
      var activities = company.get({ plain: true }).ActivitiesOfCompanies;
      var activitiesSimilar = new Array();
      var similarCompanies;

      for (var i = 0; i < activities.length; i++) {
        activitiesSimilar.push(Object.values(activities[i])[0]);
      }

      if (activitiesSimilar.length > 0) {
        const inOp = db.Op.in;
        similarCompanies = await db['ActivitiesOfCompany']
          .findAll({
            attributes: ["companyId", "activityId"],
            where: {
              companyId: {
                [db.Op.not]: company.id
              },
              activityId: {
                [inOp]: activitiesSimilar
              },
            },
            order: [['activityId', 'ASC']],
            attributes: ["activityId"],
            include: [
              {
                model: db["Company"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompany.companyId'),
                      db.Op.eq,
                      db.sequelize.col('Company.id')
                    ),
                    db.sequelize.where(
                      db.sequelize.col('Company.status'),
                      db.Op.eq,
                      'approved'
                    ),
                  ],
                }
              },
              {
                model: db["BusinessActivities"],
                attributes: ["name"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('Company.businessActivityId'),
                      db.Op.eq,
                      db.sequelize.col('BusinessActivity.id')
                    ),],
                },
              }
            ],
          });
      }
      return company
        ? res.status(200).json({
          result: { company, similarCompanies },
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
            attributes: ["name"]
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
                attributes: ["name"],
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

  static async getDirectoryFiltered(req, res) {//location       | activities            | year-founded
    try {
      const filterBy = req.body.filterBy;
      const filterValue = req.body.filterValue;
      var directory;
      if (filterBy == "location") {
        directory = await db['Company']
          .findAll({
            where: {
              districtBasedIn: filterValue,
              status: "approved"
            },
            include: [
              {
                model: db["BusinessActivities"],
                attributes: ["name"]
              },
              {
                model: db["ActivitiesOfCompany"],
                attributes: ["activityId"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompanies.companyId'),
                      db.Op.eq,
                      db.sequelize.col('Company.id')
                    )
                  ],
                },
                include: [{
                  model: db["BusinessActivities"],
                  attributes: ["name"],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('ActivitiesOfCompanies.activityId'),
                        db.Op.eq,
                        db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                      ),],
                  },
                }]
              }
            ],
            order: [['createdAt', 'DESC']]
          });
      } else if (filterBy == "activities") {

        const inOp = db.Op.in;
        directory = await db['ActivitiesOfCompany']
          .findAll({
            attributes: ["companyId", "activityId"],
            where: {
              activityId: {
                [inOp]: filterValue
              }
            },
            order: [['activityId', 'ASC']],
            attributes: ["activityId"],
            include: [
              {
                model: db["Company"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompany.companyId'),
                      db.Op.eq,
                      db.sequelize.col('Company.id')
                    ),
                    db.sequelize.where(
                      db.sequelize.col('Company.status'),
                      db.Op.eq,
                      'approved'
                    ),
                  ],
                }
              },
              {
                model: db["BusinessActivities"],
                attributes: ["name"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('Company.businessActivityId'),
                      db.Op.eq,
                      db.sequelize.col('BusinessActivity.id')
                    ),],
                },
              }
            ],
          });
      } else if (filterBy == "year-founded") {
        const andOp = db.Op.and;
        directory = await db['Company']
          .findAll({
            where: {
              yearFounded: filterValue,
              status: "approved"
            },
            include: [
              {
                model: db["BusinessActivities"],
                attributes: ["name"]
              },
              {
                model: db["ActivitiesOfCompany"],
                attributes: ["activityId"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompanies.companyId'),
                      db.Op.eq,
                      db.sequelize.col('Company.id')
                    )
                  ],
                },
                include: [{
                  model: db["BusinessActivities"],
                  attributes: ["name"],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('ActivitiesOfCompanies.activityId'),
                        db.Op.eq,
                        db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                      ),],
                  },
                }]
              }
            ],
            order: [['createdAt', 'DESC']]
          });
      }
      if (directory && directory.length > 0) {
        return res.status(200).json({
          result: directory,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Company found",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: " Directory not got at this moment" });
    }
  }

  static async getDirectorySorted(req, res) {//year-founded or names
    try {
      const sortBy = req.body.sortBy;
      const sortValue = req.body.sortValue;
      var directory;
      if (sortBy == "date") {
        if (sortValue == "desc" || sortValue == "asc") {
          directory = await db['Company']
            .findAll({
              where: {
                status: "approved"
              },
              include: [
                {
                  model: db["BusinessActivities"],
                  attributes: ["name"]
                },
                {
                  model: db["ActivitiesOfCompany"],
                  attributes: ["activityId"],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('ActivitiesOfCompanies.companyId'),
                        db.Op.eq,
                        db.sequelize.col('Company.id')
                      )
                    ],
                  },
                  include: [{
                    model: db["BusinessActivities"],
                    attributes: ["name"],
                    on: {
                      [db.Op.and]: [
                        db.sequelize.where(
                          db.sequelize.col('ActivitiesOfCompanies.activityId'),
                          db.Op.eq,
                          db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                        ),],
                    },
                  }]
                }
              ],
              order: [['yearFounded', sortValue]]
            });
        }
      } else if (sortBy == "name") {
        if (sortValue == "desc" || sortValue == "asc") {
          directory = await db['Company']
            .findAll({
              where: {
                status: "approved"
              },
              include: [
                {
                  model: db["BusinessActivities"],
                  attributes: ["name"]
                },
                {
                  model: db["ActivitiesOfCompany"],
                  attributes: ["activityId"],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('ActivitiesOfCompanies.companyId'),
                        db.Op.eq,
                        db.sequelize.col('Company.id')
                      )
                    ],
                  },
                  include: [{
                    model: db["BusinessActivities"],
                    attributes: ["name"],
                    on: {
                      [db.Op.and]: [
                        db.sequelize.where(
                          db.sequelize.col('ActivitiesOfCompanies.activityId'),
                          db.Op.eq,
                          db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                        ),],
                    },
                  }]
                }
              ],
              order: [['coName', sortValue]]
            });
        }
      }
      if (directory && directory.length > 0) {
        return res.status(200).json({
          result: directory,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Company found",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " Directory not got at this moment" });
    }
  }

  static async searchDirectory(req, res) {
    try {
      const likeOp = db.Op.iLike;
      const searchValue = req.body.searchValue.trim();

      const directory = await db['Company']
        .findAll({
          where: {
            [db.Op.or]: [
              { coName: { [likeOp]: "%" + searchValue + "%" } },
              { coType: { [likeOp]: "%" + searchValue + "%" } },
              { coWebsite: { [likeOp]: "%" + searchValue + "%" } },
              { shortDescription: { [likeOp]: "%" + searchValue + "%" } },
              { districtBasedIn: { [likeOp]: "%" + searchValue + "%" } },
              { customerBase: { [likeOp]: "%" + searchValue + "%" } },
              { officeAddress: { [likeOp]: "%" + searchValue + "%" } }
            ],
            status: "approved"
          },
          include: [
            {
              model: db["BusinessActivities"],
              attributes: ["name"]
            },
            {
              model: db["ActivitiesOfCompany"],
              attributes: ["activityId"],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('ActivitiesOfCompanies.companyId'),
                    db.Op.eq,
                    db.sequelize.col('Company.id')
                  )
                ],
              },
              include: [{
                model: db["BusinessActivities"],
                attributes: ["name"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('ActivitiesOfCompanies.activityId'),
                      db.Op.eq,
                      db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                    ),],
                },
              }]
            }
          ],
          limit: 100,
          order: [['yearFounded', 'ASC']]
        });

      if (directory && directory.length > 0) {
        return res.status(200).json({
          result: directory,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Company found",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " Directory not got at this moment" });
    }
  }
}
