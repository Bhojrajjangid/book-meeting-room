import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMeetingsComponent } from './view-meetings.component';
import { MeetingRoomService } from '../services/meeting-room.service';
import { Meeting } from '../models/meeting.model';

describe('ViewMeetingsComponent', () => {
  let component: ViewMeetingsComponent;
  let fixture: ComponentFixture<ViewMeetingsComponent>;
  let meetingService: jasmine.SpyObj<MeetingRoomService>;

  beforeEach(async () => {
    const meetingServiceSpy = jasmine.createSpyObj('MeetingRoomService', ['getMeetingsForRoom']);
    await TestBed.configureTestingModule({
      declarations: [ViewMeetingsComponent],
      providers: [
        { provide: MeetingRoomService, useValue: meetingServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMeetingsComponent);
    component = fixture.componentInstance;
    meetingService = TestBed.inject(MeetingRoomService) as jasmine.SpyObj<MeetingRoomService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load meetings on ngOnInit', () => {
    const mockMeetings: Meeting[] = [
      { id: 1, username: 'John Doe', room: 'Room 1', date: '2024-11-22', timeFrom: '09:00', timeTo: '10:00', agenda: 'Project Discussion', status: 'Booked' },
      { id: 2, username: 'Jane Smith', room: 'Room 1', date: '2024-11-22', timeFrom: '10:30', timeTo: '11:30', agenda: 'Team Sync', status: 'In-Use' }
    ];
    meetingService.getMeetingsForRoom.and.returnValue(mockMeetings);
    component.ngOnInit();
    expect(meetingService.getMeetingsForRoom).toHaveBeenCalledWith('Room 1');
    expect(component.meetings).toEqual(mockMeetings);
  });

  it('should load meetings when the room changes', () => {
    const mockMeetingsForRoom1: Meeting[] = [{ id: 1, username: 'John Doe', room: 'Room 1', date: '2024-11-22', timeFrom: '09:00', timeTo: '10:00', agenda: 'Project Discussion', status: 'Booked' }];
    const mockMeetingsForRoom2: Meeting[] = [{ id: 2, username: 'Jane Smith', room: 'Room 2', date: '2024-11-22', timeFrom: '10:30', timeTo: '11:30', agenda: 'Team Sync', status: 'In-Use' }];
    meetingService.getMeetingsForRoom.and.callFake((room: string) => {
      return room === 'Room 1' ? mockMeetingsForRoom1 : mockMeetingsForRoom2;
    });
    component.onRoomChange('Room 2');
    expect(meetingService.getMeetingsForRoom).toHaveBeenCalledWith('Room 2');
    expect(component.meetings).toEqual(mockMeetingsForRoom2);
  });

});