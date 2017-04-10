import {Component, ElementRef, ViewChild} from '@angular/core';
import { AF } from '../../services/af.service';
import {FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public newMessage: string;
  public messages: FirebaseListObservable<any>;
  public currentChat: number;

  private preverencesSubscription;

  constructor(public afService: AF) {
    this.preverencesSubscription = this.afService.preferencesChange.subscribe((snapshot) => {
      if (snapshot.currentChat) {
        this.currentChat = snapshot.currentChat;
        this.messages = this.afService.getMessages();
      }
    });
  }

  ngOnDestroy() {
    this.preverencesSubscription.unsubscribe();
  }

  sendMessage() {
    if (this.currentChat) {
      this.afService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }

  isYou(displayName) {
    return displayName === this.afService.displayName;
  }
}
