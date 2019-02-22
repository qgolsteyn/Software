import * as PIXI from 'pixi.js';

export const generateSprite = (canvas: OffscreenCanvas) => {
    const sprite = PIXI.Sprite.from(canvas as HTMLCanvasElement);
    return sprite;
};
