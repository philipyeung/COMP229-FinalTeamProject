/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: SurveyAnswered Repository - surveyAnswered.repository.ts
*/

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Question } from "./question.model";
import { Survey } from "./survey.model";
import { RestDataSource } from "./rest.datasource";
import { SurveyAnswered } from "./surveyAnswered.model";

@Injectable()
export class SurveyAnsweredRepository
{
    private questions: Question[] = [];
    private surveyAnswered: SurveyAnswered[] = [];
    private loaded =  false;
    private categories: string[] = [];

    constructor(private dataSource: RestDataSource)
    {
        dataSource.getAnsweredSurveys().subscribe(data => {
            this.surveyAnswered = data;})
    }

    //Loads surveys from RestDataSource
    loadSurveys(): void
    {
        this.loaded = true;
        this.dataSource.getAnsweredSurveys().subscribe(surveyAnswered => this.surveyAnswered = surveyAnswered);
    }

    //Filters suveys by category
    getSurveysByCategory(category?: string): Survey[]
    {
        return this.surveyAnswered.filter(s => category == null || category === s.category);
    }

    //Gets a category
    getCategories(): string[]
    {
        return this.categories;
    }

    //Gets they surveys
    getSurveys(): Survey[]
    {
        if(!this.loaded)
        {
            this.loadSurveys();
        }
        return this.surveyAnswered;
    }

    //Get a specific survey based on an id
    getSurvey(id: number): Survey
    {
        console.log();
        return this.surveyAnswered.find(s => s._id === id) as Survey;
    }

    //Saves a survey
    saveSurvey(surveyAnswered: SurveyAnswered): Observable<SurveyAnswered>
    {
        return this.dataSource.saveSurveyAnswered(surveyAnswered);
    }

    //Updates a survey
    updateSurvey(surveyAnswered: SurveyAnswered): void
    {
        this.dataSource.updateSurveyAnswered(surveyAnswered).subscribe(survey => {
            this.surveyAnswered.splice(this.surveyAnswered.findIndex(s => s._id === survey._id), 1, survey);
        })
    }

    //Deletes a survey based on an id
    deleteSurvey(id: number): void
    {
        this.dataSource.deleteSurveyAnswered(id).subscribe(survey => {
            this.surveyAnswered.splice(this.surveyAnswered.findIndex(s => id === s._id), 1);
        });
    }

    //Gets a question based on an id
    getQuestion(id: number): Question
    {
        return this.questions.find(q => q._id === id) as Question;
    }
}