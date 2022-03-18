/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Admin Module - admin.module.ts
*/

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { AdminComponent } from "./admin.component";
import { SurveyTableComponent } from './survey-table/survey-table.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { QuestionTableComponent } from './question-table/question-table.component';
import { SurveyEditorComponent } from './survey-editor/survey-editor.component';
import { SurveyAditorComponent } from './survey-aditor/survey-aditor.component';
import { QuestionTableEditComponent } from './question-table-edit/question-table-edit.component';
import { RegisterComponent } from './register/register.component';
import { SurveyAnsweredTableComponent } from './survey-answered-table/survey-answered-table.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { StatsTableComponent } from './stats-table/stats-table.component';
import { HttpClientModule } from "@angular/common/http";
import { ContactService } from "./contact.service";
import { User } from "../model/user.model";

const routing = RouterModule.forChild([
    { path: 'auth', component: AuthComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'main', component: AdminComponent, canActivate: [AuthGuard],
        children: [
            { path: 'questions/:mode/:id', component: QuestionEditorComponent, data: {title: 'Edit Question'}, canActivate: [AuthGuard]},
            { path: 'questions/:mode', component: QuestionEditorComponent, data: {title: 'Add Question'}, canActivate: [AuthGuard]},
            { path: 'questions', component: QuestionTableComponent, data: {title: 'Question Table'}, canActivate: [AuthGuard]},

            { path: 'page-edit/:mode/:id', component: QuestionTableEditComponent, data: {title: 'Edit Question'}, canActivate: [AuthGuard]},
            { path: 'page-edit/:mode', component: QuestionTableEditComponent, data: {title: 'Question Table'}, canActivate: [AuthGuard]},
            { path: 'page-edit', component: QuestionTableEditComponent, data: {title: 'Question Table'}, canActivate: [AuthGuard]},
           
            { path: 'survey-answered', component: SurveyAnsweredTableComponent, canActivate: [AuthGuard]},
            
            { path: 'user-edit', component: UserEditorComponent, canActivate: [AuthGuard]},

            { path: 'stats-table/:id', component: StatsTableComponent, canActivate: [AuthGuard]},

            { path: 'surveys', component: SurveyTableComponent, data: {title: 'Survey Table'}, canActivate: [AuthGuard]},
            { path: 'surveys/:mode', component: SurveyEditorComponent, data: {title: 'Add Survey'}, canActivate: [AuthGuard]},
            { path: 'surveys/:mode/:id', component: SurveyAditorComponent, data: {title: 'Edit Survey'}, canActivate: [AuthGuard]}, 
            { path: '**', redirectTo: 'question-list'}]
    },
    { path: '**', redirectTo: 'auth' },
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, HttpClientModule, ReactiveFormsModule],
    providers:[AuthGuard, ContactService, User],
    declarations: [AuthComponent, AdminComponent, SurveyTableComponent, 
        QuestionEditorComponent, QuestionTableComponent, SurveyEditorComponent, 
        SurveyAditorComponent, QuestionTableEditComponent, RegisterComponent, 
        SurveyAnsweredTableComponent, UserEditorComponent, StatsTableComponent]
})
export class AdminModule {}