/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Survey Editor Component - survey-editor.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Questionnaire } from 'src/app/model/questionnaire.model';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-survey-editor',
  templateUrl: './survey-editor.component.html'
})
export class SurveyEditorComponent implements OnInit {
  editing = false;
  submitted = false;
  surveySent = false;

  constructor(private router: Router,
              public survey: Survey,
              private repository: SurveyRepository,
              public questionnaire: Questionnaire,
              private activeRoute: ActivatedRoute) 
  {
    this.editing = activeRoute.snapshot.params.mode === 'edit'; 

    if(this.editing)
    {
      Object.assign(this.survey, repository.getSurvey(activeRoute.snapshot.params.id)); 
    }
  }

  ngOnInit(): void {
  }

  //Submits a survey
  submitSurvey(form: NgForm): void
  {
    console.log(this.survey.toString());
    this.submitted = true;
    if(form.valid)
    {
        this.repository.saveSurvey(this.survey).subscribe(survey => {
        this.survey.clear();
        this.surveySent = true;
        this.submitted = false;
      });
    }
  }

  //Go to add question
  addQuestion(): void 
  {
    this.router.navigateByUrl('/admin/main/questions');
  }

  //Go to survey list
  surveyList(): void
  {
    this.router.navigate(['/admin/main/surveys']).then(() => {window.location.reload()}); //Same fix as teacher 
  }

  //Go to survey list
  cancel(): void
  {
    this.router.navigateByUrl('/admin/main/surveys');
  }
}
