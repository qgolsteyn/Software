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
}

function handleMessage(action: Action) {
    switch (action.type) {
        case getType(actions.sendSharedBuffer):
            sharedBuffer = new Int32Array(action.payload.sharedBuffer);
            requestAnimationFrame(generateShapes);
            return;
    }
}

async function generateSpritesheet() {
    const spritesheetBitmap = await renderSpritesheet(SPRITESHEET);

    ctx.postMessage(actions.sendSpritesheet(SPRITESHEET, spritesheetBitmap), [
        spritesheetBitmap,
    ]);
}

function generateShapes(time: number) {
    let i = 0;
    for (; i < 94 * 54; i++) {
        sharedBuffer[9 * i] = 2;
        sharedBuffer[9 * i + 1] = Math.floor(i % 94) * 10;
        sharedBuffer[9 * i + 2] = Math.floor(i / 94) * 10;
        sharedBuffer[9 * i + 3] = 11;
        sharedBuffer[9 * i + 4] = 11;
        sharedBuffer[9 * i + 5] = 0;
        sharedBuffer[9 * i + 6] =
            ((((i / 100) * 0xff) % 0xff) + (((time / 5000) * 0xff) % 0xff)) % 0xff;
        sharedBuffer[9 * i + 7] =
            0xff -
            (((((i / 100) * 0xff) % 0xff) + (((time / 5000) * 0xff) % 0xff)) % 0xff);
        sharedBuffer[9 * i + 8] = 0;
    }
    sharedBuffer[9 * i] = 2;
    sharedBuffer[9 * i + 1] = 0;
    sharedBuffer[9 * i + 2] = 0;
    sharedBuffer[9 * i + 3] = 4;
    sharedBuffer[9 * i + 4] = 541;
    sharedBuffer[9 * i + 5] = 0;
    sharedBuffer[9 * i + 6] = 0xff;
    sharedBuffer[9 * i + 7] = 0xff;
    sharedBuffer[9 * i + 8] = 0xff;
    requestAnimationFrame(generateShapes);
}

main();
