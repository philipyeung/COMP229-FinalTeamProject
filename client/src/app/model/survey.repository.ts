/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Survey Repository - survey.repository.ts
*/

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Question } from "./question.model";
import { Survey } from "./survey.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class SurveyRepository
{
    private questions: Question[] = [];
    private surveys: Survey[] = [];
    private loaded =  false;
    private categories: string[] = [];

    constructor(private dataSource: RestDataSource)
    {
        dataSource.getSurveys().subscribe(data => {
            this.surveys = data;
            this.categories = data.map(c => c.category).filter((n, index, array) => array.indexOf(n) === index).sort();
        })
    }

    //Load surveys from the RestDataSource
    loadSurveys(): void
    {
        this.loaded = true;
        this.dataSource.getSurveys().subscribe(surveys => this.surveys = surveys);
    }

    //Gets Surveys by Category and checks if active or not
    getSurveysByCategory(category?: string): Survey[]
    {    
        let surveyList = [];
        let surveysA = "";
        let surveysD = "";
        let activatesIn = 0;
        let deactivatesIn = 0;

        this.surveys.filter(s => category == null || category === s.category).forEach(function (survey) 
        {
            surveysA = survey.activatesIn as string;
            activatesIn = Date.parse(surveysA);
            surveysD = survey.deactivatesIn as string;
            deactivatesIn = Date.parse(surveysD);

            if(Date.now() >= activatesIn && Date.now() < deactivatesIn)
                    surveyList.push(survey);     
        })

        return surveyList as Survey[];
    }

    //Gets categories
    getCategories(): string[]
    {
        return this.categories;
    }

    //Gets surveys
    getSurveys(): Survey[] 
    {
        if(!this.loaded)
        {
            this.loadSurveys();
        }
        return this.surveys;
    }

    //Gets a survey based on an id
    getSurvey(id: number): Survey
    {
        return this.surveys.find(s => s._id === id) as Survey;
    }

    //Saves a survey
    saveSurvey(survey: Survey): Observable<Survey>
    {
        return this.dataSource.saveSurvey(survey);
    }

    //Updates a survey
    updateSurvey(updatedSurvey: Survey): void
    {
        this.dataSource.updateSurvey(updatedSurvey).subscribe(survey => {
            this.surveys.splice(this.surveys.findIndex(s => s._id === survey._id), 1, survey);
        })
    }

    //Deletes a survey based on an id
    deleteSurvey(id: number): void
    {
        this.dataSource.deleteSurvey(id).subscribe(survey => {
            this.surveys.splice(this.surveys.findIndex(s => id === s._id), 1);
        });
    }

    //Gets a question based on an id
    getQuestion(id: number): Question
    {
        return this.questions.find(q => q._id === id) as Question;
    }
}