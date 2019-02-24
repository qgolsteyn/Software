const ctx: Worker = self as any;

import { ActionType, getType } from 'typesafe-actions';

import { SPRITESHEET } from 'SRC/constants/visualizer';
import * as actions from '../actions';

import { renderSpritesheet } from './spritesheet';

export type Action = ActionType<typeof actions>;

let sharedBuffer: Int32Array;

function main() {
    ctx.addEventListener('message', (ev) => handleMessage(ev.data));

    generateSpritesheet();

    processWebsocket();
}

function handleMessage(action: Action) {
    switch (action.type) {
        case getType(actions.sendSharedBuffer):
            sharedBuffer = new Int32Array(action.payload.sharedBuffer);
            processWebsocket();
            return;
    }
}

async function generateSpritesheet() {
    const spritesheetBitmap = await renderSpritesheet(SPRITESHEET);

    ctx.postMessage(actions.sendSpritesheet(SPRITESHEET, spritesheetBitmap), [
        spritesheetBitmap,
    ]);
}

function processWebsocket() {
    const ws = new WebSocket('ws://localhost:9091');
    ws.binaryType = 'arraybuffer';
    ws.addEventListener('message', (message) => {
        const array = new Int32Array(message.data);
        array.forEach((value, index) => {
            sharedBuffer[index] = value;
        });
    });
}

main();
