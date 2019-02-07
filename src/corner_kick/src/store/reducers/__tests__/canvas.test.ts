/**
 * This file is for testing canvas reducers
 * Each test case has a description of what it tests
 */

import { ICanvasState } from 'SRC/types';

import { actions } from '../../actions';
import canvasReducer from '../canvas';

const mockShapes = [
    {
        data: [1, 1, 1, 1],
        fill: 'test',
        stroke: 'test',
        stroke_weight: 0.1,
        type: 'rect',
    },
];

describe('console reducer', () => {
    describe('when we receive action ros_NEW_MESSAGE', () => {
        it('should push messages to the state', () => {
            const mockAction = actions.canvas.updateLayerShapes('test', mockShapes);

            const state = canvasReducer(undefined, mockAction);

            expect(state.layers['test']).toEqual(mockShapes);
        });
    });
    describe('when we receive other actions', () => {
        it('should return state from action payload', () => {
            const mockAction = {
                payload: null,
                type: 'test_ACTION',
            };
            const mockState: ICanvasState = {
                layers: {
                    test: mockShapes,
                },
            };

            const state = canvasReducer(mockState, mockAction as any);

            expect(state).toEqual(mockState);
        });
    });
});
