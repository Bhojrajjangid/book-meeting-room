import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingRoomComponent } from './meeting-room/meeting-room.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentStatusComponent } from './current-status/current-status.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetingRoomComponent,
    ViewMeetingsComponent,
    CurrentStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
