import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';
import { CommentsComponent } from './components/comments/comments.component';
import { RateVideoComponent } from './components/rate-video/rate-video.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginFormComponent,
    HomeComponent,
    LogoutComponent,
    UploadVideoComponent,
    WatchVideoComponent,
    CommentsComponent,
    RateVideoComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
