import * as React from 'react';

import { Portal } from 'SRC/components/Portal';
import { ILayer } from 'SRC/types';
import styled from 'SRC/utils/styled-components';

import { Circle } from './shapes/Circle';
import { Line } from './shapes/Line';
import { Rect } from './shapes/Rect';

const Wrapper = styled.svg`
    & * {
        fill: transparent;
        stroke: transparent;
    }
`;

interface ILayersProps {
    layers: ILayer[];
}

export const View = (props: ILayersProps) => {
    const { layers } = props;
    return (
        <Portal to="main">
            <Wrapper
                width="100%"
                height="100%"
                viewBox={[0, 0, 12.6, 9.6].join(' ')}
                xmlns="http://www.w3.org/2000/svg"
            >
                {layers
                    .slice(0)
                    .reverse()
                    .map((layer) => {
                        if (layer.visible) {
                            return layer.shapes.reverse().map((shape, index) => {
                                switch (shape.type) {
                                    case 'circle':
                                        return (
                                            <Circle
                                                key={`${layer.topic}${index}`}
                                                shape={shape}
                                            />
                                        );
                                    case 'rect':
                                        return (
                                            <Rect
                                                key={`${layer.topic}${index}`}
                                                shape={shape}
                                            />
                                        );
                                    case 'line':
                                        return (
                                            <Line
                                                key={`${layer.topic}${index}`}
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
        </Portal>
    );
};
