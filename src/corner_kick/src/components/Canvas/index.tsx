import * as React from 'react';
import { ResizeObserver } from 'resize-observer';

import * as actions from './actions';

import Worker from 'worker-loader!./worker';

interface ICanvasProps {
    topicName: string;
    topicMessageType: string;
}

export class Canvas extends React.Component<ICanvasProps> {
    public resizeObserver: ResizeObserver;
    public canvasRef = React.createRef<HTMLCanvasElement>();

    public worker: Worker;

    public componentDidMount() {
        this.resizeObserver = new ResizeObserver(this.onResize);
        const canvas = this.canvasRef.current!;

        this.resizeObserver.observe(canvas);

        this.worker = new Worker();
        const offscreen = (canvas as any).transferControlToOffscreen();

        this.worker.postMessage(actions.sendOffscreenCanvas(offscreen), [offscreen]);
        this.worker.postMessage(
            actions.rosShapeTopic(this.props.topicName, this.props.topicMessageType),
        );
    }

    public render() {
        return <canvas ref={this.canvasRef} style={{ width: '100%', height: '100%' }} />;
    }

    public onResize = () => {
        const canvas = this.canvasRef.current!;
        this.worker.postMessage(
            actions.resizeCanvas(canvas.clientWidth, canvas.clientHeight),
        );
    };

    public componentWillUnmount() {
        const canvas = this.canvasRef.current!;
        this.resizeObserver.unobserve(canvas);

        this.worker.postMessage(actions.stopWorker);
    }
}
