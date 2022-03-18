/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Question Model - question.js
*/

let mongoose = require('mongoose');

//Question Model
let questionModel = mongoose.Schema({
    title: String,
    choice1: String,
    choice2: String,
    choice3: String,
    choice4: String
},
{
    collection: "questions"
});

module.exports = mongoose.model('Question', questionModel);