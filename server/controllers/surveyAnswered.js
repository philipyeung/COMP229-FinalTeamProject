/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Controller to allow Full CRUD on SurveyAnswered Object - surveyAnswered.js
*/

let express = require('express');
const survey = require('../models/survey');
let router = express.Router();

let SurveyAnswered = require('../models/surveyAnswered');
let Container = require('../models/container');
let Questionnaire = Container.Questionnaire;
let Question = Container.Question;

module.exports.displaySurveyAnsweredList = (req, res, next) => 
{
    SurveyAnswered.find((err, surveyAnsweredList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json(surveyAnsweredList);
        }
    });
}

module.exports.processSurveyAnsweredAddPage = (req, res, next) => {
    //Serialize the questionnaire data
    let questionnaire = new Questionnaire();

    //Serialize the Line Data
    for(let line of req.body.questionnaire.lines)
    {
        let question = new Question(
            line.question._id, 
            line.question.title,
            line.question.choice1,
            line.question.choice2,
            line.question.choice3,
            line.question.choice4
        );
        let answer = line.answer;
        questionnaire.lines.push({question, answer});
    }

    //Create a new SurveyAnswered Object
    let newSurveyAnswered = SurveyAnswered({
        "title": req.body.title,
        "category": req.body.category,
        "description": req.body.description,
        "name": req.body.name,
        "address": req.body.address,
        "city": req.body.city,
        "province": req.body.province,
        "postalCode": req.body.postalCode,
        "country": req.body.country,   
        "questionnaire": questionnaire,
        "activatesIn": req.body.activatesIn,
        "deactivatesIn": req.body.deactivatesIn 
    })

    
    //Add new Survey Answered Object to the Database
    SurveyAnswered.create(newSurveyAnswered, (err, SurveyAnswered) => 
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: "Successfully Added New Survey Answered"});
        }
    });
}

module.exports.processSurveyAnsweredEditPage = (req, res, next) => {
    let id = req.params.id;

    // SERIALIZE QUESTIONNAIRE DATA
    let questionnaire = new Questionnaire();

    // serialize the line data
    for(let line of req.body.questionnaire.lines)
    {
        let question = new Question(
          line.question._id,
          line.question.title,
          line.question.choice1,
          line.question.choice2,
          line.question.choice3,
          line.question.choice4
        );
        let answer = line.answer;
        questionnaire.lines.push({question, answer});
    }

    // Update the Survey Answered Object
    let surveyAnswered = SurveyAnswered({
        "_id": id,
        "title": req.body.title,
        "category": req.body.category,
        "description": req.body.description,
        "name": req.body.name,
        "address": req.body.address,
        "city": req.body.city,
        "province": req.body.province,
        "postalCode": req.body.postalCode,
        "country": req.body.country,   
        "questionnaire": questionnaire,
        "activatesIn": req.body.activatesIn,
        "deactivatesIn": req.body.deactivatesIn
    });

    SurveyAnswered.updateOne({_id: id}, surveyAnswered, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Edited Survey Answered', surveyAnswered: surveyAnswered});
        }
    })
}


module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    SurveyAnswered.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Deleted Survey Answered'});
        }
    });
}