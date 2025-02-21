import React from "react";
import "./element-instructor/element-instructor";
import "./big-fat-meme-store/big-fat-meme-store";
import "./events-service/events-service";
import "./connection-service/connection-service";

import { WhiteboardCanvas } from "./whiteboard-canvas/whiteboard-canvas.component";

export const App = () => {
    // this is the main 'smart' component, can connect things here!

    return (
        <WhiteboardCanvas width={1000} height={600} />
    )
}
