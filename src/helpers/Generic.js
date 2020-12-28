import db from "../models";

function generateSlug(company_name) {
    return company_name.trim().replace(/ /g, "-").toLowerCase();
}

async function getCompanyEmail(company_id, callback) {
    await db["Company"].findOne({
        where: { id: company_id },
        attributes: ["contactEmail"]
    }).then((company) => {
        if (company) {
            if (company.contactEmail) {
                callback(company.contactEmail);
            }
        }
    }).catch((error) => {
        callback(-1);
    })
}

async function getActivities(post_id, postType, callback) {
    await db["AudienceForPost"].findAll({
        where: { typeOfPost: postType, postId: post_id }, attributes: [["activityId", "activity"]], raw: true
    }).then((activities) => {
        console.log(activities)
        callback(activities);
    }).catch((error) => {
        console.log(error)
        callback(-1);
    });
}

module.exports = {
    generateSlug: generateSlug,
    getCompanyEmail: getCompanyEmail,
    getActivities: getActivities
};