import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingRoomComponent } from './meeting-room/meeting-room.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';
import { CurrentStatusComponent } from './current-status/current-status.component';

const routes: Routes = [
  { path: '', redirectTo: '/book-room', pathMatch: 'full' },
  { path: 'book-room', component: MeetingRoomComponent },
  { path: 'view-meetings', component: ViewMeetingsComponent },
  { path: 'room-status', component: CurrentStatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
