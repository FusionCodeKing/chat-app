import {Component} from '@angular/core';
import {AF} from '../../services/af.service';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
  public chats: any[];
  public currentChat: any;
  public itemsPerPage: number = 30;

  private chatsSubscription;
  private currentChatSubscription;

  constructor(public afService: AF) {
    this.chatsSubscription = this.afService.chatsChange.subscribe(snapshots => {
      this.chats = snapshots;
    });
    this.currentChatSubscription = this.afService.currentChat.subscribe((snapshot) => {
      this.currentChat = snapshot;
    });
  }

  ngOnDestroy() {
    this.chatsSubscription.unsubscribe();
    this.currentChatSubscription.unsubscribe();
  }

  clickOnChat(chatId) {
    this.afService.selectChat(chatId);
  }

  isIncoming(userId) {
    return userId !== this.afService.user.$key;
  }
}
