/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Rest DataSource - rest.datasource.ts
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question.model';
import { Survey } from './survey.model';
import {JwtHelperService} from '@auth0/angular-jwt';

import { User } from './user.model';
import { SurveyAnswered } from './surveyAnswered.model';

const PROTOCOL = 'http';
const PORT = 3000;
//const PROTOCOL = 'https';
//const PORT = 3500;

@Injectable()
export class RestDataSource
{
  user: User;
  baseUrl: string;
  authToken: string;

  //header
  private httpOptions = 
{
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
};

  constructor(private http: HttpClient,
              private jwtService: JwtHelperService)
  {
    this.user = new User();
    //this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    this.baseUrl = 'https://comp229-final-team-project.herokuapp.com/';
  }

  /*USER*/
  //Authenticate an Existing User
  authenticate(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'login', user, this.httpOptions);
  }

  //Authenticate a New User
  authenticateRegister(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'register', user, this.httpOptions);
  }

  //Modifies a User
  modifyUser(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'user-edit', user, this.httpOptions);
  }

  //Stores User Data
  storeUserData(token: any, user: User): void
  {
    localStorage.setItem('id_token', 'Bearer ' + token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //Logs a User Out
  logout(): Observable<any>
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    return this.http.get<any>(this.baseUrl + 'logout', this.httpOptions)
  }

  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(this.baseUrl + 'user-edit');
  }

  //Checks if the User is LoggedIn
  loggedIn(): boolean
  {
    return !this.jwtService.isTokenExpired(this.authToken);
  }

  /* QUESTION */
  /*GET Question*/
  getQuestions(): Observable<Question[]>
  {
    return this.http.get<Question[]>(this.baseUrl + 'question-list', this.httpOptions);
  }

  /*ADD Question*/
  addQuestion(question: Question): Observable<Question>
  {
    this.loadToken();
    return this.http.post<Question>(this.baseUrl + 'question-list/add', question, this.httpOptions);
  }

  /*UPDATE Question*/
  updateQuestion(question: Question): Observable<Question>
  {
    this.loadToken();
    return this.http.post<Question>(`${this.baseUrl}question-list/edit/${question._id}`, question, this.httpOptions);
  }

  /*DELETE Question*/
  deleteQuestion(id: number): Observable<Question>
  {
    this.loadToken();
    console.log(id);
    return this.http.get<Question>(`${this.baseUrl}question-list/delete/${id}`, this.httpOptions);
  }

  /*SURVEYS*/
  /*GET Survey*/
  getSurveys(): Observable<Survey[]>
  {
    this.loadToken();
    return this.http.get<Survey[]>(this.baseUrl + 'surveys');
  }

  /*SAVE Survey*/
  saveSurvey(survey: Survey): Observable<Survey>
  {
      console.log(JSON.stringify(survey));
      return this.http.post<Survey>(this.baseUrl + 'surveys/add', survey); 
  }

  /*UPDATE Survey*/
  updateSurvey(survey: Survey): Observable<Survey>
  {
    this.loadToken();
    return this.http.post<Survey>(`${this.baseUrl}surveys/edit/${survey._id}`, survey, this.httpOptions);
  }
  
  /*DELETE Survey*/
  deleteSurvey(id: number): Observable<Survey>
  {
    this.loadToken();
    return this.http.get<Survey>(`${this.baseUrl}surveys/delete/${id}`, this.httpOptions);
  }

  /*ANSWERED SURVEYS*/
  /*GET AnsweredSurvey*/
  getAnsweredSurveys(): Observable<SurveyAnswered[]>
  {
    this.loadToken();
    return this.http.get<SurveyAnswered[]>(this.baseUrl + 'surveyAnswered');
  }

   /*SAVE AnsweredSurvey*/
  saveSurveyAnswered(surveyAnswered: SurveyAnswered): Observable<SurveyAnswered>
  {
    console.log(JSON.stringify(surveyAnswered));
    return this.http.post<SurveyAnswered>(this.baseUrl + 'surveyAnswered/add', surveyAnswered);
  }

  /*UPDATE AnsweredSurvey*/
  updateSurveyAnswered(surveyAnswered: SurveyAnswered): Observable<SurveyAnswered>
  {
    this.loadToken();
    return this.http.post<SurveyAnswered>(`${this.baseUrl}updatedOrders/edit/${surveyAnswered._id}`, surveyAnswered, this.httpOptions);
  }

  /*DELETE AnsweredSurvey*/
  deleteSurveyAnswered(id: number): Observable<SurveyAnswered>
  {
    this.loadToken();
    return this.http.get<SurveyAnswered>(`${this.baseUrl}surveyAnswered/delete/${id}`, this.httpOptions);
  }

  //Loads User Token
  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}

