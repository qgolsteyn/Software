import * as PIXI from 'pixi.js';
import { ActionType, getType } from 'typesafe-actions';

import { ILayer } from 'SRC/types';
import { ISprite } from 'SRC/types/visualizer';

import * as actions from '../actions';

import Worker from 'worker-loader!../worker';
import { IParsedMessage } from '../type';

export type Action = ActionType<typeof actions>;

export class CanvasManager {
    public worker: Worker;
    public app: PIXI.Application;
    public sprite: HTMLCanvasElement;
    public layer: ILayer;

    public initCanvas = (layer: ILayer) => {
        this.layer = layer;

        this.worker = new Worker();
        this.worker.addEventListener('message', (ev) => this.handleAction(ev.data));
        this.worker.postMessage(actions.sendLayer(layer));

        this.app = new PIXI.Application({
            antialias: true,
        });

        this.app.renderer.autoResize = true;

        return this.app.view;
    };

    public handleAction = (action: Action) => {
        switch (action.type) {
            case getType(actions.sendRenderedSprite):
                this.processSprite(this.layer.sprite, action.payload.image);
                break;
            case getType(actions.sendParsedMessage):
                this.processParsedMessages(action.payload.messages);
                break;
        }
    };

    public resizeCanvas = (width: number, height: number) => {
        this.app.renderer.resize(width, height);
    };

    public processSprite = (spriteInfo: ISprite, image: ImageBitmap) => {
        this.sprite = document.createElement('canvas');
        this.sprite.width = spriteInfo.width;
        this.sprite.height = spriteInfo.height;

        const ctx = this.sprite.getContext('2d')!;
        ctx.drawImage(image, 0, 0);
    };

    public processParsedMessages = (messages: IParsedMessage[]) => {
        const stage = this.app.stage;

        stage.removeChildren();

        messages.forEach((message) => {
            const sprite = PIXI.Sprite.from(this.sprite);
            sprite.x = message.x;
            sprite.y = message.y;

            console.log(message);

            stage.addChild(sprite);
        });
    };
}
