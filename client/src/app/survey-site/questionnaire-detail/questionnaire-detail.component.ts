/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Questionnaire-Detail Component - questionnaire-detail.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Questionnaire } from 'src/app/model/questionnaire.model';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { SurveyAnswered } from 'src/app/model/surveyAnswered.model';
import { SurveyAnsweredRepository } from 'src/app/model/surveyAnswered.repository';

@Component({
  selector: 'app-questionnaire-detail',
  templateUrl: './questionnaire-detail.component.html'
})
export class QuestionnaireDetailComponent implements OnInit {
  editing = false;
  
  constructor(public questionnaire: Questionnaire,
              public survey: Survey,
              private surveyAnswered: SurveyAnswered,
              private repositorySurvey: SurveyRepository,
              private repository: SurveyAnsweredRepository,
              private activeRoute: ActivatedRoute,
              private router: Router) 
  {
      Object.assign(this.survey, repositorySurvey.getSurvey(activeRoute.snapshot.params.id));
  }

  ngOnInit(): void {
  }

  //Submits the filled survey to the SurveyAnswered Repository
  submitSurvey(survey: Survey): void
  {
    this.surveyAnswered = survey;
    this.repository.saveSurvey(this.surveyAnswered).subscribe();
    window.alert("Your Survey has been submitted")
    this.router.navigate(['/']).then(() => {window.location.reload()}); 
  }
}
