import { Component } from '@angular/core';
import { AF } from '../services/af.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public error: any;

  constructor(public afService: AF, private router: Router) {
  }

  loginWithGoogle() {
    this.afService.loginWithGoogle()
      .then((data) => {
        this.afService.checkUserData(data.uid)
          .subscribe(snapshot => {
            if (snapshot.val()) {
              this.router.navigate(['']);
            } else {
              this.router.navigate(['complete']);
            }
          });
      })
  }

  loginWithEmail(event, email, password) {
    event.preventDefault();
    this.afService.loginWithEmail(email, password)
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((error: any) => {
        if (error) {
          this.error = error;
        }
      });
  }
}
