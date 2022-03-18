/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Header Component - header.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void 
  {
    this.user = new User();
  }

  //Logs Out The User
  onLogoutClick() : void
  {
    this.authService.logout().subscribe(data => {
      this.router.navigate(['/login']); 
      });
  }

  //Checks if User is Logged In
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
