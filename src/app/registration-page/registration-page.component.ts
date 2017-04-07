import { Component } from '@angular/core';
import { AF } from '../services/af.service';
import { Utils } from '../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  error: any;
  titles: any[];

  constructor(private afService: AF, private router: Router, private utils: Utils) {
    this.titles = utils.titles;
  }

  register(event, title, name, lastname, company, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password)
      .then((user) => {
        this.afService.saveUserInfo(user.uid, title, name, lastname, company)
          .then(() => {
            this.router.navigate(['']);
          })
          .catch((error) => {
            this.error = error;
          });
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
