import { BehaviorSubject, Observable } from "rxjs";
import { ScribbleElement, WHITEBOARD_ELEMENT_TYPES } from "../types/WhiteboardElement.type";

// IN PLACE OF EXISTING SERVER (next week)

const element: ScribbleElement = {
    id: 'scribble-1',
    type: WHITEBOARD_ELEMENT_TYPES.Scribble,
    color: '#fff',
    x: 100,
    y: 200,
    points: [
        { x: 0, y: 0 },
        { x: 50, y: 50 },
        { x: 100, y: 0 },
        { x: 150, y: 50 }
    ]
};

const message = {
    type: "initialise",
    elements: [element]
}

class ConnectionService {
    public serverEvents$: Observable<string>;
    private _serverEventsSubject: BehaviorSubject<string>;

    constructor() {
        this._serverEventsSubject = new BehaviorSubject<string>(JSON.stringify(message));
        this.serverEvents$ = this._serverEventsSubject.asObservable();
    }
}

export const connectionService = new ConnectionService();
