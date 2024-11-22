import { Component, OnInit } from '@angular/core';
import { MeetingRoomService } from '../services/meeting-room.service';
import { Meeting } from '../models/meeting.model';

@Component({
  selector: 'app-view-meetings',
  templateUrl: './view-meetings.component.html',
  styleUrls: ['./view-meetings.component.css']
})
export class ViewMeetingsComponent implements OnInit {
  meetings: Meeting[] = [];
  selectedRoom: string = 'Room 1'; 

  constructor(private meetingService: MeetingRoomService) { }

  ngOnInit(): void {
    this.loadMeetings();
  }

  loadMeetings(): void {
    this.meetings = this.meetingService.getMeetingsForRoom(this.selectedRoom);
  }

  onRoomChange(newRoom: string): void {
    this.selectedRoom = newRoom;
    this.loadMeetings();
  }
}
