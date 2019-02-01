import * as React from 'react';

import { ILayer } from 'SRC/types';
import styled from 'SRC/utils/styled-components';

import { Layer } from './Layer';

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
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox={[startX || 0, startY || 0, worldWidth, worldHeight].join(' ')}
        >
            {layers.map((layer) => (
                <Layer layer={layer} />
            ))}
        </Wrapper>
    );
};
