/*
 * This file describes the datatypes used for the visualizer
 */

export interface ILayer {
    layer_name: string;
    shapes: IShape[];
}

export interface ISpritesheet {
    frames: { [key: string]: IFrame };
    sourceSize: {
        h: number;
        w: number;
    };
}

export interface IFrame {
    frame: { x: number; y: number; w: number; h: number };
    sourceSize: { w: number; h: number };
    shapes: IShape[];
}

export interface IShape {
    /**
     * Specifies the type of shape to display
     */
    type: string;

    /**
     * The data associated with the shape
     */
    data: number[];

    /**
     * The fill color of the shape
     */
    fill?: string;

    /**
     * The stroke of the shape
     */
    stroke?: string;

    /**
     * The stroke weight of the shape
     */
    stroke_weight?: number;
}
