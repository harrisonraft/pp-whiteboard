import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import { WHITEBOARD_ELEMENT_TYPES, WhiteboardElement } from "../src/types/WhiteboardElement.type";

const server = http.createServer();
const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({server});

const serverElements: Array<WhiteboardElement> = [
    {
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
    }
];

const connections: Array<WebSocket> = [];

type ClientMessageAddElement = { type: "addElement", element: WhiteboardElement };
type ClientMessage = (
    | ClientMessageAddElement
)

function isAddElement(data: any): data is ClientMessageAddElement {
    return typeof data === "object" && !Array.isArray(data) && data.type === "addElement" && data.element !== undefined
}

function updateAllConnections() {
    for (const ws of connections) {
        ws.send(JSON.stringify({ type: "update", elements: serverElements}));
    }
}

wss.on('connection', (ws: WebSocket) => {
    console.log("CLIENT CONNECTED");
    connections.push(ws);

    ws.send(JSON.stringify({ type: "initialise", elements: serverElements}));

    ws.on('message', (message) => {
        const data = JSON.parse(message.toString());
        if (isAddElement(data)) {
            serverElements.push(data.element);
            updateAllConnections();
        }
    });

    ws.on("close", () => {
        connections.splice(connections.indexOf(ws), 1);
    });
});

server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});
