/**
 * This file specifies the visualizer reducer
 */

import { ActionType, getType } from 'typesafe-actions';

import { IVisualizerState } from 'SRC/types';

import * as visualizer from '../actions/visualizer';

export type VisualizerActions = ActionType<typeof visualizer>;

const defaultState: IVisualizerState = {
    layerOrder: ['friendly_robots', 'enemy_robots', 'ball', 'field'],
    layers: {
        ball: {
            name: 'Ball',
            shapes: [
                {
                    data: [6.3, 4.8, 0.06],
                    fill: 'orange',
                    type: 'circle',
                },
            ],
            topic: 'ball',
            visible: true,
        },
        enemy_robots: {
            name: 'Enemy Robots',
            shapes: [
                {
                    data: [6, 3, 0.24],
                    fill: 'blue',
                    stroke: 'white',
                    strokeWidth: 0.03,
                    type: 'circle',
                },
                {
                    data: [2, 3.8, 0.24],
                    fill: 'blue',
                    stroke: 'white',
                    strokeWidth: 0.03,
                    type: 'circle',
                },
                {
                    data: [11.5, 4.8, 0.24],
                    fill: 'blue',
                    stroke: 'white',
                    strokeWidth: 0.03,
                    type: 'circle',
                },
                {
                    data: [9, 8.8, 0.24],
                    fill: 'blue',
                    stroke: 'white',
                    strokeWidth: 0.03,
                    type: 'circle',
                },
                {
                    data: [6, 6.8, 0.24],
                    fill: 'blue',
                    stroke: 'white',
                    strokeWidth: 0.03,
                    type: 'circle',
                },
            ],
            topic: 'enemy_robots',
            visible: true,
        },
        field: {
            name: 'Field',
            shapes: [
                {
                    data: [6.3, 4.8, 0.5, 0.5],
                    stroke: 'white',
                    strokeWidth: 0.01,
                    type: 'circle',
                },
                {
                    data: [6.3, 0.3, 6.3, 9.3],
                    stroke: 'white',
                    strokeWidth: 0.01,
                    type: 'line',
                },
                {
                    data: [0.1, 4.2, 0.2, 1.2],
                    stroke: 'white',
                    strokeWidth: 0.01,
                    type: 'rect',
                },
                {
                    data: [12.3, 4.2, 0.2, 1.2],
                    stroke: 'white',
                    strokeWidth: 0.01,
                    type: 'rect',
                },
                {
                    data: [0.3, 3.6, 1.2, 2.4],
                    stroke: 'white',
                    strokeWidth: 0.01,
                    type: 'rect',
                },
                {
                    data: [11.1, 3.6, 1.2, 2.4],
                    stroke: 'white',
                    strokeWidth: 0.01,
                    type: 'rect',
                },
                {
                    data: [0.3, 0.3, 12, 9],
                    stroke: 'white',
                    strokeWidth: 0.01,
                    type: 'rect',
                },
            ],
            topic: 'field',
            visible: true,
        },
        friendly_robots: {
            name: 'Friendly Robots',
            shapes: [
                {
                    data: [2, 3.3, 0.24],
                    fill: 'red',
                    stroke: 'white',
                    strokeWidth: 0.03,
                    type: 'circle',
                },
                {
                    data: [2.5, 6.3, 0.24],
                    fill: 'red',
                    stroke: 'white',
                    strokeWidth: 0.03,
                    type: 'circle',
                },
                {
                    data: [0.5, 4.3, 0.24],
                    fill: 'red',
                    stroke: 'white',
                    strokeWidth: 0.03,
                    type: 'circle',
                },
                {
                    data: [10.5, 7.3, 0.24],
                    fill: 'red',
                    stroke: 'white',
                    strokeWidth: 0.03,
                    type: 'circle',
                },
                {
                    data: [6.5, 8.3, 0.24],
                    fill: 'red',
                    stroke: 'white',
                    strokeWidth: 0.03,
                    type: 'circle',
                },
            ],
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
