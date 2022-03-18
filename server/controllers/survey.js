/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Controller to allow Full CRUD on Survey Object - survey.js
*/

let express = require('express');
const survey = require('../models/survey');
let router = express.Router();

let Survey = require('../models/survey');
let Container = require('../models/container');
let Questionnaire = Container.Questionnaire;
let Question = Container.Question;

module.exports.displaySurveyList = (req, res, next) => 
{
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json(surveyList);
        }
    });
}

module.exports.processAddPage = (req, res, next) => {
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

    //Create a new Survey Object
    let newSurvey = Survey({
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
    
    //Add new Survey Object to the Database
    Survey.create(newSurvey, (err, Survey) => 
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: "Successfully Added New Survey"});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
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

    // Update the Survey Object
    let updatedSurvey = Survey({
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

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Edited Survey', survey: updatedSurvey});
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Deleted Survey'});
        }
    });
}