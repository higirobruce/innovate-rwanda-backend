import db from "../models";

function generateSlug(company_name) {
    return company_name.trim().replace(/ /g, "-").toLowerCase();
}

function generateSlug_companyTypes(name) {
    return name.trim().replace(/[^a-zA-Z]/g, "").toLowerCase();
}

async function getCompanyDetails(company_id, callback) {
    await db["Company"].findOne({
        where: { id: company_id },
        attributes: ["coName", "contactEmail"]
    }).then((details) => {
        if (details) {
            callback(details);
        } else {
            callback(0);
        }
    }).catch((error) => {
        callback(-1);
    })
}

async function getActivities(post_id, postType, callback) {
    await db["AudienceForPost"].findAll({
        where: { typeOfPost: postType, postId: post_id }, 
        attributes: [["activityId", "activity"]], raw: true
    }).then((activities) => {
        console.log(activities)
        callback(activities);
    }).catch((error) => {
        console.log(error)
        callback(-1);
    });
}

async function getCompaniesIdPerActivity(activityId, callback) {
    await db["ActivitiesOfCompany"].findAll({
        where: { activityId: activityId }, 
        attributes: ["companyId"], raw: true
    }).then((companiesId) => {
        callback(companiesId);
    }).catch((error) => {
        callback(-1);
    });
}

async function getSimilarCompaniesId(companyId, activities, callback) {
    await db["ActivitiesOfCompany"].findAll({
        where: { companyId: { [db.Op.not]: companyId }, activityId: { [db.Op.in]: activities } },
        attributes: ["companyId"], raw: true
    }).then((similarCompaniesId) => {
        callback(similarCompaniesId);
    }).catch((error) => {
        callback(-1);
    });
}

async function getPostsIdPerActivity(type, activityId, callback) {
    await db["AudienceForPost"].findAll({
        where: { typeOfPost: type, activityId: activityId }, 
        attributes: ["postId"], raw: true
    }).then((postsId) => {
        callback(postsId);
    }).catch((error) => {
        callback(-1);
    });
}

async function getCompaniesIdPerType(type, callback) {
    await db["Company"].findAll({
        where: { coType: type }, 
        attributes: ["id"], raw: true
    }).then((companiesId) => {
        callback(companiesId);
    }).catch((error) => {
        callback(-1);
    });
}

async function deleteCompany(companyData, callback) {
    try {
        var i;
        for (i = 0; i < companyData.Notifications.length; i++) {
            await companyData.Notifications[i].destroy();
        }
        for (i = 0; i < companyData.Messages.length; i++) {
            await companyData.Messages[i].destroy();
        }
        for (i = 0; i < companyData.ActivitiesOfCompanies.length; i++) {
            await companyData.ActivitiesOfCompanies[i].destroy();
        }
        for (i = 0; i < companyData.Blogs.length; i++) {
            for(var j = 0; j < companyData.Blogs[i].AudienceForPosts.length; j++) {
                await companyData.Blogs[i].AudienceForPosts[j].destroy();
            }
            await companyData.Blogs[i].destroy();
        }
        for (i = 0; i < companyData.Events.length; i++) {
            for(var j = 0; j < companyData.Events[i].AudienceForPosts.length; j++) {
                await companyData.Events[i].AudienceForPosts[j].destroy();
            }
            await companyData.Events[i].destroy();
        }
        for (i = 0; i < companyData.Jobs.length; i++) {
            for(var j = 0; j < companyData.Jobs[i].AudienceForPosts.length; j++) {
                await companyData.Jobs[i].AudienceForPosts[j].destroy();
            }
            await companyData.Jobs[i].destroy();
        }
        await companyData.User.destroy();
        await companyData.destroy();
        callback("Company successfully deleted")
    } catch (error) {
        callback(-1)
    }
}

async function searchDirectory(searchValue, callback) {
    const likeOp = db.Op.iLike;
    const response = new Array(2);
    try {
        const directory = await db['Company'].findAll({
            where: { [db.Op.or]: [{ coName: { [likeOp]: "%" + searchValue + "%" } }, { coType: { [likeOp]: "%" + searchValue + "%" } }, { coWebsite: { [likeOp]: "%" + searchValue + "%" } }, { shortDescription: { [likeOp]: "%" + searchValue + "%" } }, { districtBasedIn: { [likeOp]: "%" + searchValue + "%" } }, { customerBase: { [likeOp]: "%" + searchValue + "%" } }, { officeAddress: { [likeOp]: "%" + searchValue + "%" } }], status: "approved" },
            include: [
                { model: db["BusinessActivities"], attributes: ["name"] },
                {
                    model: db["ActivitiesOfCompany"], attributes: ["activityId"],
                    on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('ActivitiesOfCompanies.companyId'), db.Op.eq, db.sequelize.col('Company.id'))] },
                    include: [{
                        model: db["BusinessActivities"], attributes: ["name"],
                        on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('ActivitiesOfCompanies.activityId'), db.Op.eq, db.sequelize.col('ActivitiesOfCompanies->BusinessActivity.id'))] },
                    }]
                },
                { model: db["CompanyTypes"], attributes: ["name"] }
            ], limit: 100, order: [['yearFounded', 'ASC']]
        });

        if (directory && directory.length > 0) {
            response[0] = 200;
            response[1] = { result: directory };
        } else {
            response[0] = 404;
            response[1] = { result: [], error: "No Company found" };
        }
        callback(response);
    } catch (err) {
        console.log(err)
        response[0] = 400;
        response[1] = { message: " Directory not got at this moment" };
        callback(response);
    }
}

