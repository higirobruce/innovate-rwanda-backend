import db from '../models';
const ExportHelper = (query) => {
  // Export companies
  let where;
  if (query.model === 'Company') {
    const { start, end, status } = query;
    if (start && end) {
      where = { ...where, yearFounded: { [db.Op.between]: [start, end] } };
    }
    if (status) {
      where = {
        ...where,
        status,
      };
    }
    const include = [
      { model: db['BusinessActivities'], attributes: ['name'] },
      { model: db['BusinessActivities'], attributes: ['name'] },
      {
        model: db['ActivitiesOfCompany'],
        attributes: ['companyId', 'activityId'],
        on: {
          [db.Op.and]: [
            db.sequelize.where(
              db.sequelize.col('ActivitiesOfCompanies.companyId'),
              db.Op.eq,
              db.sequelize.col('Company.id')
            ),
          ],
        },
        include: [
          {
            model: db['BusinessActivities'],
            attributes: ['name'],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('ActivitiesOfCompanies.activityId'),
                  db.Op.eq,
                  db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id')
                ),
              ],
            },
          },
        ],
      },
      { model: db['CompanyTypes'], attributes: ['name'] },
    ];
    return { where, include };
  } else {
    return;
  }
};
export default ExportHelper;
