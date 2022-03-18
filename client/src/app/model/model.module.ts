/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Model Module - model.module.ts
*/

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { QuestionRepository } from "./question.repository";
import { Questionnaire } from "./questionnaire.model";
import { Survey } from "./survey.model";
import { SurveyRepository } from "./survey.repository";
import { RestDataSource } from "./rest.datasource";
import { StaticDataSource } from "./static.datasource";
import { SurveyAnswered } from "./surveyAnswered.model";
import { SurveyAnsweredRepository } from "./surveyAnswered.repository";

@NgModule({
    imports: [HttpClientModule],
    providers: [QuestionRepository, StaticDataSource, Questionnaire, Survey, SurveyRepository, SurveyAnsweredRepository, SurveyAnswered,
    {provide: StaticDataSource, useClass: RestDataSource}, 
    RestDataSource, AuthService]
})
export class ModelModule{}