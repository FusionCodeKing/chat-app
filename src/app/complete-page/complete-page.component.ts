import { Component } from '@angular/core';
import { AF } from '../services/af.service';
import { Utils } from '../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-page',
  templateUrl: './complete-page.component.html',
  styleUrls: ['./complete-page.component.css']
})
export class CompletePageComponent {
  titles: any[];
  error: any;

  constructor(private afService: AF, private router: Router, private utils: Utils) {
    this.titles = utils.titles;
  }

  register(event, title, name, lastname, company) {
    event.preventDefault();
    this.afService.saveUserInfo(this.afService.user.$key, title, name, lastname, company)
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
