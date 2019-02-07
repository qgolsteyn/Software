/*
 * This file specifies Canvas specific action
 *
 * We are using the format specified here
 * @see https://github.com/piotrwitek/typesafe-actions#createaction
 */

import { createAction } from 'typesafe-actions';

import { IShape } from 'SRC/types';

export const addLayer = createAction('canvas_ADD_LAYER', (resolve) => {
    return (name: string, shapes: IShape[]) => resolve({ name, shapes });
});

/**
 * Sent when a new message is received from a particular topic
 */
export const updateLayerShapes = createAction('canvas_UPDATE_LAYER', (resolve) => {
    return (name: string, shapes: IShape[]) => resolve({ name, shapes });
});

export const toggleLayerVisibility = createAction(
    'canvas_TOGGLE_VISIBILITY',
    (resolve) => {
        return (name: string, visibility: boolean) => resolve({ name, visibility });
    },
);

export const swapLayerOrder = createAction('canvas_SWAP_ORDER', (resolve) => {
    return (layerIndexA: number, layerIndexB: number) =>
        resolve({ layerIndexA, layerIndexB });
});
