interface IEventsService {
    // ??
}

/**
 * - subscribes to ConnectionService, receives raw messages
 * - maps raw messages and exposes 'events' stream (specific type, whereas ConnectionService is just raw string)
 */

class EventsService {
    // implement
}

export const eventsService = new EventsService();
