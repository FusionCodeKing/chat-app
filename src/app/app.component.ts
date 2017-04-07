import { Component } from '@angular/core';
import { AF } from "./services/af.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;

  constructor(public afService: AF, private router: Router) {
    this.afService.af.auth
      .subscribe(auth => {
        this.isLoggedIn = !!auth;
      }
    );
  }

  logout() {
    this.afService.logout().then(() => this.router.navigate(['login']));
  }
}
