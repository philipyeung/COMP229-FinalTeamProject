import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  surveySent = false;
  submitted = false;

  constructor(public repository: SurveyRepository, 
              public survey: Survey) { }

  ngOnInit(): void {
  }

  submitSurvey(form: NgForm): void
  {
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
}
