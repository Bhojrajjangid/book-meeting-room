import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeetingRoomService } from '../services/meeting-room.service';
import { Meeting } from '../models/meeting.model';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.css']
})
export class MeetingRoomComponent implements OnInit {
  meetingForm: FormGroup;
  rooms: string[] = ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5'];
  isLoggedIn = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingRoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
    } else {
      this.isLoggedIn = true;
    }
    this.meetingForm = this.fb.group({
      username: ['', Validators.required],
      room: ['', Validators.required],
      date: ['', Validators.required],
      timeFrom: ['', Validators.required],
      timeTo: ['', Validators.required],
      agenda: ['', Validators.required]
    });
  }

  get username() {
    return this.meetingForm.get('username');
  }

  get room() {
    return this.meetingForm.get('room');
  }

  get date() {
    return this.meetingForm.get('date');
  }

  get timeFrom() {
    return this.meetingForm.get('timeFrom');
  }

  get timeTo() {
    return this.meetingForm.get('timeTo');
  }

  get agenda() {
    return this.meetingForm.get('agenda');
  }

  bookMeeting(): void {
    if (this.meetingForm.valid) {
      const { room, date, timeFrom, timeTo } = this.meetingForm.value;

      const conflictingMeeting = this.meetingService.getRoomStatus(date, room).find(meeting => {
        const meetingStart = this.convertToMinutes(meeting.timeFrom);
        const meetingEnd = this.convertToMinutes(meeting.timeTo);
        const requestedStart = this.convertToMinutes(timeFrom);
        const requestedEnd = this.convertToMinutes(timeTo);

        return (
          (requestedStart < meetingEnd && requestedEnd > meetingStart) 
        );
      });

      if (conflictingMeeting) {
        this.errorMessage = `The room is already ${conflictingMeeting.status} during the selected time. Please select another time.`;
        alert(this.errorMessage);
        return;
      }

      const newMeeting: Meeting = {
        ...this.meetingForm.value,
        id: Date.now(),
        status: 'Booked'
      };
      this.meetingService.addMeeting(newMeeting);
      alert('Meeting booked successfully!');
      this.meetingForm.reset();
      this.errorMessage = null;
    }
  }

  convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
