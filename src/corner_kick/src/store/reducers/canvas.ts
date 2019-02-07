/*
 * This file specifies the Canvas reducer
 */

import { ActionType, getType } from 'typesafe-actions';

import { ICanvasState } from 'SRC/types';

import * as canvas from '../actions/canvas';

export type CanvasAction = ActionType<typeof canvas>;

const defaultState: ICanvasState = {
    layers: {},
};

/**
 * Reducer function for Console
 */
export default (state: ICanvasState = defaultState, action: CanvasAction) => {
    switch (action.type) {
        // Push messages to state if subscribed to /rosout
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
        default:
            return state;
    }
};
