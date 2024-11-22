import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meeting } from '../models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomService {
  private meetings: Meeting[] = [];
  private meetingsSubject = new BehaviorSubject<Meeting[]>(this.meetings);

  constructor() {
    this.meetings = [
      {
        id: 1,
        username: 'Sachin Tendulkar',
        room: 'Room 1',
        date: '2024-11-22',
        timeFrom: '09:00',
        timeTo: '11:00',
        agenda: 'Project Meeting',
        status: 'Booked'
      },
      {
        id: 2,
        username: 'Virat Kohli',
        room: 'Room 1',
        date: '2024-11-22',
        timeFrom: '11:30',
        timeTo: '13:00',
        agenda: 'Team Sync',
        status: 'In-Use'
      },
      {
        id: 3,
        username: 'Ravindranath Tagore',
        room: 'Room 2',
        date: '2024-11-22',
        timeFrom: '14:00',
        timeTo: '16:00',
        agenda: 'Client Call',
        status: 'Booked'
      }
    ];
    this.meetingsSubject.next(this.meetings);
  }

  getMeetingsForRoom(room: string): Meeting[] {
    return this.meetings.filter(meeting => meeting.room === room);
  }

  getRoomStatus(date: string, room: string): Meeting[] {
    return this.meetings.filter(
      meeting => meeting.room === room && meeting.date === date
    );
  }

  addMeeting(meeting: Meeting): void {
    this.meetings.push(meeting);
    this.meetingsSubject.next(this.meetings);
  }

  getMeetings(): Meeting[] {
    return this.meetings;
  }
}
