import React, { RefObject, useEffect, useRef } from "react"
import { elementInstructor } from "../element-instructor/element-instructor";
import { CanvasUiController } from "../canvas-ui-controller/canvas-ui-controller";

export const WhiteboardCanvas = ({width, height}: { width: number, height: number }) => {
    const persistentCanvas = useRef<HTMLCanvasElement>(null);
    const drawingCanvas = useRef<HTMLCanvasElement>(null);

    // Literally useClassRef implementation
    const controller = useRef<CanvasUiController | null>(null);
    if (controller.current === null) {
        controller.current = new CanvasUiController(drawingCanvas as RefObject<HTMLCanvasElement>);
    }

    useEffect(() => {
        const ctx = (persistentCanvas.current as HTMLCanvasElement).getContext("2d");

        elementInstructor.renderingInstruction$.subscribe((instruction) => {
            if (ctx !== null) {
                instruction(ctx);
            }
        })
        // what do we need to do here?
    }, [])

    // TODO - I think we need two canvas elements, one for drawing, one for persisted state (from API/Store)
    return (
        <div>
            <div>
                <canvas width={width} height={height} ref={persistentCanvas}/>
            </div>
            <div>
                <canvas
                    ref={drawingCanvas}
                    width={width}
                    height={height}
                    onMouseDown={(e) => controller.current!.onMouseDown(e)}
                    onMouseMove={(e) => controller.current!.onMouseMove(e)}
                    onMouseUp={(e) => controller.current!.onMouseUp(e)}
                />
            </div>
        </div>
    )
}
