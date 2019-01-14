import * as React from 'react';
import Reorder from 'react-reorder';

import { ILayer } from 'SRC/types';
import styled from 'SRC/utils/styled-components';

const LayerItem = styled.div`
    width: 100%;
    height: 32px;

    padding: 0 16px;

    display: flex;
    align-items: center;

    font-size: 12px;
    color: ${(props) => props.theme.colors.subdued};

    cursor: move;

    & .material-icons {
        padding: 4px;
        margin-left: auto;

        border-radius: 4px;

        font-size: 14px;

        cursor: pointer;

        transition: 0.2s all;
    }

    &:hover {
        background: ${(props) => props.theme.colors.selected};
        color: ${(props) => props.theme.colors.fg};
    }

    & .material-icons:hover {
        background: ${(props) => props.theme.colors.bg};
    }

    &.visible .material-icons {
        color: ${(props) => props.theme.colors.fg};
    }

    &.hidden .material-icons {
        color: ${(props) => props.theme.colors.subdued};
    }

    &.dragged {
        color: ${(props) => props.theme.colors.fg};
        background: ${(props) => props.theme.colors.selected};
    }

    &.placeholder {
        background: none;
        cursor: none;
    }
`;

interface ILayersProps {
    layers: ILayer[];
    onVisibilityChanged: (layer: ILayer) => void;
    onOrderChanged: (prevIndex: number, newIndex: number) => void;
}

export const Layers = (props: ILayersProps) => {
    const { layers, onOrderChanged, onVisibilityChanged } = props;
    return (
        <>
            <Reorder
                reorderId="layers"
                placeholder={<LayerItem />}
                draggedClassName="dragged"
                placeholderClassName="placeholder"
                onReorder={(_event: any, previousIndex: number, nextIndex: number) =>
                    onOrderChanged(previousIndex, nextIndex)
                }
            >
                {layers.map((layer) => (
                    <LayerItem
                        key={layer.topic}
                        className={layer.visible ? 'visible' : 'hidden'}
                    >
                        {layer.name}
                        <i
                            className="material-icons"
                            onClick={() => onVisibilityChanged(layer)}
                        >
                            remove_red_eye
                        </i>
                    </LayerItem>
                ))}
            </Reorder>
        </>
    );
};
