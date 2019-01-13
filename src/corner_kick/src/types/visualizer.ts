export interface ILayer extends ILayerMessage {
    topic: string;
    name: string;
    shapes: IShape[];
    visible: boolean;
}

export interface ILayerMessage {
    name: string;
    shapes: IShape[];
}

export interface IShape {
    type: 'rect' | 'circle' | 'line' | 'poly' | 'arc';
    data: number[];
    fill: string;
    stroke: string[];
    strokeWidth: string[];
}
