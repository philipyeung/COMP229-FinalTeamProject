/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Survey-Aditor Component - survey-aditor.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Questionnaire } from 'src/app/model/questionnaire.model';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-survey-aditor',
  templateUrl: './survey-aditor.component.html'
})
export class SurveyAditorComponent implements OnInit {
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
    Object.assign(this.survey, repository.getSurvey(activeRoute.snapshot.params.id));
  }

  ngOnInit(): void {
  }

  //Update surveys
  updateSurvey(form: NgForm): void
  {
    this.submitted = true;
    if(form.valid)
    {
        this.repository.updateSurvey(this.survey);
    }

    this.router.navigate(['/admin/main/surveys']).then(() => {window.location.reload()}); //Same fix as teacher 
  }
}
