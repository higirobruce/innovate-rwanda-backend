import generic from "./Generic";
const Mail_Destination = require('./Mail_Destination.js');

function accountRegistration(parameters) {
  const subject = "We’re almost there let's verify your email",
    content = `Dear ${parameters.firstName} ${parameters.lastName},<br><br> 
                  Please verify your email in order to access your account. <br>
                  Click on the button below or open it in your browser to activate your account, It will expire in 1h.<br><br><br>
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
    content = `Thank you ${parameters.firstName} ${parameters.lastName} for login in Innovate Rwanda. For the next step you may complete your company profile.`;
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

function emailToSender(parameters) {
  const subject = "Thanks for contacting us",
    content = "The email is checked regularly during business hours. We’ll get back to you as soon as possible.";
  return {
    destination: parameters.email,
    subject: subject,
    content: content
  }
}

async function emailToReceiver(parameters, callback) {
  await generic.getCompanyEmail(parameters.companyId, function (resp) {
    console.log(resp)
    if (resp != -1 || resp != 0) {
      callback({
        destination: resp,
        subject: "You got a new message from " + parameters.email,
        content: "The message is: " + parameters.message
      });
    } else {
      callback(resp);
    }
  });
}

async function messagePost(parameters) {
  var mails = new Array();
  mails[0] = await emailToSender(parameters);

  await emailToReceiver(parameters, function (rcvMail) {
    if (rcvMail != -1 || rcvMail != 0) {
      mails[1] = rcvMail;
    }
  })
  return mails;
}

async function jobApproval(parameters) {
  var activities;
  await generic.getJobActivities(parameters.jobId, function (rcvMail) {
    console.log("activities found:")
    var activities = rcvMail.map(activity => activity.activity);
    console.log(activities)
  })
  await Mail_Destination.subscriber_dirPerActivity(activities, function (destination) {
    if (destination != -1) {
      return {
        destination: destination,
        subject: "New Post",
        content: "A new post has just been uploaded, check on it on the system"
      }
    }
  });
}

module.exports = {
  accountRegistration: accountRegistration,
  accountActivation: accountActivation,
  firstLogin: firstLogin,
  adminAccountCreation: adminAccountCreation,
  forgotPassword: forgotPassword,
  subscription: subscription,
  messagePost: messagePost,
  jobApproval:jobApproval
};