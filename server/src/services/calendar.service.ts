import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

let oauth2Client: OAuth2Client | null = null;

function getOAuth2Client(): OAuth2Client {
  if (!oauth2Client) {
    oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }
  return oauth2Client;
}

export function getAuthUrl(): string {
  const client = getOAuth2Client();
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
    prompt: 'consent',
  });
}

export async function setTokensFromCode(code: string): Promise<void> {
  const client = getOAuth2Client();
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);
}

export function setCredentials(tokens: Record<string, unknown>): void {
  getOAuth2Client().setCredentials(tokens);
}

export async function createCalendarEvent(data: {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  attendeeEmail: string;
  attendeeName: string;
}): Promise<string | null> {
  try {
    const auth = getOAuth2Client();
    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      sendUpdates: 'all',
      requestBody: {
        summary: data.summary,
        description: data.description,
        start: { dateTime: data.startDateTime, timeZone: 'Europe/London' },
        end: { dateTime: data.endDateTime, timeZone: 'Europe/London' },
        attendees: [{ email: data.attendeeEmail, displayName: data.attendeeName }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 60 },
          ],
        },
      },
    });

    return response.data.id ?? null;
  } catch (error) {
    console.error('[CalendarService] Failed to create event:', error);
    return null;
  }
}

export async function deleteCalendarEvent(eventId: string): Promise<boolean> {
  try {
    const auth = getOAuth2Client();
    const calendar = google.calendar({ version: 'v3', auth });
    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId,
    });
    return true;
  } catch (error) {
    console.error('[CalendarService] Failed to delete event:', error);
    return false;
  }
}

export async function updateCalendarEvent(
  eventId: string,
  data: {
    summary?: string;
    description?: string;
    startDateTime?: string;
    endDateTime?: string;
  }
): Promise<boolean> {
  try {
    const auth = getOAuth2Client();
    const calendar = google.calendar({ version: 'v3', auth });

    const patch: Record<string, unknown> = {};
    if (data.summary) patch.summary = data.summary;
    if (data.description) patch.description = data.description;
    if (data.startDateTime) patch.start = { dateTime: data.startDateTime, timeZone: 'Europe/London' };
    if (data.endDateTime) patch.end = { dateTime: data.endDateTime, timeZone: 'Europe/London' };

    await calendar.events.patch({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      eventId,
      requestBody: patch,
    });
    return true;
  } catch (error) {
    console.error('[CalendarService] Failed to update event:', error);
    return false;
  }
}
