import * as React from 'react';

import { ILayer } from 'SRC/types';
import styled from 'SRC/utils/styled-components';

import { Rect } from './shapes/Rect';

const Wrapper = styled.svg`
    & * {
        fill: transparent;
        stroke: transparent;
    }
`;

interface ICanvasProps {
    startX?: number;
    startY?: number;
    worldWidth: number;
    worldHeight: number;
    layers: ILayer[];
}

export const Canvas = (props: ICanvasProps) => {
    const { layers, startX, startY, worldWidth, worldHeight } = props;
    return (
        <Wrapper
            width="100%"
            height="100%"
            viewBox={[startX || 0, startY || 0, worldWidth, worldHeight].join(' ')}
            xmlns="http://www.w3.org/2000/svg"
        >
            {layers
                .slice(0)
                .reverse()
                .map((layer) => {
                    if (layer.visible) {
                        return layer.shapes.reverse().map((shape, index) => {
                            switch (shape.type) {
                                case 'rect':
                                    return (
                                        <Rect
                                            key={`${layer.name}${index}`}
                                            shape={shape}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        });
                    } else {
                        return null;
                    }
                })}
        </Wrapper>
    );
};
