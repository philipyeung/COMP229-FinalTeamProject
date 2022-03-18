/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Controller to allow Full CRUD on Question Object - question.js
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

//Create a reference to the db schema which is the model
let Question = require('../models/question');

module.exports.displayQuestionList= (req, res, next) => {
    Question.find((err, questionList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json(questionList);
        }
    });
};

module.exports.displayAddPage = (req, res, next) => {
    res.json({success: true, msg: 'Successfully Displayed Add Page'});
};

module.exports.processedAddPage =  (req, res, next) => {
    let newQuestion = Question({
        "title": req.body.title, 
        "choice1": req.body.choice1,
        "choice2": req.body.choice2,
        "choice3": req.body.choice3,
        "choice4": req.body.choice4
    });
    
    //This is to create the new question into the database
    Question.create(newQuestion, (err, Question) => {
     if(err)
     {
         console.log(err);
         res.end(err);
     }
     else
     {
         res.json({success: true, msg: 'Successfully Added a New Question'});
     }
    });
 };

 module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id; 

    Question.findById(id, (err, questionToEdit) => 
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Displayed Question to Edit', question: questionToEdit});
        }
    });
};

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedQuestion = new Question({
        "_id": id,
        "title": req.body.title, 
        "choice1": req.body.choice1,
        "choice2": req.body.choice2,
        "choice3": req.body.choice3,
        "choice4": req.body.choice4
    });

    Question.updateOne({_id: id}, updatedQuestion, (err) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Edited Question', question: updatedQuestion});
        }
    });
};

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Question.deleteOne({_id: id}, (err) => 
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Deleted Question'});
        }
    })
};
