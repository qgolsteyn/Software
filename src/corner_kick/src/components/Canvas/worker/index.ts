const ctx: Worker = self as any;

import { ActionType, getType } from 'typesafe-actions';

import { ILayer } from 'SRC/types';
import { ROS } from 'SRC/utils/ros';

import * as actions from '../actions';
import { parseMessage } from './parse';
import { renderSprite } from './sprite/index';

export type Action = ActionType<typeof actions>;

const ros: ROS = new ROS();

function init() {
    ctx.addEventListener('message', (ev) => handleMessage(ev.data));
}

async function main(layer: ILayer) {
    const image = await renderSprite(layer.sprite);
    ctx.postMessage(actions.sendRenderedSprite(0, image), [image]);

    ros.subscribeToROSTopic(
        layer.topic.name,
        layer.topic.messageType,
        (message) => {
            const parsedMessages = parseMessage(layer, message);
            console.log(parsedMessages);
            ctx.postMessage(actions.sendParsedMessage(parsedMessages));
        },
        16,
    );

    ros.connect();
}

function handleMessage(action: Action) {
    switch (action.type) {
        case getType(actions.sendLayer):
            main(action.payload.layer);
            return;
        default:
            return;
    }
}

init();
