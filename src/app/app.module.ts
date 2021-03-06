import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes} from '@angular/router';
import { AF } from './services/af.service';
import { HomePageComponent } from './home-page/home-page.component';
import { CompletePageComponent } from './complete-page/complete-page.component';
import { FormsModule } from '@angular/forms';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { UserListComponent } from './home-page/user-list/user-list.component';
import { ChatListComponent } from './home-page/chat-list/chat-list.component';
import { ChatComponent } from './home-page/chat/chat.component';
import { SearchUserPipe } from './home-page/user-list/search-user.pipe';
import { OrderByPipe } from './home-page/chat-list/order-by.pipe';
import { Utils } from './services/utils.service';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AuthGuard } from './services/auth-guard.service';
import { NotAuthGuard } from './services/not-auth-guard.service';
import { ResizeDirective } from './directives/resize.directive';
import { environment } from '../environments/environment';
import {Angular2AutoScroll} from "angular2-auto-scroll/lib/angular2-auto-scroll.directive";

const routes:Routes = [
  {path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginPageComponent, canActivate: [NotAuthGuard] },
  {path: 'register', component: RegistrationPageComponent, canActivate: [NotAuthGuard] },
  {path: 'complete', component: CompletePageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes),
    FormsModule,
    Ng2PaginationModule
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    RegistrationPageComponent,
    CompletePageComponent,
    UserListComponent,
    ChatListComponent,
    ChatComponent,
    SearchUserPipe,
    OrderByPipe,
    ResizeDirective,
    Angular2AutoScroll
  ],
  bootstrap: [AppComponent],
  providers: [AF, Utils, AuthGuard, NotAuthGuard]
})
export class AppModule {
}
