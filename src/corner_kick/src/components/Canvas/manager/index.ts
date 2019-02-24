import * as PIXI from 'pixi.js';

import Viewport from 'pixi-viewport';
import { ActionType, getType } from 'typesafe-actions';

import { ISpritesheet } from 'SRC/types/visualizer';
import * as actions from '../actions';

import Worker from 'worker-loader!../worker';

export type Action = ActionType<typeof actions>;

const SPRITE_POOL_COUNT = 10000;

export class CanvasManager {
    public app: PIXI.Application;
    public viewport: Viewport;
    public worker: Worker;

    public spritesheetTexture: PIXI.BaseTexture;
    public spritesheetDictionary: PIXI.Texture[];

    public spritePool: PIXI.Sprite[] = [];
    public spriteCount = 0;

    public sharedBuffer = new SharedArrayBuffer(
        Int32Array.BYTES_PER_ELEMENT * 9 * SPRITE_POOL_COUNT,
    );
    public shapeArray = new Int32Array(this.sharedBuffer);

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
        }
    };

    public resizeCanvas = (width: number, height: number) => {
        this.app.renderer.resize(width, height);
        this.viewport.resize(width, height, 1000, 1000);
    };

    private initApp = async () => {
        this.app = new PIXI.Application({
            antialias: true,
            transparent: true,
        });

        this.viewport = new Viewport({
            screenHeight: 100,
            screenWidth: 100,
            worldHeight: 1000,
            worldWidth: 1000,

            interaction: this.app.renderer.plugins.interaction,
        });

        this.viewport
            .drag()
            .pinch()
            .wheel()
            .decelerate();

        this.app.stage.addChild(this.viewport);

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
        this.worker.postMessage(actions.sendSharedBuffer(this.sharedBuffer));
    };

    private processSpritesheet = (spritesheet: ISpritesheet, image: ImageBitmap) => {
        const canvas = document.createElement('canvas');
        canvas.width = spritesheet.sourceSize.w;
        canvas.height = spritesheet.sourceSize.h;

        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(image, 0, 0);

        this.spritesheetTexture = PIXI.BaseTexture.from(canvas as HTMLCanvasElement);

        this.spritesheetDictionary = spritesheet.frames.map((frame) => {
            return new PIXI.Texture(
                this.spritesheetTexture,
                new PIXI.Rectangle(
                    frame.frame.x,
                    frame.frame.y,
                    frame.frame.w,
                    frame.frame.h,
                ),
            );
        });

        requestAnimationFrame(this.processShapes);
    };

    private processShapes = () => {
        console.time('draw');
        this.viewport.removeChildren();
        for (let i = 0; i < SPRITE_POOL_COUNT; i++) {
            if (this.shapeArray[9 * i] !== 0) {
                this.spritePool[i].texture = this.spritesheetDictionary[
                    this.shapeArray[9 * i] - 1
                ];
                this.spritePool[i].x = this.shapeArray[9 * i + 1];
                this.spritePool[i].y = this.shapeArray[9 * i + 2];
                this.spritePool[i].width = this.shapeArray[9 * i + 3];
                this.spritePool[i].height = this.shapeArray[9 * i + 4];
                this.spritePool[i].rotation =
                    (this.shapeArray[9 * i + 5] / 180) * Math.PI;
                this.spritePool[i].tint =
                    (this.shapeArray[9 * i + 6] << 16) +
                    (this.shapeArray[9 * i + 7] << 8) +
                    this.shapeArray[9 * i + 8];
                this.viewport.addChild(this.spritePool[i]);
            } else {
                break;
            }
        }
        console.timeEnd('draw');
        requestAnimationFrame(this.processShapes);
    };
}
