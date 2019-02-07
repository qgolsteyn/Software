/*
 * This file specifies the saga for the Console
 */
import * as _ from 'lodash';
import { channel } from 'redux-saga';
import { put, spawn, take, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { TOPIC_LAYERS, TOPIC_LAYERS_TYPE } from 'SRC/constants';
import { ILayerMessage, IShape } from 'SRC/types';

import { actions } from '../actions';
import { subscribeToROSTopic } from './ros';

const layers: { [name: string]: IShape[] } = {};
const canvasChannel = channel();

export default function* init() {
    // Listen to start actions and start Console
    yield takeLatest(getType(actions.ros.connected), startCanvas);

    // Start listening to Console messages
    yield spawn(listenToCanvasChannel);
}

/**
 * Take any messages received from Console and push them as Redux actions
 */
function* listenToCanvasChannel() {
    while (true) {
        const action = yield take(canvasChannel);
        yield put(action);
    }
}

/**
 * We subscribe to topic rosout to start receiving messages
 */
function startCanvas() {
    subscribeToROSTopic(TOPIC_LAYERS, TOPIC_LAYERS_TYPE, onNewLayerMessage, 16);
}

function onNewLayerMessage(message: ILayerMessage) {
    const { layer_name, shapes } = message;

    if (layers[layer_name] === undefined) {
        layers[layer_name] = shapes;

        canvasChannel.put(actions.canvas.addLayer(layer_name, shapes));
    } else if (shouldUpdateCanvas(layers[layer_name], shapes)) {
        layers[layer_name] = shapes;

        canvasChannel.put(actions.canvas.updateLayerShapes(layer_name, shapes));
    }
}

function shouldUpdateCanvas(oldShapes: IShape[], newShapes: IShape[]): boolean {
    if (oldShapes.length !== newShapes.length) {
        return true;
    } else {
        return !_.isEqual(oldShapes, newShapes);
    }
}
