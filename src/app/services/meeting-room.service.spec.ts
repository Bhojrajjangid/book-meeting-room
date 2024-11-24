/*
24th Nov, 2024
TOTAL: 5 SUCCESS

=============================== Coverage summary ===============================
Statements   : 100%
Branches     : 100%
Functions    : 100%
Lines        : 100%
================================================================================
*/
import { TestBed } from '@angular/core/testing';
import { MeetingRoomService } from './meeting-room.service';
import { Meeting } from '../models/meeting.model';

describe('MeetingRoomService', () => {
  let service: MeetingRoomService;
  const expectedMeetings: Meeting[] = [
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
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return meetings for a specific room', () => {
    const room = 'Room 1';
    const meetings = service.getMeetingsForRoom(room);
    expect(meetings).toEqual(expectedMeetings);
  });

  it('should return meetings for a specific room and date', () => {
    const room = 'Room 1';
    const date = '2024-11-22';
    const meetings = service.getRoomStatus(date, room);
    expect(meetings).toEqual(expectedMeetings);
  });

  it('should add a new meeting and update the meetings list', () => {
    const newMeeting: Meeting = {
      id: 4,
      username: 'Roger Federer',
      room: 'Room 3',
      date: '2024-11-23',
      timeFrom: '09:00',
      timeTo: '10:30',
      agenda: 'Strategy Meeting',
      status: 'Booked'
    };

    service.addMeeting(newMeeting);
    const meetings = service.getMeetings();
    expect(meetings.length).toBe(4);
    expect(meetings[3]).toEqual(newMeeting);
  });

  it('should return all meetings', () => {
    const meetings = service.getMeetings();
    expect(meetings.length).toBe(3);
  });

});