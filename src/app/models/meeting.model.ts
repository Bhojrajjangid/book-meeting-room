export interface Meeting {
    id: number;
    username: string;
    room: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    agenda: string;
    status: 'Available' | 'In-Use' | 'Booked';
}