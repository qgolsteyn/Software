import { createAction } from 'typesafe-actions';

import { ILayer } from 'SRC/types';
import { IParsedMessage } from './type';

export const sendLayer = createAction('canvas_SEND_LAYER', (resolve) => {
    return (layer: ILayer) => resolve({ layer });
});

export const sendRenderedSprite = createAction('canvas_SEND_SPRITE', (resolve) => {
    return (index: number, image: ImageBitmap) => resolve({ index, image });
});

export const sendParsedMessage = createAction('canvas_PARSED_MESSAGE', (resolve) => {
    return (messages: IParsedMessage[]) => resolve({ messages });
});

export const stopWorker = createAction('canvas_STOP');
