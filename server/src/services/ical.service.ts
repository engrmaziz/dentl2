import ical, { ICalCalendarMethod } from 'ical-generator';

export function generateIcsBuffer(data: {
  summary: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  organizerName: string;
  organizerEmail: string;
  attendeeEmail: string;
  attendeeName: string;
  location?: string;
}): Buffer {
  const calendar = ical({
    name: 'Smile Dental Clinic',
    method: ICalCalendarMethod.REQUEST,
  });

  calendar.createEvent({
    summary: data.summary,
    description: data.description,
    start: data.startDateTime,
    end: data.endDateTime,
    location: data.location || '100 Harley Street, London W1G 7JA',
    organizer: {
      name: data.organizerName,
      email: data.organizerEmail,
    },
    attendees: [
      {
        name: data.attendeeName,
        email: data.attendeeEmail,
        rsvp: true,
      },
    ],
  });

  return Buffer.from(calendar.toString(), 'utf-8');
}
