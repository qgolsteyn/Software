const ctx: Worker = self as any;

import { ActionType } from 'typesafe-actions';

import { SPRITESHEET } from 'SRC/constants/visualizer';
import * as actions from '../actions';

import { renderSpritesheet } from './spritesheet';

export type Action = ActionType<typeof actions>;

function main() {
    ctx.addEventListener('message', (ev) => handleMessage(ev.data));

    generateSpritesheet();
}

function handleMessage(action: Action) {
    switch (action.type) {
        default:
            return;
    }
}

async function generateSpritesheet() {
    const spritesheetBitmap = await renderSpritesheet(SPRITESHEET);

    ctx.postMessage(actions.sendSpritesheet(SPRITESHEET, spritesheetBitmap), [
        spritesheetBitmap,
    ]);
}

main();
