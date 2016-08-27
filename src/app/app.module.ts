import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { I18nService, I18nPipe } from './common/services/I18nService';
import {WebSocketService} from './common/services/websocket.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApiService } from './shared';
import { routing } from './app.routing';

import { UserList } from './users/components/user-list';
import { UserEdit } from './users/components/user-edit';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    UserList,
    UserEdit
  ],
  providers: [
    I18nService,
    WebSocketService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
