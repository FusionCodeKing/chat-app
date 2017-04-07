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

  private currentChatSubscription;

  constructor(public afService: AF) {
    this.currentChatSubscription = this.afService.currentChat.subscribe(() => {
      this.messages = this.afService.getMessages();
    });
  }

  ngOnDestroy(){
    this.currentChatSubscription.unsubscribe();
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
    this.afService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  isYou(displayName) {
    return displayName === this.afService.displayName;
  }
}
