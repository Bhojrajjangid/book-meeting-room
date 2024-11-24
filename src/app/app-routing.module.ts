import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingRoomComponent } from './meeting-room/meeting-room.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';
import { CurrentStatusComponent } from './current-status/current-status.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'book-room', component: MeetingRoomComponent, canActivate: [AuthGuard] },
  { path: 'view-meetings', component: ViewMeetingsComponent, canActivate: [AuthGuard] },
  { path: 'room-status', component: CurrentStatusComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
