import { Observable, Subject } from "rxjs";
import { RenderingInstruction } from "./types/RenderingInstruction.type";
import { WhiteboardElement } from "../types/WhiteboardElement.type";

/**
 * - Subscribes to store changes
 * - When element changes come in, be they delete, update or add, maps them to a rendering instruction,
 *   which is just a function that takes in canvas context and updates the canvas based on element
 */

class ElementInstructor {
    public renderingInstruction$: Observable<RenderingInstruction>;
    private _renderingInstructionSubject: Subject<RenderingInstruction>;

    constructor() {
        this._renderingInstructionSubject = new Subject<RenderingInstruction>();
        this.renderingInstruction$ = this._renderingInstructionSubject.asObservable();
    }

    // eg:
    private _renderScribble(ctx: CanvasRenderingContext2D, element: WhiteboardElement) {
        /**
         * You'll need these probably...
         *
         * ctx.strokeStyle = ""; // color
         * ctx.lineWidth = ?; // size
         * ctx.beginPath();
         * ctx.moveTo();
         * ctx.lineTo();
         * ctx.stroke();
         */
    }
}

export const elementInstructor = new ElementInstructor();
