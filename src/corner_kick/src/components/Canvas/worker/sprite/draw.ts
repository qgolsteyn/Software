import { IRectShape, IShape } from 'SRC/types/visualizer';

export const setStyle = (
    ctx: OffscreenCanvasRenderingContext2D,
    shape: Required<IShape>,
) => {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = shape.stroke;
    ctx.lineWidth = shape.stroke_weight;
};

export const drawRect = (
    ctx: OffscreenCanvasRenderingContext2D,
    shape: Required<IRectShape>,
) => {
    ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
};
