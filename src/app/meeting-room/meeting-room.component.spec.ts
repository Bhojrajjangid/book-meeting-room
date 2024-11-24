/*
24th Nov, 2024
TOTAL: 5 SUCCESS

=============================== Coverage summary ===============================
Statements   : 86.49%
Branches     : 75%
Functions    : 100%
Lines        : 86.11%
================================================================================
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeetingRoomComponent } from './meeting-room.component';
import { FormBuilder } from '@angular/forms';
import { MeetingRoomService } from '../services/meeting-room.service';
import { Router } from '@angular/router';
import { Meeting } from '../models/meeting.model';

describe('MeetingRoomComponent', () => {
  let component: MeetingRoomComponent;
  let fixture: ComponentFixture<MeetingRoomComponent>;
  let meetingService: jasmine.SpyObj<MeetingRoomService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const meetingServiceSpy = jasmine.createSpyObj('MeetingRoomService', ['getRoomStatus', 'addMeeting']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [MeetingRoomComponent],
      providers: [
        FormBuilder,
        { provide: MeetingRoomService, useValue: meetingServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetingRoomComponent);
    component = fixture.componentInstance;
    meetingService = TestBed.inject(MeetingRoomService) as jasmine.SpyObj<MeetingRoomService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login if not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not redirect if already logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should show an error if there is a conflict in booking', () => {
    const mockConflictingMeeting: Meeting = {
      id: 1,
      username: 'Sachin Tendulkar',
      room: 'Room 1',
      date: '2024-11-22',
      timeFrom: '09:00',
      timeTo: '11:00',
      agenda: 'Project Meeting',
      status: 'Booked'
    };
    meetingService.getRoomStatus.and.returnValue([mockConflictingMeeting]);
    component.meetingForm.setValue({
      username: 'John Doe',
      room: 'Room 1',
      date: '2024-11-22',
      timeFrom: '10:00',
      timeTo: '12:00',
      agenda: 'Team Sync'
    });
    spyOn(window, 'alert');
    component.bookMeeting();
    expect(component.errorMessage).toBe('The room is already Booked during the selected time. Please select another time.');  // Check if error message is set
    expect(window.alert).toHaveBeenCalledWith(component.errorMessage);
  });

  it('should convert time to minutes correctly', () => {
    const time = '10:30';
    const minutes = component.convertToMinutes(time);
    expect(minutes).toBe(630);
  });

});