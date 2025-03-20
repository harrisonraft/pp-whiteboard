import { Subject, Observable } from "rxjs";
import { WhiteboardElement } from "../types/WhiteboardElement.type";

class ConnectionService {
    public serverEvents$: Observable<string>;
    private _websocket: WebSocket | null = null;
    private _serverEventsSubject: Subject<string>;

    constructor() {
        this._serverEventsSubject = new Subject<string>();
        this.serverEvents$ = this._serverEventsSubject.asObservable();
        this._connect();
    }

    private _connect() {
        this._websocket = new WebSocket(process.env.WS_URL || "ws://localhost:8080");
        this._websocket.addEventListener("message", (message) => {
            console.log(message);
            this._serverEventsSubject.next(message.data);
        })
    }

    public addElement(element: WhiteboardElement) {
        if (this._websocket === null) {
            return;
        }

        this._websocket.send(JSON.stringify({ type: "addElement", element }));
    }
}

export const connectionService = new ConnectionService();
