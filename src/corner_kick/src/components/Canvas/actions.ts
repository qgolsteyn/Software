import { createAction } from 'typesafe-actions';

export const rosShapeTopic = createAction('canvas_SHAPE_TOPIC', (resolve) => {
    return (name: string, messageType: string) => resolve({ name, messageType });
});

export const sendOffscreenCanvas = createAction('canvas_OFFSCREEN_CANVAS', (resolve) => {
    return (offscreenCanvas: HTMLCanvasElement) => resolve({ offscreenCanvas });
});

export const resizeCanvas = createAction('canvas_RESIZE', (resolve) => {
    return (width: number, height: number) => resolve({ width, height });
});

export const stopWorker = createAction('canvas_STOP');
