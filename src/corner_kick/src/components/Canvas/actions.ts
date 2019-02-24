import { createAction } from 'typesafe-actions';

import { ISpritesheet } from 'SRC/types/visualizer';

export const sendSpritesheet = createAction('canvas_SEND_SPRITESHEET', (resolve) => {
    return (spritesheet: ISpritesheet, image: ImageBitmap) =>
        resolve({ spritesheet, image });
});

export const sendSharedBuffer = createAction('canvas_SEND_BUFFER', (resolve) => {
    return (sharedBuffer: SharedArrayBuffer) => resolve({ sharedBuffer });
});

export const stopWorker = createAction('canvas_STOP');
