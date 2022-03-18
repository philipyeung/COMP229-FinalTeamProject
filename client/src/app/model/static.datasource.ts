/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Static Data Source - static.datasource.ts
*/

import { Injectable } from '@angular/core';
import {Question} from './question.model';
import { from, Observable } from 'rxjs';
import { Survey } from './survey.model';

@Injectable()
export class StaticDataSource
{
    private questions: Question[] = 
    [
        new Question(1, 'Question 1', 'Right Answer 1'),
        new Question(2, 'Question 2', 'Right Answer 1'),
        new Question(3, 'Question 3', 'Right Answer 1'),
        new Question(4, 'Question 4', 'Right Answer 1'),
        new Question(5, 'Question 5', 'Right Answer 1'),
        new Question(6, 'Question 6', 'Right Answer 2'),
        new Question(7, 'Question 7', 'Right Answer 2'),
        new Question(8, 'Question 8', 'Right Answer 2'),
        new Question(9, 'Question 9', 'Right Answer 2'),
        new Question(10, 'Question 10', 'Right Answer 3'),
        new Question(11, 'Question 11', 'Right Answer 3'),
        new Question(12, 'Question 12', 'Right Answer 3'),
        new Question(13, 'Question 13', 'Right Answer 4'),
        new Question(14, 'Question 14', 'Right Answer 4'),
        new Question(15, 'Question 15', 'Right Answer 4')
    ];

    //Gets Questions from the above question array
    getQuestions(): Observable<Question[]>
    {
        return from([this.questions]);
    }

    //Saves survey
    saveSurvey(survey: Survey): Observable<Survey>
    {
        console.log(JSON.stringify(survey));
        return from ([survey]);
    }
}