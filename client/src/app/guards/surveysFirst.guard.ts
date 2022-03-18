/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Survey First Guard - surveyFirst.guard.ts
*/

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { SurveyListComponent } from "../survey-site/survey-list.component";

@Injectable()
export class SurveysFirstGuard
{   
    private firstNavigation = true;

    constructor(private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        if(this.firstNavigation)
        {
            this.firstNavigation = false;
            if(route.component !== SurveyListComponent)
            {
                this.router.navigateByUrl('/');
                return false;
            }
        }
        return true;
    }
}