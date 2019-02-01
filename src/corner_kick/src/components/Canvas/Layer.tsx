import * as React from 'react';

import { ILayer } from 'SRC/types';

import { Arc } from './shapes/Arc';
import { Ellipse } from './shapes/Ellipse';
import { Line } from './shapes/Line';
import { Polygon } from './shapes/Polygon';
import { Rect } from './shapes/Rect';

interface ILayerProps {
    layer: ILayer;
}

export const Layer = (props: ILayerProps) => {
    if (!props.layer.visible) {
        return null;
    }

    const shapesElements = props.layer.shapes.map((shape, index) => {
        switch (shape.type) {
            case 'rect':
                return <Rect key={`${props.layer.name}${index}`} shape={shape} />;
            case 'arc':
                return <Arc key={`${props.layer.name}${index}`} shape={shape} />;
            case 'ellipse':
                return <Ellipse key={`${props.layer.name}${index}`} shape={shape} />;
            case 'poly':
                return <Polygon key={`${props.layer.name}${index}`} shape={shape} />;
            case 'line':
                return <Line key={`${props.layer.name}${index}`} shape={shape} />;
            default:
                return null;
        }
    });

    return <>{shapesElements}</>;
};
