import * as React from 'react';
import { ResizeObserver } from 'resize-observer';

import { CanvasManager } from './manager';

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
        container.appendChild(this.manager.getCanvas());
    }

    public render() {
        return <div ref={this.containerRef} style={{ width: '100%', height: '100%' }} />;
    }

    public onResize = () => {
        const container = this.containerRef.current!;
        this.manager.resizeCanvas(container.clientWidth, container.clientHeight);
        this.resizeObserver.unobserve(container);
    };

    public componentWillUnmount() {
        const container = this.containerRef.current!;
        this.resizeObserver.unobserve(container);
    }
}
