/*
 * This file specifies the Canvas reducer
 */

import { ActionType, getType } from 'typesafe-actions';

import { ICanvasState } from 'SRC/types';

import * as canvas from '../actions/canvas';

export type CanvasAction = ActionType<typeof canvas>;

const defaultState: ICanvasState = {
    layerOrder: [],
    layerVisibility: {},
    layers: {},
};

/**
 * Reducer function for Console
 */
export default (state: ICanvasState = defaultState, action: CanvasAction) => {
    switch (action.type) {
        case getType(canvas.addLayer): {
            const { name, shapes } = action.payload;
            return {
                ...state,
                layerOrder: [...state.layerOrder, name],
                layerVisibility: {
                    ...state.layerVisibility,
                    [name]: false,
                },
                layers: {
                    ...state.layers,
                    [name]: shapes,
                },
            };
        }
        case getType(canvas.updateLayerShapes): {
            const { name, shapes } = action.payload;
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [name]: shapes,
                },
            };
        }
        case getType(canvas.toggleLayerVisibility): {
            const { name, visibility } = action.payload;
            return {
                ...state,
                layerVisibility: {
                    ...state.layerVisibility,
                    [name]: visibility,
                },
            };
        }
        case getType(canvas.swapLayerOrder): {
            const { layerOrder } = state;
            const { layerIndexA, layerIndexB } = action.payload;

            const startIndex = layerIndexA > layerIndexB ? layerIndexB : layerIndexA;
            const endIndex = layerIndexA > layerIndexB ? layerIndexA : layerIndexB;

            return {
                ...state,
                layerOrder: [
                    ...layerOrder.slice(0, startIndex),
                    layerOrder[endIndex],
                    ...layerOrder.slice(startIndex + 1, endIndex),
                    layerOrder[startIndex],
                    ...layerOrder.slice(endIndex + 1),
                ],
            };
        }
        default:
            return state;
    }
};
