import { createAction } from 'typesafe-actions';

import { IShape, ISpritesheet } from 'SRC/types/visualizer';

export const sendSpritesheet = createAction('canvas_SEND_SPRITESHEET', (resolve) => {
    return (spritesheet: ISpritesheet, image: ImageBitmap) =>
        resolve({ spritesheet, image });
});

export const sendShapes = createAction('canvas_PARSED_MESSAGE', (resolve) => {
    return (shapes: IShape[]) => resolve({ shapes });
});

export const stopWorker = createAction('canvas_STOP');
