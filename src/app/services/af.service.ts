import { Injectable } from "@angular/core";
import { Utils } from "./utils.service";
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseObjectFactoryOpts } from "angularfire2/interfaces";
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AF {
  public messages: FirebaseListObservable<any>;
  public users: any = {};
  public usersChange = new Subject<any>();
  public chats: any[] = [];
  public chatsChange = new Subject<any>();
  public preferencesChange = new Subject<any>();
  public preferences: any = {};
  public displayName: string;
  public user: any;
  public memberships: FirebaseListObservable<any>;

  private userSubscription;
  private userPreferencesSubscription;
  private usersSubscription;
  private chatsSubscription;

  constructor(public af: AngularFire, public utils: Utils) {
    this.af.auth.subscribe(
      (auth) => {
        if (auth != null) {
          this.userSubscription = this.subscribeUser(auth.uid);
          this.userPreferencesSubscription = this.subscribeUserPreferences(auth.uid)
          this.usersSubscription = this.subscribeUsers().subscribe(() => {
            if (this.chatsSubscription) {
              this.chatsSubscription.unsubscribe();
            }
            this.chatsSubscription = this.subscribeChats(auth.uid);
          });
        }
      });
  }

  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  checkUserData(userID) {
    return this.af.database.object('users/' + userID, {preserveSnapshot: true})
      .take(1);
  }

  logout() {
    this.userSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
    this.chatsSubscription.unsubscribe();
    this.userPreferencesSubscription.unsubscribe();
    return this.af.auth.logout();
  }

  registerUser(email, password) {
    return this.af.auth.createUser({
      email: email,
      password: password
    });
  }

  saveUserInfo(uid, title, name, lastname, company) {
    return this.af.database.object('users/' + uid).update({
      title: title,
      name: name,
      lastname: lastname,
      company: company,
    }).then(() => {
      this.af.database.object('preferences/' + uid).update({
        width: 200,
        currentChat: ''
      })
    });
  }

  loginWithEmail(email, password) {
    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  createChat(userId) {
    let chatId: any;
    this.chats.forEach(chat => {
      if (chat.companion.key === userId) {
        chatId = chat.key;
      }
    });
    if (chatId) {
      this.savePreferences({
        currentChat: chatId
      });
    } else {
      this.af.database.list('chats').push({
        [userId]: true,
        [this.user.$key]: true,
        lastMessage: '',
        lastFrom: this.user.$key,
        timestamp: Date.now()
      }).then(s => this.savePreferences({
        currentChat: s.getKey()
      }));
    }
  }
  getMessages() {
    return this.af.database.list('messages/' + this.preferences.currentChat);
  }

  sendMessage(text) {
    var message = {
      message: text,
      displayName: this.displayName,
      timestamp: Date.now()
    };
    this.af.database.object('chats/' + this.preferences.currentChat).update({
      lastMessage: text,
      lastFrom: this.user.$key,
      timestamp: Date.now()
    });
    return this.af.database.list('messages/' + this.preferences.currentChat).push(message);
  }

  savePreferences(preferences) {
    return this.af.database.object('preferences/' + this.user.$key).update(preferences);
  }

  private subscribeUser(userId) {
    return this.af.database.object('users/' + userId)
      .subscribe(snapshot => {
        this.user = snapshot;
        this.displayName = this.utils.getDisplayName(snapshot);
      });
  }

  private subscribeUserPreferences(userId) {
    return this.af.database.object('preferences/' + userId, {preserveSnapshot: true})
      .subscribe(snapshot => {
        this.preferences = snapshot.val();
        this.preferencesChange.next(this.preferences);
      });
  }

  private subscribeUsers() {
    return this.af.database.list('users', {preserveSnapshot: true})
      .map(snapshots => {
        snapshots.forEach(user => {
          this.users[user.getKey()] = {
            user: user.val(),
            displayName: this.utils.getDisplayName(user.val()),
            id: user.getKey()
          }
        });
        this.usersChange.next(this.users);
        return snapshots;
      });
  }

  private subscribeChats(userId) {
    return this.af.database.list('chats', {
      query: {
        orderByChild: userId,
        equalTo: true
      },
      preserveSnapshot: true
    }).subscribe(snapshots => {
      this.chats = [];
      snapshots.forEach(chat => {
        this.chats.push({
          companion: this.getCompanion(chat.val()),
          key: chat.getKey(),
          lastMessage: chat.val().lastMessage,
          timestamp: chat.val().timestamp,
          lastFrom: chat.val().lastFrom
        })
      });
      this.chatsChange.next(this.chats);
    });
  }

  private getCompanion(chat) {
    let res: any = {};
    Object.keys(chat).forEach(key => {
      if (key !== this.user.$key && key !== 'lastMessage' && key !== 'lastFrom' && key !== 'timestamp') {
        res = this.users[key].user;
        res.key = key;
      }
    });
    return res;
  }

}
