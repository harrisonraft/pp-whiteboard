import { connectionService } from "../connection-service/connection-service";
import { Observable, map, Subject } from "rxjs";
import { WhiteboardElement } from "../types/WhiteboardElement.type";

interface IEventsService {
    // ??
}

/**
 * - subscribes to ConnectionService, receives raw messages
 * - maps raw messages and exposes 'events' stream (specific type, whereas ConnectionService is just raw string)
 */

type ServerMessage = {
    type: string,
    elements: Array<WhiteboardElement>
}

class EventsService {
    public events$: Observable<Array<WhiteboardElement>>;

    private eventsSubject: Subject<Array<WhiteboardElement>>

    constructor() {
        this.eventsSubject = new Subject();
        this.events$ = this.eventsSubject.asObservable();

        const connectionSub = connectionService.serverEvents$.subscribe((message: string) => {
            const parsedMessage = JSON.parse(message);

            if (this.isServerMessage(parsedMessage)) {
                this.eventsSubject.next(parsedMessage.elements);
            } else {
                //Throw
            }
        })
    }

    private isServerMessage(message: Record<string, any>): message is ServerMessage {
        if (message.type !== undefined && message.elements !== undefined) {
            return true;
        }

        return false;
    }
}

export const eventsService = new EventsService();

