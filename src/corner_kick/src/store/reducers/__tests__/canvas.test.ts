/**
 * This file is for testing canvas reducers
 * Each test case has a description of what it tests
 */

import { ICanvasState } from 'SRC/types';

import { actions } from '../../actions';
import canvasReducer from '../canvas';

const mockLayers = {
    ball: {
        layer_name: 'ball',
        shapes: [],
        visible: true,
    },
    enemy: {
        layer_name: 'enemy',
        shapes: [],
        visible: false,
    },
    field: {
        layer_name: 'field',
        shapes: [],
        visible: true,
    },
    friendly: {
        layer_name: 'friendly',
        shapes: [],
        visible: true,
    },
};

describe('console reducer', () => {
    describe('when we receive action ros_NEW_MESSAGE', () => {
        it('should push messages to the state', () => {
            const mockAction = actions.canvas.updateLayers(mockLayers);

            const state = canvasReducer(undefined, mockAction);

            expect(state.layers).toEqual(mockLayers);
        });
    });
    describe('when we receive other actions', () => {
        it('should return state from action payload', () => {
            const mockAction = {
                payload: null,
                type: 'test_ACTION',
            };
            const mockState: ICanvasState = {
                layers: mockLayers,
            };

            const state = canvasReducer(mockState, mockAction as any);

            expect(state).toEqual(mockState);
        });
    });
});
