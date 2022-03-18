/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Routes of the survey - survey.js
*/

let express =  require('express');
let router = express.Router();

let passport = require('passport');

let surveyController = require('../controllers/survey');

/*GET ORDER LIST -- READ */
router.get('/', surveyController.displaySurveyList);

/*POST Route for processing the Add Order Page */
router.post('/add', surveyController.processAddPage);

/*POST Request - Update the database with data from the Edit Order Page*/
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), surveyController.processEditPage);

/*GET Request - Perform the delete Order Action */
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), surveyController.performDelete);

module.exports = router;