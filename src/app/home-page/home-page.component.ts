import {Component} from '@angular/core';
import { AF } from '../services/af.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  public widthOfUserList: number;

  private preferencesSubscription;

  constructor(private afService: AF) {
    if (this.afService.preferences.width) {
      this.widthOfUserList = this.afService.preferences.width;
    }
    this.preferencesSubscription = this.afService.preferencesChange.subscribe(snapshots => {
      this.widthOfUserList = snapshots.width;
    });
  }

  ngOnDestroy() {
    this.preferencesSubscription.unsubscribe();
  }

  saveWidth(width) {
    this.afService.savePreferences({width: width});
  }
}
