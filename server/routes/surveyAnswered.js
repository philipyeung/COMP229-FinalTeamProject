/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Routes of the survey-answered - surveyAnswered.js
*/

let express =  require('express');
let router = express.Router();

let passport = require('passport');

let surveyAnsweredController = require('../controllers/surveyAnswered');

/*GET ORDER LIST -- READ */
router.get('/', surveyAnsweredController.displaySurveyAnsweredList);

/*POST Route for processing the Add Order Page */
router.post('/add', surveyAnsweredController.processSurveyAnsweredAddPage);

/*POST Request - Update the database with data from the Edit Order Page*/
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), surveyAnsweredController.processSurveyAnsweredEditPage);

/*GET Request - Perform the delete Order Action */
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), surveyAnsweredController.performDelete);

module.exports = router;