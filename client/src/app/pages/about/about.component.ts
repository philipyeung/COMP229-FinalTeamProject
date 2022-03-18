/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: About Component - about.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasePageComponent } from '../../partials/base-page/base-page.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent extends BasePageComponent implements OnInit {

  constructor(route : ActivatedRoute) {
    super(route);
   }

  override ngOnInit(): void {
  }
}
