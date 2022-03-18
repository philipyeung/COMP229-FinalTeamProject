/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Auth Guard Component - auth.guard.ts
*/

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "src/app/model/auth.service";

@Injectable()
export class AuthGuard
{
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    constructor(private router: Router,
                private auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        if(this.auth.authenticated)
        {
            console.log('authenticated');
            return true;
        }
        else
        {
            console.log('cannot authenticate');
            this.router.navigate(['/admin/auth']);
            return false;
        }
    }
}