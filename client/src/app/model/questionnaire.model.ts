/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Questionnaire Model - questionnaire.model.ts
*/

import { Injectable } from "@angular/core";
import { Question } from "./question.model";

@Injectable()
export class Questionnaire
{
    public lines: QuestionnaireLine[] = [];
    public updatedAnswer = "";

    //Addes a new line in a survey quesitonnaire
    addLine(question: Question, answer: string = ""): void
    {
        const line = this.lines.find(l => l.question._id === question._id);
        if(line !== undefined)
        {
            line.answer = answer;
        }
        else
        {
            console.log("Question pushed");
            this.lines.push(new QuestionnaireLine(question, answer));
        }
    }

    //Addes a new line in a survey-answered questionnaire
    addSurveyAnsweredLine(question: Question, answer: string): void
    {
        const line = this.lines.find(l => l.question._id === question._id);
        if(line !== undefined)
        {
            line.answer = answer;
        }
        else
        {
            this.lines.push(new QuestionnaireLine(question, answer));
        }
    }

    //Updates an answer
    updateAnswer(question: Question, answer: string): void
    {
        const line = this.lines.find(l => l.question._id === question._id);
        if(line !== undefined)
        {
            line.answer = String(answer);
        }
    }

    //Remove a line from a questionnaire
    removeLine(id: number): void
    {
        const index = this.lines.findIndex(l => l.question._id === id)
        this.lines.splice(index, 1);
    }

    //Clears questionnaire
    clear():void
    {
        this.lines = [];
    }
}

export class QuestionnaireLine
{
    constructor(public question: Question,
                public answer: string) { }
}