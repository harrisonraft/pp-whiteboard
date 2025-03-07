/**
 * Should handle:
 * - receiving events from the canvas
 * - drawing to the canvas while events are ongoing
 * - determining when 'event' ends and should be processed (mousedown -> mouseup for scribble)
 * - sending an element or 'update' out (eventually has to reach the store, I would personally just build out the elements instead of the raw data)
 */

export class CanvasUiController {
    constructor(private ctx: CanvasRenderingContext2D) {
        // TODO implement
    }
}
