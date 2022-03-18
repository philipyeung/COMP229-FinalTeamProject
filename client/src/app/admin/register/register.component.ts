/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Registed Component - register.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public user: User;
  public errorMessage: string;

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void 
  {
    this.user = new User();
  }

  //Authenticating a New User
  authenticateRegister(form: NgForm): void
  {
    if(form.valid)
    {
      this.auth.authenticateRegister(this.user).subscribe(data => {
        
        if(data.success)
          {
            
            this.auth.storeUserData(data.token, data.user);
            //this.router.navigateByUrl('admin/auth');
            
          }
          this.router.navigateByUrl('admin/auth');
      });
    }
    else
    {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
