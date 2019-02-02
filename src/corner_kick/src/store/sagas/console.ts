/*
 * This file specifies the saga for the Console
 */
import { put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as ros from '../actions/ros';

export default function* init() {
    yield takeLatest(getType(ros.connected), startConsole);
}

/**
 * We subscribe to topic rosout to start receiving messages
 */
function* startConsole() {
    yield put(ros.subscribeTopic('/rosout', 'rosgraph_msgs/Log'));
}