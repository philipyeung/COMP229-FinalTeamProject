/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: User Editor Component - user-editor.component.ts
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html'
})
export class UserEditorComponent implements OnInit {
  
  public errorMessage: string;
  
  constructor(private router: Router,
              private auth: AuthService,
              private activeRoute: ActivatedRoute,
              public user: User) 
  {
      Object.assign(this.user, auth.getUser(activeRoute.snapshot.params.id)); 
  }

  ngOnInit(): void {
    
  }
}
