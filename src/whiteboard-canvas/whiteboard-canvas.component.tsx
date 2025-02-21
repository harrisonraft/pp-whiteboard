import React, { useEffect, useRef } from "react"
import { elementInstructor } from "../element-instructor/element-instructor";

export const WhiteboardCanvas = ({width, height}: { width: number, height: number }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");

        elementInstructor.renderingInstruction$.subscribe((instruction) => {
            if (ctx !== null) {
                instruction(ctx);
            }
        })
        // what do we need to do here?
    }, [])

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                onMouseDown={() => {}}
                onMouseMove={() => {}}
                onMouseUp={() => {}}/>
        </div>
    )
}
