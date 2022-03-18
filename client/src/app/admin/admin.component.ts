/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Admin Component - admin.component.ts
*/

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";

@Component({
    templateUrl: './admin.component.html'
})
export class AdminComponent
{
    constructor(private auth: AuthService,
                private router: Router) {}

    logout(): void
    {
        this.auth.logout();
        this.router.navigateByUrl('/');
    }
}