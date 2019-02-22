/*
 * This file describes the datatypes used for the visualizer
 */

/**
 * Represents a layer message received from ROS
 */
export interface ILayer {
    /**
     * Name of the layer
     */
    name: string;

    /**
     * Shapes associated with the layer
     */
    sprite: ISprite;

    topic: {
        name: string;
        messageType: string;
    };

    parseInfo: {
        count: number | ((message: any) => number);

        x?: number | ((message: any, index: number) => number);
        y?: number | ((message: any, index: number) => number);
    };
}

export interface ISprite {
    width: number;
    height: number;
    shapes: Array<IRectShape | ICircleShape>;
}

/**
 * Represents a shape in the visualizer
 */
export interface IShape {
    /**
     * Specifies the type of shape to display
     */
    type: string;

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

export interface IRectShape extends IShape {
    type: 'rect';
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ICircleShape extends IShape {
    type: 'circle';
    cx: number;
    cy: number;
    r: number;
}
