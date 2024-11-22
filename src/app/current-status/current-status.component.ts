import { Component, OnInit } from '@angular/core';
import { MeetingRoomService } from '../services/meeting-room.service';
import { Meeting } from '../models/meeting.model';

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.css']
})
export class CurrentStatusComponent implements OnInit {
  rooms: string[] = ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5'];
  selectedDate: string = '2024-11-22';

  constructor(private meetingService: MeetingRoomService) { }

  ngOnInit(): void { }

  getRoomStatus(room: string): Meeting[] {
    return this.meetingService.getRoomStatus(this.selectedDate, room);
  }
}
