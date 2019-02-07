/**
 * This file is for testing Canvas actions
 * Each test case has a description of what it tests
 */

import configureMockStore from 'redux-mock-store';

import * as canvasActions from '../canvas';

const mockStore = configureMockStore();
const store = mockStore();

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

describe('canvasActions', () => {
    beforeEach(() => {
        store.clearActions();
    });

    describe('when we need to update the Canvas UI', () => {
        test('Dispatches the set of layers to be displayed', () => {
            const expectedActions = [
                {
                    meta: undefined,
                    payload: {
                        layers: mockLayers,
                    },
                    type: 'console_NEW_ROSOUT',
                },
            ];

            store.dispatch(canvasActions.updateLayers(mockLayers));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
