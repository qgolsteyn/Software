import * as PIXI from 'pixi.js';
import { ActionType, getType } from 'typesafe-actions';

import { IShape, ISpritesheet } from 'SRC/types/visualizer';
import * as actions from '../actions';

import Worker from 'worker-loader!../worker';

export type Action = ActionType<typeof actions>;

const SPRITE_POOL_COUNT = 10000;

export class CanvasManager {
    public app: PIXI.Application;
    public worker: Worker;

    public spritesheetTexture: PIXI.BaseTexture;
    public spritesheetDictionary: { [key: string]: PIXI.Texture } = {};

    public spritePool: PIXI.Sprite[] = [];
    public spriteCount = 0;

    constructor() {
        this.initApp();
        this.initSpritePool();
        this.initWorker();
    }

    public getCanvas = () => {
        return this.app.view;
    };

    public handleAction = (action: Action) => {
        switch (action.type) {
            case getType(actions.sendSpritesheet):
                this.processSpritesheet(action.payload.spritesheet, action.payload.image);
                break;
            case getType(actions.sendShapes):
                this.processShapes(action.payload.shapes);
                break;
        }
    };

    public resizeCanvas = (width: number, height: number) => {
        this.app.renderer.resize(width, height);
    };

    private initApp = async () => {
        this.app = new PIXI.Application({
            antialias: true,
            transparent: true,
        });

        this.app.renderer.autoResize = true;
    };

    private initSpritePool = async () => {
        for (let i = 0; i < SPRITE_POOL_COUNT; i++) {
            this.spritePool.push(new PIXI.Sprite());
        }
    };

    private initWorker = async () => {
        this.worker = new Worker();
        this.worker.addEventListener('message', (ev) => this.handleAction(ev.data));
    };

    private processSpritesheet = (spritesheet: ISpritesheet, image: ImageBitmap) => {
        const canvas = document.createElement('canvas');
        canvas.width = spritesheet.sourceSize.w;
        canvas.height = spritesheet.sourceSize.h;

        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(image, 0, 0);

        this.spritesheetTexture = PIXI.BaseTexture.from(canvas as HTMLCanvasElement);

        Object.keys(spritesheet.frames).forEach((frameName) => {
            const { frame } = spritesheet.frames[frameName];
            this.spritesheetDictionary[frameName] = new PIXI.Texture(
                this.spritesheetTexture,
                new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h),
            );
        });

        const shapes: IShape[] = [];
        for (let i = 0; i < 9999; i++) {
            shapes.push({
                data: [Math.floor(i % 100) * 3, Math.floor(i / 100) * 3, 2, 2],
                type: 'rect',
            });
        }

        const test = (time: number) => {
            const count = (time % 2000) * 0.01 + 3;
            for (let i = 0; i < 9999; i++) {
                shapes[i].data[0] = Math.floor(i % 100) * count;
                shapes[i].data[1] = Math.floor(i / 100) * count;
            }

            this.processShapes(shapes);
            requestAnimationFrame(test);
        };

        requestAnimationFrame(test);
    };

    private processShapes = (shapes: IShape[]) => {
        const stage = this.app.stage;
        const newCount = shapes.length;

        console.time('draw');
        for (let i = 0; i < newCount || i < this.spriteCount; i++) {
            if (i < newCount) {
                if (i > this.spriteCount) {
                    stage.addChild(this.spritePool[i]);
                }

                const shape = shapes[i];
                const sprite = this.spritePool[i];

                sprite.texture = this.spritesheetDictionary[shapes[i].type];
                sprite.x = shape.data[0];
                sprite.y = shape.data[1];
                sprite.width = shape.data[2];
                sprite.height = shape.data[3];
            } else {
                stage.removeChild(this.spritePool[i]);
            }
        }
        console.timeEnd('draw');

        this.spriteCount = newCount;
    };
}
