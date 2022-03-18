/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Survey Model - survey.js
*/

let mongoose = require('mongoose');

//Create Survey model class
let Survey = mongoose.Schema({
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
    collection: 'surveys'
});

module.exports = mongoose.model('Survey', Survey);