/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Question Table Component - question-table.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { QuestionRepository } from 'src/app/model/question.repository';
import { Questionnaire } from 'src/app/model/questionnaire.model';

@Component({
  templateUrl: './question-table.component.html'
})
export class QuestionTableComponent implements OnInit {

  constructor(private repository: QuestionRepository,
              private router: Router,
              public questionnaire: Questionnaire) { }

  ngOnInit(): void {
  }

  //Get Questions
  getQuestions(): Question[]
  {
    return this.repository.getQuestions();
  }

  //Delete Question
  deleteQuestion(id: number): void
  {
    if(confirm("Are you sure?") && (id !== undefined))
    {
      this.repository.deleteQuestion(id);
    }
    else
    {
      window.location.reload(); //Refresh fix
      this.router.navigateByUrl('/admin/main/questions');
    }
  }

  //Edit Question
  editQuestion(id: number): void
  {
    this.router.navigateByUrl('/admin/main/questions/edit/' + id);
  }

  //Add Question to Questionnaire
  addQuestionToQuestionnaire(question: Question): void
  {
    this.questionnaire.addLine(question);
    this.router.navigateByUrl('/admin/main/surveys/add');
  }
}