async function searchForBlogs(searchValue, callback) {
    const likeOp = db.Op.iLike;
    const response = new Array(2);
    try {
        const blogs = await db['Blog'].findAll({
            where: { [db.Op.or]: [{ title: { [likeOp]: "%" + searchValue + "%" } }, { content: { [likeOp]: "%" + searchValue + "%" } }, { category: { [likeOp]: "%" + searchValue + "%" } }], status: "approved" },
            include: [
                { model: db["Company"], attributes: [["coName", "companyName"]] },
                { model: db["User"], attributes: ["firstName", "lastName"] },
                {
                    model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
                    on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Blog.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'blog')] },
                    include: [{
                        model: db["BusinessActivities"], attributes: ["name"],
                        on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] }
                    }]
                }
            ], limit: 10, order: [['title', 'ASC']]
        });

        if (blogs && blogs.length > 0) {
            response[0] = 200;
            response[1] = { result: blogs };
        } else {
            response[0] = 404;
            response[1] = { result: [], error: "No Blog found" };
        }
        callback(response);
    } catch (err) {
        console.log(err)
        response[0] = 400;
        response[1] = { message: " List of Blogs not got at this moment" };
        callback(response);
    }
}

async function searchForEvents(searchValue, callback) {
    const likeOp = db.Op.iLike;
    const response = new Array(2);
    try {
        const events = await db['Event'].findAll({
            where: { [db.Op.or]: [{ title: { [likeOp]: "%" + searchValue + "%" } }, { description: { [likeOp]: "%" + searchValue + "%" } }, { category: { [likeOp]: "%" + searchValue + "%" } }], status: "approved" },
            include: [
              { model: db["Company"], attributes: [["coName", "companyName"]] },
              { model: db["User"], attributes: ["firstName", "lastName"] },
              {
                model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
                include: [{
                  model: db["BusinessActivities"], attributes: ["name"],
                  on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
                }]
              }
            ], limit: 10, order: [['title', 'ASC']]
          });
  
        if (events && events.length > 0) {
            response[0] = 200;
            response[1] = { result: events };
        } else {
            response[0] = 404;
            response[1] = { result: [], error: "No Event found" };
        }
        callback(response);
      } catch (err) {
        console.log(err)
        response[0] = 400;
        response[1] = { message: "  List of Events not got at this moment" };
        callback(response);
      }
}

async function searchForJobs(searchValue, callback) {
    const likeOp = db.Op.iLike;
    const response = new Array(2);
    try {
        const jobs = await db['Job'].findAll({
            where: { [db.Op.or]: [{ title: { [likeOp]: "%" + searchValue + "%" } }, { description: { [likeOp]: "%" + searchValue + "%" } }, { category: { [likeOp]: "%" + searchValue + "%" } }], status: "approved" },
            include: [
              { model: db["Company"], attributes: ["logo", ["coName", "companyName"]] },
              {
                model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Job.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'job')] },
                include: [{
                  model: db["BusinessActivities"], attributes: ["name"],
                  on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] }
                }]
              },
              { model: db["CompanyTypes"], attributes: ["name"] }
            ], limit: 10, order: [['title', 'ASC']]
          });
  
        if (jobs && jobs.length > 0) {
            response[0] = 200;
            response[1] = { result: jobs };
        } else {
            response[0] = 404;
            response[1] = { result: [], error: "No Job found" };
        }
        callback(response);
      } catch (err) {
        console.log(err)
        response[0] = 400;
        response[1] = { message: " List of Jobs not got at this moment" };
        callback(response);
      }
}

module.exports = {
    generateSlug: generateSlug,
    generateSlug_companyTypes:generateSlug_companyTypes,
    getCompanyDetails: getCompanyDetails,
    getActivities: getActivities,
    getCompaniesIdPerActivity: getCompaniesIdPerActivity,
    getPostsIdPerActivity: getPostsIdPerActivity,
    getCompaniesIdPerType: getCompaniesIdPerType,
    deleteCompany: deleteCompany,
    searchDirectory: searchDirectory,
    searchForBlogs: searchForBlogs,
    searchForEvents: searchForEvents,
    searchForJobs: searchForJobs,
    getSimilarCompaniesId:getSimilarCompaniesId
};