/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Question Repository - question.repository.ts
*/

import { Injectable } from "@angular/core";
import {Question} from "./question.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class QuestionRepository
{
    private questions: Question[] = [];
    private loaded =  false;

    constructor(private dataSource: RestDataSource)
    {
        dataSource.getQuestions().subscribe(data => {
            this.questions=data;});
    }

    //Load questions from the RestDataSource
    loadQuestions(): void
    {
        this.loaded = true;
        this.dataSource.getQuestions().subscribe(questions => this.questions = questions);
    }

    //Returns array of question
    getQuestions(): Question[]
    {
        if(!this.loaded)
        {
            this.loadQuestions();
        }
      return this.questions;
    }

    //Returns Sepecific Question based on Id
    getQuestion(id: number): Question
    {
        return this.questions.find(q => q._id === id) as Question;
    }

    //Saves a Question in the Question Repository
    saveQuestion(savedQuestion: Question): void
    {
        if(savedQuestion._id === null || savedQuestion._id === 0 || savedQuestion._id === undefined)
        {
            this.dataSource.addQuestion(savedQuestion).subscribe(question => {
                this.questions.push(savedQuestion);
            })
        }
        else
        {
            this.dataSource.updateQuestion(savedQuestion).subscribe(question => {
                this.questions.splice(this.questions.findIndex(q => q._id === savedQuestion._id), 1, savedQuestion);
            });
        }
    }

    //Deletes a Specific Question based on id
    deleteQuestion(deletedQuestionID: number): void
    {
        this.dataSource.deleteQuestion(deletedQuestionID).subscribe(question => {
            this.questions.splice(this.questions.findIndex(q => q._id === deletedQuestionID), 1);
        })
    }
}