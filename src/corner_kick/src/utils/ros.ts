import { Ros, Topic } from 'roslib';

export class ROS {
    private ros: Ros;

    constructor() {
        this.ros = new Ros({});
    }

    public connect() {
        this.ros.connect('ws://localhost:9090');
    }

    public disconnect() {
        this.ros.close();
    }

    public on(event: 'connection' | 'error' | 'close', callback: () => void) {
        this.ros.on(event, callback);
    }

    public subscribeToROSTopic(
        name: string,
        messageType: string,
        callback: (message: any) => void,
        throttle_rate?: number,
    ) {
        const topic = new Topic({
            compression: 'cbor',
            messageType,
            name,
            ros: this.ros,
            throttle_rate,
        });

        topic.subscribe(callback);
    }

    public unsubscribeFromROSTopic(
        name: string,
        messageType: string,
        callback: (message: any) => void,
    ) {
        const topic = new Topic({
            messageType,
            name,
            ros: this.ros,
        });

        topic.unsubscribe(callback);
    }
}
