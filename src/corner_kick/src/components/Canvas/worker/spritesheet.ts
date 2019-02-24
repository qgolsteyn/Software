import { IFrame, IShape, ISpritesheet } from 'SRC/types/visualizer';

export const renderSpritesheet = async (spritesheet: ISpritesheet) => {
    const canvas = new OffscreenCanvas(
        spritesheet.sourceSize.w,
        spritesheet.sourceSize.h,
    );
    const ctx = canvas.getContext('2d')!;

    spritesheet.frames.forEach((frame) => renderFrame(ctx, frame));

    return await createImageBitmap(canvas as HTMLCanvasElement);
};

const renderFrame = (canvasCtx: OffscreenCanvasRenderingContext2D, frameInfo: IFrame) => {
    const frameCanvas = new OffscreenCanvas(
        frameInfo.sourceSize.w,
        frameInfo.sourceSize.h,
    );
    const frameCtx = frameCanvas.getContext('2d')!;

    frameInfo.shapes.forEach((shape) => {
        frameCtx.beginPath();
        setStyle(frameCtx, shape);
        switch (shape.type) {
            case 'rect':
                drawRect(frameCtx, shape);
                break;
            case 'circle':
                drawCircle(frameCtx, shape);
                break;
        }
        frameCtx.fill();
        frameCtx.stroke();
        frameCtx.closePath();
    });

    canvasCtx.drawImage(
        frameCanvas as HTMLCanvasElement,
        frameInfo.frame.x,
        frameInfo.frame.y,
    );
};

const setStyle = (ctx: OffscreenCanvasRenderingContext2D, shape: IShape) => {
    ctx.fillStyle = shape.fill || 'white';
    ctx.strokeStyle = shape.stroke || 'transparent';
    ctx.lineWidth = shape.stroke_weight || 0;
};

const drawRect = (ctx: OffscreenCanvasRenderingContext2D, shape: IShape) => {
    ctx.rect(shape.data[0], shape.data[1], shape.data[2], shape.data[3]);
};

const drawCircle = (ctx: OffscreenCanvasRenderingContext2D, shape: IShape) => {
    ctx.arc(shape.data[0], shape.data[1], shape.data[2], 0, 2 * Math.PI, false);
};
