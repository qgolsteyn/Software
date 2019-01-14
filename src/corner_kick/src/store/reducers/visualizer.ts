/**
 * This file specifies the visualizer reducer
 */

import { ActionType, getType } from 'typesafe-actions';

import { IVisualizerState } from 'SRC/types';

import * as visualizer from '../actions/visualizer';

export type VisualizerActions = ActionType<typeof visualizer>;

const defaultState = {
    layerOrder: ['friendly_robots', 'enemy_robots', 'ball', 'field'],
    layers: {
        ball: {
            name: 'Ball',
            shapes: [],
            topic: 'ball',
            visible: true,
        },
        enemy_robots: {
            name: 'Enemy Robots',
            shapes: [],
            topic: 'enemy_robots',
            visible: false,
        },
        field: {
            name: 'Field',
            shapes: [],
            topic: 'field',
            visible: true,
        },
        friendly_robots: {
            name: 'Friendly Robots',
            shapes: [],
            topic: 'friendly_robots',
            visible: true,
        },
    },
};

export default (state: IVisualizerState = defaultState, action: VisualizerActions) => {
    switch (action.type) {
        case getType(visualizer.changeVisibility): {
            const { topic, visibility } = action.payload;

            return {
                ...state,
                layers: {
                    ...state.layers,
                    [topic]: {
                        ...state.layers[topic],
                        visible: visibility,
                    },
                },
            };
        }
        case getType(visualizer.changeOrder): {
            const { prevIndex, newIndex } = action.payload;

            const layerOrder = new Array(...state.layerOrder);

            const temp = layerOrder.splice(prevIndex, 1);

            return {
                ...state,
                layerOrder: [
                    ...layerOrder.slice(0, newIndex),
                    temp,
                    ...layerOrder.slice(newIndex),
                ],
            };
        }
        default:
            return state;
    }
};
