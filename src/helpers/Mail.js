import generic from './Generic';

const MailDestination = require('./Mail_Destination');

/**
 *
 * @param {Object} parameters
 * @returns {Any} - Any
 */
function accountRegistration(parameters) {
  const subject = 'We are almost there, let us verify your email',
    url = `${process.env.APP_URL}/activate-account/${parameters.token}`,
    content = `Dear ${parameters.firstName} ${parameters.lastName},<br><br> 
               Please verify your email in order to access your account. <br>
               Click on the button below or open it in your browser to activate your account.<br><br><br>
               <a style="margin:35px 0;padding:15px 35px;background:#00AEEF;color:#ffffff;clear:both;border-radius:2px;text-decoration:none"
               href="${url}">Activate account</a><br><br><br>
               If the button does not work, please copy and paste the link below into your browser:<br>
               <a href="${url}">${url}</a><br><br>`;
  return {
    subject,
    content,
    destination: parameters.email
  };
}

/**
 *
 * @param {Object} parameters
 * @returns {Any} - Any
 */
function accountActivation(parameters) {
  const subject = 'Let us dive right in',
    content = `Thank you for joining the community, please feel free to explore some of the tools at your disposal; Blogs, Events, Source Talent, Collaborate through the directory. We look forward to your contribution to this growing community.<br><br>
              Please note that you could de-register from the platform from your account settings.`;
  return {
    subject,
    content,
    destination: parameters.email
  };
}

/**
 *
 * @param {Object} parameters
 * @returns {Object} Response
 */
function firstLogin(parameters) {
  const subject = 'Welcome to Innovate Rwanda',
    content = `Dear ${parameters.firstName} ${parameters.lastName}, you have successfully signed into your Innovate Rwanda account. For the next steps, please complete your organisation/company profile under My Profile. Please note that you could de-register from the platform from your account settings.`;
  return {
    companyId: parameters.companyId,
    subject,
    content
  };
}

/**
 *
 * @param {Object} parameters
 * @returns {Object} response
 */
function adminAccountCreation(parameters) {
  const subject = 'Account Creation',
    content = `Dear ${parameters.firstName} ${parameters.lastName}, <br><br>`
              + 'An account has been created for you on Innovate Rwanda System. Please find below details of the account.<br><br>'
              + `<b>Email</b>: ${parameters.email}<br>`
              + `<b>Password</b>: ${parameters.password}<br>`
              + '<br>Change this default password as soon as possible.';
  return {
    destination: parameters.email,
    subject,
    content
  };
}

/**
 *
 * @param {Object} parameters
 * @returns {Object} Response
 */
function forgotPassword(parameters) {
  const subject = `Password Reset: ${parameters.firstName} ${parameters.lastName}, we have made it easy to get back into your account`,
    url = `${process.env.APP_URL}/reset-password/${parameters.token}`,
    content = `Hi ${parameters.firstName} ${parameters.lastName},<br><br>
               Sorry to hear that you're having trouble with logging into Innovate Rwanda. We can help you get straight back into your account. 
               You can reset your password by clicking on link below.<br><br><br>
               <a style="margin:35px 0;padding:15px 35px;background:#00AEEF;color:#ffffff;clear:both;border-radius:2px;text-decoration:none"
               href="${url}">Reset password</a><br><br><br>This link  will expire in 1h.<br><br>
               If the above does not work, please copy and paste the link below into your browser:<br>
               <a href="${url}">${url}</a><br><br>`;
  return {
    destination: parameters.email,
    subject,
    content
  };
}

/**
 *
 * @param {Object} parameters
 * @returns {Object} Response
 */
function subscription(parameters) {
  const subject = 'Let us keep in touch',
    content = 'We are now going to do our best to keep you posted on the latest updates from our community. Please note that you can unsubscribe from these updates anytime through our platform anytime you choose to.';
  return {
    destination: parameters.email,
    subject,
    content
  };
}

/**
 *
 * @param {Object} parameters
 * @param {Any} contactedCompany
 * @returns {Object} Response
 */
function emailToSender(parameters, contactedCompany) {
  const subject = 'Thanks for contacting us',
    content = `The email is checked regularly during business hours. We’ll get back to you as soon as possible.<br><br>Regards,<br>${contactedCompany}`;
  return {
    destination: parameters.email,
    subject,
    content
  };
}

