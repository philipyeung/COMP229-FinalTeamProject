/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Module of the survey-list folder - survey-list.module.ts
*/

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module"
import { SurveyListComponent } from "./survey-list.component";
import { CounterDirective } from "./counter.directive";
import { QuestionnaireDetailComponent } from './questionnaire-detail/questionnaire-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
    declarations: [SurveyListComponent, CounterDirective, QuestionnaireDetailComponent, CheckoutComponent],
    exports: [SurveyListComponent, CounterDirective, QuestionnaireDetailComponent, CheckoutComponent]
})
export class BookStoreModule {}