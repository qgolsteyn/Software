import { ActionType, getType } from 'typesafe-actions';

import { ILayer, IShape } from 'SRC/types';
import { ROS } from 'SRC/utils/ros';

import * as actions from './actions';

export type CanvasAction = ActionType<typeof actions>;

const ctx: Worker = self as any;
const ros = new ROS();

const state: {
    width: number;
    height: number;
    offscreenCanvas: HTMLCanvasElement | null;
    context: CanvasRenderingContext2D | null;
    shapes: IShape[];
} = {
    context: null,
    height: 0,
    offscreenCanvas: null,
    shapes: [],
    width: 0,
};

function main() {
    ros.connect();

    ctx.addEventListener('message', (ev) => handleMessage(ev.data));
    requestAnimationFrame(render);
}

function render(time: number) {
    const { width, height, context } = state;
    if (context !== null) {
        context.fillStyle = time % 2000 > 1000 ? 'red' : 'blue';
        context.fillRect(0, 0, width, height);
    }
    requestAnimationFrame(render);
}

function handleMessage(action: CanvasAction) {
    switch (action.type) {
        case getType(actions.rosShapeTopic):
            ros.subscribeToROSTopic(
                action.payload.name,
                action.payload.messageType,
                handleShapes,
            );
            break;
        case getType(actions.resizeCanvas):
            state.width = action.payload.width;
            state.height = action.payload.height;
            break;
        case getType(actions.sendOffscreenCanvas):
            state.offscreenCanvas = action.payload.offscreenCanvas;
            state.context = state.offscreenCanvas.getContext('2d');
            break;
        case getType(actions.stopWorker):
            close();
            break;
    }
}

function handleShapes(layer: ILayer) {
    state.shapes = layer.shapes;
}

main();
