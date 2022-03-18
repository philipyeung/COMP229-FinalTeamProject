/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Survey Table Component - survey-table.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { User } from 'src/app/model/user.model';

@Component({
  templateUrl: './survey-table.component.html'
})
export class SurveyTableComponent implements OnInit 
{
  includeShipped = false;

  constructor(private repository: SurveyRepository,
              private router: Router,
              public user: User) { }

  ngOnInit(): void {
  }

  //Get surveys
  getSurveys(): Survey[]
  {
    return this.repository.getSurveys();
  }

  //Delete a survey based on an id
  delete(id: number): void
  {
    if(confirm("Are you sure?"))
    {
      this.repository.deleteSurvey(id);
    }
    else
    {
      this.router.navigateByUrl('/admin/main/surveys');
    }
  }

  //Go to edit survey page
  editSurvey(id: number): void 
  {
    this.router.navigateByUrl('/admin/main/surveys/edit/' + id);
  }

  //Go to stats page
  stats(id: number): void
  {
    this.router.navigateByUrl('/admin/main/stats-table/' + id); 
  }

  modifyUser(id: string): void
  {
    this.router.navigateByUrl('/admin/main/user-edit');
  }
}
