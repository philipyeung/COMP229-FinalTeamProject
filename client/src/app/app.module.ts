/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Manifest of the app folder - app.module.ts
*/

//Manifest for the app folder
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BookStoreModule} from './survey-site/survey-list.module'
import { PagesModule } from './pages/pages.module';
import { PartialsModule } from './partials/partials.module';

//Exports a global function
export function jwtTokenGetter(): string
{
  return localStorage.getItem('id_token');
}

//Decorator function
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BookStoreModule,
    PagesModule,
    PartialsModule,

    JwtModule.forRoot({
      config:{
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
