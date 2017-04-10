import {Component, AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { AF } from '../../services/af.service';
import {FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
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

  ngOnDestroy(){
    this.preverencesSubscription.unsubscribe();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
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
