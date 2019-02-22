import { IShape, ISprite } from 'SRC/types/visualizer';
import { drawRect, setStyle } from './draw';

const defaultShape: Required<IShape> = {
    fill: 'white',
    stroke: 'transparent',
    stroke_weight: 0,
    type: '',
};

export const renderSprite = async (sprite: ISprite) => {
    const canvas = new OffscreenCanvas(sprite.width, sprite.height);
    const ctx = canvas.getContext('2d')!;

    sprite.shapes.forEach((shape) => {
        setStyle(ctx, { ...defaultShape, ...shape });

        switch (shape.type) {
            case 'rect':
                drawRect(ctx, { ...defaultShape, ...shape });
                break;
        }
    });

    return await createImageBitmap(canvas as HTMLCanvasElement);
};
