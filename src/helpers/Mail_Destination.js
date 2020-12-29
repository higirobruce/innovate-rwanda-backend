import db from "../models";

async function subscribers_email_list() {
  try {
    var emails = await db["Subscription"].findAll({
      where: { status: "active" },
      attributes: ['email'], raw: true
    });
    if (!emails) {
      return 0
    } else {
      return emails.map(email => email.email).toString()
    }
  } catch (error) {
    return -1
  }
}

async function email_list_perActivity(business_activities) {
  try {
    var emails = new Array(), email, directory_email_list, co_ids = new Array(),
      directoryEmails = await db['ActivitiesOfCompany'].findAll({
        where: { activityId: { [db.Op.in]: business_activities } },
        attributes: ["companyId", "activityId"], order: [['activityId', 'ASC']],
        include: [
          {
            model: db["Company"], attributes: ["contactEmail", "id"],
            on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('ActivitiesOfCompany.companyId'), db.Op.eq, db.sequelize.col('Company.id')), db.sequelize.where(db.sequelize.col('Company.status'), db.Op.eq, 'approved')] }
          },
        ], raw: true
      });

    for (var i = 0; i < directoryEmails.length; i++) {
      email = Object.values(directoryEmails[i])[1];
      if (email) {
        emails.push(email);
        co_ids.push(Object.values(directoryEmails[i])[2])
      }
    }

    if (emails.length > 1) {
      directory_email_list = Array.from(new Set(emails));
    } else {
      directory_email_list = emails;
    }
    return { directory_email_list: directory_email_list, co_ids: co_ids };
  } catch (error) {
    return -1;
  }
}

async function subscriber_dirPerActivity(business_activities) {
  try {
    var subscription_emails = await subscribers_email_list(), directory_emails, notifList;

    if (business_activities && business_activities.length > 0) {
      directory_emails = await email_list_perActivity(business_activities);
    }

    if (subscription_emails != 0 && subscription_emails != -1) {
      if (directory_emails.directory_email_list.length > 0 && directory_emails != -1) {
        notifList = subscription_emails.concat(",", directory_emails.directory_email_list);
      } else {
        notifList = subscription_emails;
      }
    } else if (directory_emails.directory_email_list.length > 0 && directory_emails != -1) {
      notifList = directory_emails.directory_email_list;
    }
    return { notifList: notifList, co_ids: directory_emails.co_ids };
  } catch (error) {
    return -1;
  }
}

module.exports = {
  subscriber_dirPerActivity: subscriber_dirPerActivity
};