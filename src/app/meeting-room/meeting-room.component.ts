import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meeting } from '../models/meeting.model';
import { MeetingRoomService } from '../services/meeting-room.service';

@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.css']
})
export class MeetingRoomComponent implements OnInit {
  meetingForm: FormGroup;
  rooms: string[] = ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5'];

  constructor(
    private fb: FormBuilder,
    private meetingService: MeetingRoomService
  ) { }

  ngOnInit(): void {
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
      const newMeeting: Meeting = {
        ...this.meetingForm.value,
        id: Date.now(),
        status: 'Booked'
      };
      this.meetingService.addMeeting(newMeeting);
      alert('Meeting booked successfully!');
      this.meetingForm.reset();
    }
  }
}
