import {Observable, Subject} from "rxjs";
import {eventsService} from "../events-service/events-service";
import {WhiteboardElement} from "../types/WhiteboardElement.type";

type StoreMessage = {
    type: "add" | "remove" | "update";
    element: WhiteboardElement;
}

class BigFatMemeStore {
    /**
     * - Holds FE model in its entirety
     * - Subscribes to 'events' stream
     * - Understand how to partially update based on event data
     * - exposes stream that provides element level updates (eg: element id 1 deleted, element id 2 created)
     */
    public changes$: Observable<StoreMessage>;

    private model: Array<WhiteboardElement> = [];
    private changesSubject: Subject<StoreMessage>

    constructor() {
        this.changesSubject = new Subject<StoreMessage>();
        this.changes$ = this.changesSubject.asObservable();

        const storeSub = eventsService.events$.subscribe((value) => {
            // if is type initialise, then this is fine

            // if other server type like "update" or something, then we will do partial checking blah blah blah
            this.model = value;

            for (const element of value) {
                this.changesSubject.next({
                    type: "add",
                    element: element
                });
            }
        });
    }
}

export const bigFatMemeStore = new BigFatMemeStore();
