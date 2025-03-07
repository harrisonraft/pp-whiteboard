import { Observable, Subject } from "rxjs";
import { RenderingInstruction } from "./types/RenderingInstruction.type";
import { ScribbleElement, WhiteboardElement } from "../types/WhiteboardElement.type";
import { bigFatMemeStore } from "../big-fat-meme-store/big-fat-meme-store";

/**
 * - Subscribes to store changes
 * - When element changes come in, be they delete, update or add, maps them to a rendering instruction,
 *   which is just a function that takes in canvas context and updates the canvas based on element
 */


type StoreMessage = {
    type: "add" | "remove" | "update";
    element: WhiteboardElement;
}

class ElementInstructor {
    public renderingInstruction$: Observable<RenderingInstruction>;
    private _renderingInstructionSubject: Subject<RenderingInstruction>;

    constructor() {
        this._renderingInstructionSubject = new Subject<RenderingInstruction>();
        this.renderingInstruction$ = this._renderingInstructionSubject.asObservable();

        bigFatMemeStore.changes$.subscribe((change) => {
            const element: ScribbleElement = change.element as ScribbleElement;
            const renderingFunction = (ctx: CanvasRenderingContext2D) => {
                this._renderScribble(ctx, element as ScribbleElement);
            }

            this._renderingInstructionSubject.next(renderingFunction);
        });
    }

    private _renderScribble(ctx: CanvasRenderingContext2D, el: ScribbleElement) {
        ctx.beginPath()
        ctx.strokeStyle = el.color;
        ctx.moveTo(el.x + el.points[0].x, el.y + el.points[0].y);

        for (let i = 1; i < el.points.length; i++) {
            const point = el.points[i];
            ctx.lineTo(el.x + point.x, el.y + point.y);
        }

        ctx.stroke();
    }
}

export const elementInstructor = new ElementInstructor();
