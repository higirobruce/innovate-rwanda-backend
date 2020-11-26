var express = require('express');
var jwt = require('jsonwebtoken');
const router = express.Router();

// Controllers
const auth = require('./helpers/authorization_authentication');
const registrationController = require('./controllers/registrationController');
const loginController = require('./controllers/loginController');
const companyController = require('./controllers/companyController');
const userController = require('./controllers/userController');
const subscriptionController = require('./controllers/subscriptionController');
const jobController = require('./controllers/jobController');
const blogController = require('./controllers/blogController');
const eventController = require('./controllers/eventController');

/* 
 * Routes
 */
// Registration
router.post('/register', registrationController.register);

// Login
router.post('/login', loginController.login, auth.getToken);

// Companies
router.put('/coRegistrationApproval', auth.verifyToken, companyController.approveCompanyRegistration);
router.get('/directory', auth.verifyToken, companyController.getCompaniesList);
router.get('/publicDirectory', companyController.getApprovedCompaniesList);
router.get('/company/:companyId', companyController.getCompanyInfo);

// Users
router.get('/usersList', auth.verifyToken, userController.getUsersList);

// Subscriptions
router.post('/subscribe', subscriptionController.subscribeToNotification);
router.put('/unsubscribe', subscriptionController.unsubscribeFromNotification);
router.get('/subscriptionsList/:status', auth.verifyToken, subscriptionController.getSubscriptions);

// Job Posting
router.post('/postJob', auth.verifyToken, jobController.jobPost);
router.put('/approveJobPost', auth.verifyToken, jobController.approveJobPost);
router.get('/jobsList/:status', auth.verifyToken, jobController.getJobsList);

// Blogs
router.post('/postBlog', auth.verifyToken, blogController.blogPost);
router.put('/approveBlogPost', auth.verifyToken, blogController.approveBlogPost);
router.get('/blogsList/:status', auth.verifyToken, blogController.getBlogsList);

// Events
router.post('/postEvent', auth.verifyToken, eventController.eventPost);
router.put('/approveEventPost', auth.verifyToken, eventController.approveEventPost);
router.get('/eventsList/:status', auth.verifyToken, eventController.getEventsList);

/* 
 * To do
 */ 
// Search: all (in everything), on each page - search in title
//where, time, place, date, flyer, title, about event, description

// Add validation
// Sending emails where needed
// Edit company info and other -- Adding some more info
// Getting counters (Number of users, registered co, pending registration requests)
// DM a certain company --	company id, Email, message
// Forgot password
// Similar companies- by industry or by area of interest
// Search community directory by -- ecosystem enablers/tech companies—brings back a list with location, year, industry, area of interest, logo pic, company name, company summary, co website, main area of interest,  customer base
// Search --Community/Directory--on front page
// Search – all 
// Add subscribe_back -- check that email there already and change status to subscribed

module.exports = router;