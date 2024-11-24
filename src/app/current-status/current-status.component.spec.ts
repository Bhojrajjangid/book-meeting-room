/*
24th Nov, 2024
TOTAL: 4 SUCCESS

=============================== Coverage summary ===============================
Statements   : 100%
Branches     : 100%
Functions    : 100%
Lines        : 100%
================================================================================
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentStatusComponent } from './current-status.component';
import { MeetingRoomService } from '../services/meeting-room.service';
import { Meeting } from '../models/meeting.model';

describe('CurrentStatusComponent', () => {
    let component: CurrentStatusComponent;
    let fixture: ComponentFixture<CurrentStatusComponent>;
    let meetingService: jasmine.SpyObj<MeetingRoomService>;

    beforeEach(async () => {
        const meetingServiceSpy = jasmine.createSpyObj('MeetingRoomService', ['getRoomStatus']);
        await TestBed.configureTestingModule({
            declarations: [CurrentStatusComponent],
            providers: [
                { provide: MeetingRoomService, useValue: meetingServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CurrentStatusComponent);
        component = fixture.componentInstance;
        meetingService = TestBed.inject(MeetingRoomService) as jasmine.SpyObj<MeetingRoomService>;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call getRoomStatus with the correct date and room', () => {
        const mockMeetings: Meeting[] = [
            {
                id: 1,
                username: 'John Doe',
                room: 'Room 1',
                date: '2024-11-22',
                timeFrom: '09:00',
                timeTo: '10:00',
                agenda: 'Project Meeting',
                status: 'Booked'
            }
        ];

        meetingService.getRoomStatus.and.returnValue(mockMeetings);
        const roomStatus = component.getRoomStatus('Room 1');
        expect(meetingService.getRoomStatus).toHaveBeenCalledWith('2024-11-22', 'Room 1');
        expect(roomStatus).toEqual(mockMeetings);
    });

    it('should return an empty array if no meetings are found', () => {
        meetingService.getRoomStatus.and.returnValue([]);
        const roomStatus = component.getRoomStatus('Room 1');
        expect(meetingService.getRoomStatus).toHaveBeenCalledWith('2024-11-22', 'Room 1');
        expect(roomStatus).toEqual([]);
    });

    it('should use default selectedDate if no other date is selected', () => {
        expect(component.selectedDate).toBe('2024-11-22');
    });

});