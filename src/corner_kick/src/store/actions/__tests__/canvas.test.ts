/**
 * This file is for testing Canvas actions
 * Each test case has a description of what it tests
 */

import configureMockStore from 'redux-mock-store';

import * as canvasActions from '../canvas';

const mockStore = configureMockStore();
const store = mockStore();

const mockShapes = [
    {
        data: [1, 1, 1, 1],
        fill: 'test',
        stroke: 'test',
        stroke_weight: 0.1,
        type: 'rect',
    },
];

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
                        name: 'test',
                        shapes: mockShapes,
                    },
                    type: 'canvas_UPDATE_LAYER',
                },
            ];

            store.dispatch(canvasActions.updateLayerShapes('test', mockShapes));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
