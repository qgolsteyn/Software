/*
 * This file specifies Canvas specific action
 *
 * We are using the format specified here
 * @see https://github.com/piotrwitek/typesafe-actions#createaction
 */

import { createAction } from 'typesafe-actions';

import { ILayer } from 'SRC/types';

/**
 * Sent when a new message is received from a particular topic
 */
export const updateLayers = createAction('canvas_UPDATE_LAYERS', (resolve) => {
    return (layers: { [key: string]: ILayer }) => resolve({ layers });
});
