import * as React from 'react';
import { ResizeObserver } from 'resize-observer';

import { ILayer } from 'SRC/types';
import { CanvasManager } from './main/index';

const layer: ILayer = {
    name: 'Ball',

    topic: {
        messageType: 'thunderbots_msgs/Ball',
        name: '/backend/ball',
    },

    sprite: {
        height: 32,
        shapes: [
            {
                height: 32,
                type: 'rect',
                width: 32,
                x: 0,
                y: 0,
            },
        ],
        width: 32,
    },

    parseInfo: {
        count: 1,
        x: 50,
        y: 50,
    },
};

interface ICanvasProps {
    topicName: string;
    topicMessageType: string;
}

export class Canvas extends React.Component<ICanvasProps> {
    public resizeObserver: ResizeObserver;
    public containerRef = React.createRef<HTMLDivElement>();

    public manager: CanvasManager;

    public componentDidMount() {
        const container = this.containerRef.current!;
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.resizeObserver.observe(container);

        this.manager = new CanvasManager();
        container.appendChild(this.manager.initCanvas(layer));
    }

    public render() {
        return <div ref={this.containerRef} style={{ width: '100%', height: '100%' }} />;
    }

    public onResize = () => {
        const container = this.containerRef.current!;
        this.manager.resizeCanvas(container.clientWidth, container.clientHeight);
    };

    public componentWillUnmount() {
        const container = this.containerRef.current!;
        this.resizeObserver.unobserve(container);
    }
}
