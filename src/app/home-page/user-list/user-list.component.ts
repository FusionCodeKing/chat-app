import { Component } from '@angular/core';
import { AF } from '../../services/af.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  public users: any;

  private userSubscription;

  constructor(private afService: AF) {
    this.users = this.afService.users;
    this.userSubscription = this.afService.usersChange.subscribe(snapshots => {
      this.users = snapshots;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  clickOnUser(userId) {
    this.afService.createChat(userId);
  }
}
