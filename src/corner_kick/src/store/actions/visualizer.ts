/**
 * This files specifies visualizer specific actions
 */

import { createAction } from 'typesafe-actions';

/**
 * Updates a layer's visibility
 */
export const changeVisibility = createAction(
    'visualizer/CHANGE_VISIBILITY',
    (resolve) => {
        return (topic: string, visibility: boolean) => resolve({ topic, visibility });
    },
);