/**
 *
 * @param {Object} parameters
 * @param {String} contactedCompanyEmail
 * @returns {Object} Response
 */
function emailToReceiver(parameters, contactedCompanyEmail) {
  return {
    destination: contactedCompanyEmail,
    subject: `You got a new message from ${parameters.email}`,
    content: `The message is: ${parameters.message}`
  };
}

/**
 *
 * @param {Object} parameters
 * @returns {Object} Response
 */
async function messagePost(parameters) {
  const mails = [];
  await generic.getCompanyDetails(parameters.companyId, (resp) => {
    if (resp !== -1 || resp !== 0) {
      mails[0] = emailToSender(parameters, resp.coName);
      mails[1] = emailToReceiver(parameters, resp.contactEmail);
    }
  });
  return mails;
}

/**
 *
 * @param {Object} parameters
 * @returns {Object} Response
 */
async function postApproval(parameters) {
  let activities;
  await generic.getActivities(parameters.id, parameters.format.toLowerCase(), (theActivities) => {
    activities = theActivities.map(activity => activity.activity);
  });

  const destination = await MailDestination.subscriber_dirPerActivity(activities);
  if (destination !== -1 && destination !== 0) {
    if (parameters.description.length > 250) {
      parameters.description = parameters.description.substr(0, 250);
    }
    return {
      destination: destination.notifList,
      subject: parameters.title,
      content: parameters.description,
      linkForMore: `${parameters.format.toLowerCase()}/${parameters.id}`,
      readMoreLink: `<a href="${process.env.APP_URL}/${parameters.format.toLowerCase()}/${parameters.id}">read more</a>`,
      title: parameters.title,
      file_name: parameters.file_name,
      format: parameters.format,
      companyId: parameters.companyId,
      co_ids: destination.co_ids
    };
  }
  return {
    subject: parameters.title,
    content: parameters.description,
    linkForMore: `${parameters.format.toLowerCase()}/${parameters.id}`,
    format: parameters.format,
    companyId: parameters.companyId
  };
}

/**
 *
 * @param {Object} parameters
 * @returns {Object} Response
 */
function deleteCompanyByOwner(parameters) {
  const subject = 'Company Deletion',
    content = `You just deleted company "${parameters.companyName}" from the system.<br><br>
               In case you would want to recover it, click on below link within a month from now. <br><br><br>
               <a style="margin:35px 0;padding:15px 35px;background:#00AEEF;color:#ffffff;clear:both;border-radius:2px;text-decoration:none"
               href="${process.env.APP_URL}/recover-company/emaillink/${parameters.token}">Recover Company</a> <br><br>`;
  return {
    destination: parameters.email,
    subject,
    content
  };
}

/**
 *
 * @param {Object} parameters
 * @returns {Object} Response
 */
function companyApproval(parameters) {
  const subject = `Your company has been ${parameters.decision}!`,
    url = `${process.env.APP_URL}/login`;
  let content;
  if (parameters.decision === 'approved') {
    content = `Dear ${parameters.firstName} ${parameters.lastName},<br><br>
              Innovate Rwanda has successfully ${parameters.decision} your company ${parameters.companyName}. <br/> <br/>
              Please feel free to explore some of the tools at your disposal; Blogs, Events, Jobs, Source Talent, and collaborate through the directory. <br/> <br/>
              We look forward to your contribution to this growing community. <br/> <br/>
              Please note that you could de-register from the platform from your account settings.
              `;
  } else if (parameters.decision === 'declined') {
    content = `Dear ${parameters.firstName} ${parameters.lastName},<br><br>
              Innovate Rwanda has ${parameters.decision} your company ${parameters.companyName}. For the next steps, please complete
              your organisation/company profile under My profile, after signing in.<br><br><br>
              <a style="margin:35px 0;padding:15px 35px;background:#00AEEF;color:#ffffff;clear:both;border-radius:2px;text-decoration:none"
              href="${url}">Sign In</a><br><br><br> Please note that you could de-register from the platform from your account settings.<br><br>
              If the above does not work, please copy and paste the link below into your browser:<br>
              <a href="${url}">${url}</a><br><br>`;
  }
  return {
    subject,
    content,
    destination: parameters.email
  };
}

module.exports = {
  accountRegistration,
  accountActivation,
  firstLogin,
  adminAccountCreation,
  forgotPassword,
  subscription,
  messagePost,
  postApproval,
  deleteCompanyByOwner,
  companyApproval
};
