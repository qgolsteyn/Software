import { ISpritesheet } from 'SRC/types/visualizer';

export const SPRITESHEET: ISpritesheet = {
    frames: {
        circle: {
            frame: {
                h: 512,
                w: 512,
                x: 0,
                y: 0,
            },
            shapes: [
                {
                    data: [256, 256, 256],
                    fill: 'white',
                    type: 'circle',
                },
            ],
            sourceSize: {
                h: 512,
                w: 512,
            },
        },
        rect: {
            frame: {
                h: 512,
                w: 512,
                x: 512,
                y: 0,
            },
            shapes: [
                {
                    data: [0, 0, 512, 512],
                    fill: 'white',
                    type: 'rect',
                },
            ],
            sourceSize: {
                h: 512,
                w: 512,
            },
        },
    },
    sourceSize: {
        h: 512,
        w: 1024,
    },
};
