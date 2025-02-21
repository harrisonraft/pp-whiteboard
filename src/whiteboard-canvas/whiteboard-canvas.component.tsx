import React, { useEffect, useRef } from "react"

export const WhiteboardCanvas = ({width, height}: { width: number, height: number }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = (canvasRef.current as HTMLCanvasElement).getContext("2d");

        // what do we need to do here?
    }, [])

    return <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={() => {}}
        onMouseMove={() => {}}
        onMouseUp={() => {}}
    />
}
