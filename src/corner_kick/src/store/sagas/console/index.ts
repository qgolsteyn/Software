/*
 * This file specifies the saga for the Console
 */
import { channel } from 'redux-saga';
import { put, spawn, take, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import { actions } from 'SRC/store/actions';

import Worker from 'worker-loader!./worker';

const consoleChannel = channel();

export default function* init() {
    // Listen to start actions and start Console
    yield takeLatest(getType(actions.ros.connected), startConsole);

    // Start listening to Console messages
    yield spawn(listenToConsoleChannel);
}

/**
 * Take any messages received from Console and push them as Redux actions
 */
function* listenToConsoleChannel() {
    while (true) {
        const action = yield take(consoleChannel);
        yield put(action);
    }
}

/**
 * We subscribe to topic rosout to start receiving messages
 */
function startConsole() {
    const worker = new Worker();
    worker.addEventListener('message', (message) => {
        consoleChannel.put(actions.console.newRosoutMessage(message.data));
    });
}
