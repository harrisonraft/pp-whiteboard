export type WhiteboardElement = (
    | ScribbleElement
    | ShapeElement
    | TextElement
)

export type BaseWhiteboardElement = {
    id: string;
    color: string; // hex
    type: WHITEBOARD_ELEMENT_TYPES;
    x: number;
    y: number;
}

export enum WHITEBOARD_ELEMENT_TYPES {
    Scribble,
    Shape,
    Text
}

export type ScribbleElement = BaseWhiteboardElement & {
    type: WHITEBOARD_ELEMENT_TYPES.Scribble;
    points: Array<{ x: number; y: number; }>; // this instead of blob
}

export type TextElement = BaseWhiteboardElement & {
    type: WHITEBOARD_ELEMENT_TYPES.Text;
    value: string;
}

export type ShapeElement = BaseWhiteboardElement & {
    type: WHITEBOARD_ELEMENT_TYPES.Shape;
    shapeType: SHAPES;
    width: number;
    height: number;
}

export enum SHAPES {
    Square,
    Circle,
    Star
}
