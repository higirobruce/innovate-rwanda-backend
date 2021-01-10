import generic from "./Generic";
const Mail_Destination = require('./Mail_Destination.js');

function accountRegistration(parameters) {
  const subject = "We’re almost there let's verify your email",
    content = `Dear ${parameters.firstName} ${parameters.lastName},<br><br> 
               Please verify your email in order to access your account. <br>
               Click on the button below or open it in your browser to activate your account.<br><br><br>
               <a style="margin:35px 0;padding:15px 35px;background:#00AEEF;color:#ffffff;clear:both;border-radius:2px;text-decoration:none"
               href="${process.env.APP_URL}/activate-account/${parameters.token}">Activate account</a><br><br><br>`;
  return {
    subject: subject,
    content: content,
    destination: parameters.email
  }
}

function accountActivation(parameters) {
  const subject = "Let’s dive right in",
    content = "Welcome to the innovate Rwanda community";
  return {
    subject: subject,
    content: content,
    destination: parameters.email
  }
}

function firstLogin(parameters) {
  const subject = "Welcome to Innovate Rwanda",
    content = `Thank you ${parameters.firstName} ${parameters.lastName} for login in Innovate Rwanda. For the next step, complete your company's profile under My Company.`;
  return {
    companyId: parameters.companyId,
    subject: subject,
    content: content
  }
}

function adminAccountCreation(parameters) {
  const subject = "Account Creation",
    content = "Dear " + parameters.firstName + " " + parameters.lastName + ", <br><br>" +
              "An account has been created for you on Innovate Rwanda System. Please find below details of the account.<br><br>" +
              "<b>Email</b>: " + parameters.email + "<br>" +
              "<b>Password</b>: " + parameters.password + "<br>" +
              "<br>Change this default password as soon as possible.";
  return {
    destination: parameters.email,
    subject: subject,
    content: content
  }
}

function forgotPassword(parameters) {
  const subject = "[Innovate Rwanda] Please reset your password",
    content = `Please use the following link to reset your password: <br><br><br>
               <a style="margin:35px 0;padding:15px 35px;background:#00AEEF;color:#ffffff;clear:both;border-radius:2px;text-decoration:none"
               href="${process.env.APP_URL}/reset-password/${parameters.token}">Reset password</a> <br><br><br>
               This link  will expire in 1h.`;
  return {
    destination: parameters.email,
    subject: subject,
    content: content
  }
}

function subscription(parameters) {
  const subject = "Let’s keep in touch",
    content = "Thank you for choosing to receive updated info from our community.";
  return {
    destination: parameters.email,
    subject: subject,
    content: content
  }
}

function emailToSender(parameters, contactedCompany) {
  const subject = "Thanks for contacting us",
    content = "The email is checked regularly during business hours. We’ll get back to you as soon as possible.<br><br>Regards,<br>" + contactedCompany;
  return {
    destination: parameters.email,
    subject: subject,
    content: content
  }
}

function emailToReceiver(parameters, contactedCompanyEmail) {
  return {
    destination: contactedCompanyEmail,
    subject: "You got a new message from " + parameters.email,
    content: "The message is: " + parameters.message
  }
}

async function messagePost(parameters) {
  var mails = new Array();
  await generic.getCompanyDetails(parameters.companyId, function (resp) {
    if (resp != -1 || resp != 0) {
      mails[0] = emailToSender(parameters, resp.coName);
      mails[1] = emailToReceiver(parameters, resp.contactEmail);
    }
  });
  return mails;
}

async function postApproval(parameters) {
  var activities;
  await generic.getActivities(parameters.id, parameters.format.toLowerCase(), function (theActivities) {
    activities = theActivities.map(activity => activity.activity);
  })

  const destination = await Mail_Destination.subscriber_dirPerActivity(activities)
  if (destination != -1 && destination != 0) {
    if (parameters.description.length > 250)
    {
      parameters.description = parameters.description.substr(0, 250)
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
    }
  } else {
    return {
      subject: parameters.title,
      content: parameters.description,
      linkForMore: `${parameters.format.toLowerCase()}/${parameters.id}`,
      format: parameters.format,
      companyId: parameters.companyId
    }
  }
}

function deleteCompanyByOwner(parameters) {
  const subject = "Company Deletion",
    content = `You just deleted company "${parameters.companyName}" from the system.<br><br>
               In case you would want to recover it, click on below link within a month from now. <br><br><br>
               <a style="margin:35px 0;padding:15px 35px;background:#00AEEF;color:#ffffff;clear:both;border-radius:2px;text-decoration:none"
               href="${process.env.APP_URL}/recover-company/emaillink/${parameters.token}">Recover Company</a> <br><br>`;
  return {
    destination: parameters.email,
    subject: subject,
    content: content
  }
}

module.exports = {
  accountRegistration: accountRegistration,
  accountActivation: accountActivation,
  firstLogin: firstLogin,
  adminAccountCreation: adminAccountCreation,
  forgotPassword: forgotPassword,
  subscription: subscription,
  messagePost: messagePost,
  postApproval: postApproval,
  deleteCompanyByOwner: deleteCompanyByOwner
};