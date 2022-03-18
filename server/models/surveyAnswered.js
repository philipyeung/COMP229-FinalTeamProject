/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: SurveyAnswered Model - surveyAnswered.js
*/

let mongoose = require('mongoose');

//Create SurveyAnswered model class
let SurveyAnswered = mongoose.Schema({
    title: String,
    category: String,
    description: String,
    name: String,
    address: String,
    city: String,
    province: String,
    postalCode: String,
    country: String,
    activatesIn: String,
    deactivatesIn: String,
    questionnaire: 
    {
        lines:
        [{question:
            {
                title: String,
                choice1: String,
                choice2: String,
                choice3: String,
                choice4: String
            },
            answer: String
        }]
    }
},
{
    collection: 'surveyAnswered'
});

module.exports = mongoose.model('SurveyAnswered', SurveyAnswered);