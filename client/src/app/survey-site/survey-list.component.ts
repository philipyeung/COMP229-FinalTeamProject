/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Survey-List Component - survey-list.component.ts
*/

import { Component, OnInit, Injectable } from '@angular/core';
import { QuestionRepository } from '../model/question.repository';
import { Questionnaire } from '../model/questionnaire.model';
import {Router} from "@angular/router";
import { Location } from '@angular/common';
import { SurveyRepository } from '../model/survey.repository';
import { Survey } from '../model/survey.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html'
})
export class SurveyListComponent implements OnInit
{
  public selectedCategory = null;
  public surveysPerPage = 4;
  public selectedPage = 1;
  public surveysAnimals;
  
  constructor(private repository: QuestionRepository,
              private surveyRepository: SurveyRepository,
              private questionnaire: Questionnaire,
              private router: Router,
              private location: Location) { }

  //Gets Surveys from the Survey Repository
  get surveys(): Survey[]
  {
    const pageIndex = (this.selectedPage - 1) * this.surveysPerPage;
    return this.surveyRepository.getSurveysByCategory(this.selectedCategory)
    .slice(pageIndex, pageIndex + this.surveysPerPage);
  }

  //Gets Categories from the Survey Repository
  get categories(): string[]
  {
    return this.surveyRepository.getCategories();
  }
 
  //Changes the category to the selected one
  changeCategory(newCategory?: string): void
  {
    this.selectedCategory = newCategory;
  }

  //Changes the page to the selected one
  changePage(newPage: number) : void
  {
    this.selectedPage = newPage;
  }

  //Changes the page size based on surveys per page
  changePageSize(newSize: number): void
  {
    this.surveysPerPage = Number(newSize);
    this.changePage(1);
  }

  //Gets a page count
  get pageCount(): number
  {
    return Math.ceil(this.surveyRepository
      .getSurveysByCategory(this.selectedCategory).length / this.surveysPerPage);
  }

  //Navigates to the questionnaire component and passes the selected survey ID
  selectSurvey(id: number): void
  {
    this.router.navigateByUrl('/questionnaire/' + id);
  }

  ngOnInit(): void {
  }
}
