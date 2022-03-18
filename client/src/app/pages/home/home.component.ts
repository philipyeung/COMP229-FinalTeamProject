/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Home Component - home.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends BasePageComponent implements OnInit {

  user: User;

  constructor(route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { 
    super(route);
  }

  override ngOnInit(): void {
    this.user = new User();
  }

  //Navigates User Back to Home Page On Logout
  onLogoutClick() : void
  {
    this.authService.logout().subscribe(data => {
      this.router.navigate(['/login']); 
      });
  }

  //Checks if user is logged in
  isLoggedIn(): boolean
  {
    const result = this.authService.authenticated;
    if(result)
    {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    return result;
  }
}
