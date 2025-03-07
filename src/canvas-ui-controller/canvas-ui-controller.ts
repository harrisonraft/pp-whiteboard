/**
 * Should handle:
 * - receiving events from the canvas
 * - drawing to the canvas while events are ongoing
 * - determining when 'event' ends and should be processed (mousedown -> mouseup for scribble)
 * - sending an element or 'update' out (eventually has to reach the store, I would personally just build out the elements instead of the raw data)
 * - ╰( ͡° ͜ʖ ͡° )つ──☆*:・ﾟ
 */
import { RefObject, MouseEvent } from "react";
import { ScribbleElement, WHITEBOARD_ELEMENT_TYPES } from "../types/WhiteboardElement.type";
import { bigFatMemeStore } from "../big-fat-meme-store/big-fat-meme-store"

// 🍪🍪🍪🍪🍪🍪
export class CanvasUiController {
    private canvasRef: RefObject<HTMLCanvasElement>;
    private cachedCanvasPos: { x: number; y: number; } | null = null;
    private cachedCanvasCtx: CanvasRenderingContext2D | null = null;
    private isDrawing: boolean = false; //🚩
    private currentDrawing: Array<{x:number, y:number}> = [];

    constructor(canvasRef: RefObject<HTMLCanvasElement>) {
        // TODO implement
        this.canvasRef = canvasRef; // 🍪
    }

    /**
     *     {
     *         id: 'scribble-1',
     *         type: WHITEBOARD_ELEMENT_TYPES.Scribble,
     *         color: '#fff',
     *         x: 100,
     *         y: 200,
     *         points: [
     *             { x: 0, y: 0 },
     *             { x: 50, y: 50 },
     *             { x: 100, y: 0 },
     *             { x: 150, y: 50 }
     *         ]
     *     }
     */

    public onMouseUp(event: MouseEvent): void {
        // Save the scribble and shoot it over somewhere
        if (!this.isDrawing) {
            return;
        }
        this.isDrawing = false;

        // 🦭
        const id = Math.ceil((Math.random() + Math.random() + Math.random() * Math.random() * Math.random() * Math.random()) * 100);

        //const ctx = this.getCanvasCtx();
        const [initialPoint, ...points] = this.currentDrawing;

        // create a scribble element
        const scribble: ScribbleElement = {
            id: id.toString(), //Symbol()?
            type: WHITEBOARD_ELEMENT_TYPES.Scribble,
            color: "#1E90FF",
            x: initialPoint.x,
            y: initialPoint.y,
            points: points
        }

        this.currentDrawing = [];
        bigFatMemeStore.add(scribble);
        this.getCanvasCtx().clearRect(0, 0, 1000, 600); //this.canvasRef.current.width/height
    }

    public onMouseMove(event: MouseEvent): void {
        // Has to start adding to the points array
        if (!this.isDrawing) {
            return;
        }

        const { x, y } = this.getCanvasXY();

        const absXY = { x: event.clientX - x, y: event.clientY - y };
        const { x: initialX, y: initialY } = this.currentDrawing[0];

        const nextPoint = { x: absXY.x - initialX, y: absXY.y - initialY };

        // const lastPoint = this.currentDrawing.at(-1);
        // if (nextPoint.x === lastPoint.x && nextPoint.y === lastPoint.y) {
        //      return;
        // }

        const ctx = this.getCanvasCtx();
        ctx.lineTo(absXY.x, absXY.y);
        ctx.stroke();

        this.currentDrawing.push(nextPoint);
    }

    public onMouseDown(event: MouseEvent): void {
        //🍪
        this.isDrawing = true;

        // encapsulate this elsewhere maybe in a bit who knows

        const { x, y } = this.getCanvasXY();

        const SCRIBBLE_START_X = event.clientX - x;
        const SCRIBBLE_START_Y = event.clientY - y;

        const ctx = this.getCanvasCtx();
        ctx.beginPath()
        ctx.strokeStyle = "#1E90FF"; // dodgerblue, best colour
        ctx.moveTo(SCRIBBLE_START_X, SCRIBBLE_START_Y);

        this.currentDrawing.push({x: SCRIBBLE_START_X, y: SCRIBBLE_START_Y});
        // 🍪 i gave myself a cookie
    }

    private getCanvasXY(): { x: number; y: number } {
        if (this.cachedCanvasPos === null) {
            const { x, y } = this.canvasRef.current.getBoundingClientRect();
            this.cachedCanvasPos = { x, y };
        }

        return this.cachedCanvasPos;
    }

    private getCanvasCtx(): CanvasRenderingContext2D {
        if (this.cachedCanvasCtx === null) {
            this.cachedCanvasCtx = this.canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
        }

        return this.cachedCanvasCtx;
    }
}
