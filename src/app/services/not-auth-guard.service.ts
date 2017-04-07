import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AF } from './af.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private afService: AF, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.afService.af.auth
      .take(1)
      .map(state => {
        if (!!state ) this.router.navigate([ '/' ]);
        return true;
      });
  }
}