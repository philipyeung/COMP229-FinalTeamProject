/*
Student IDs: 
  Ho, Minh Trung (301153049)
  Yeung, Kai Hong (301229539)
WebApp name: Survey Site
Description: Base-Page Component - base-page.component.ts
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html'
})
export class BasePageComponent implements OnInit {
  title: string = '';

  constructor(private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.title = this.route.snapshot.data["title"];
  }
}
