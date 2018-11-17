/**
 * @fileoverview Typings file for the roslib library
 * Taken from roslib documentation: http://robotwebtools.org/jsdoc/roslibjs/current/index.html
 */

declare module 'roslib' {
    // Ros //

    interface RosOptions {
        url: string;
    }

    interface Anything {
        [key: string]: any;
    }

    interface ParamOptions {
        ros?: string,
        name?: string,
    }

    interface TopicOptions {
        ros: string,
        name: string,
        messageType: string,
        compression?: string,
        throttle_rate?: number,
        queue_size?: number,
        latch?: string,
        queue_length?: number,
        reconnect_on_close?: boolean,
    }

    interface ToStreamOptions {
        subscribe?: boolean,
        publish: boolean,
        transform?: (chunk: Buffer | string | any) => Buffer | string | any,
    }

    interface ServiceOptions {
        ros?: string,
        name?: string,
        serviceType?: string,
    }

    // Message //

    class Message {
        constructor(values: Anything);
    }

    // Param //

    class Param {
        constructor(options: ParamOptions);
        delete(callback: (response: string) => void): void; //What does callback take in
    }

    // ROS //
    
    class Ros {
        constructor(options: RosOptions);
        authenticate(
            mac: string,
            client: string,
            dest: string,
            rand: string,
            t: number,
            level: string,
            end: number,
        ): void;
        callOnConnection(message: any): void;
        close(): void;
        connect(url: string): void;
        decodeTypeDefs(defs: string[]): void;
        getActionServers(
            callback: (action_servers: string) => void,
            failedCallback: (message: any) => void
        ): void;
        getMessageDetails(
            message: string,
            callback: (typedefs: string[]) => void,
            failedCallback: (message: any) => void,
        ): void;
        getNodeDetails(
            node: string,
            callback: (
                publications: string[],
                subscriptions: string[],
                services: string[],
            ) => void,
            failedCallback: (message: any) => void,
        ): void;
        getNodes(
            callback: (nodes: string[]) => void,
            failedCallback: (message: any) => void,
        ): void;
        getParams(
            callback: (params: string[]) => void,
            failedCallback: (message: any) => void,
        ): void;
        getServiceRequestDetails(
            type: string,
            callback: (type: string) => void,
            failedCallback: (message: any) => void,
        ): void;
        getServiceResponseDetails(
            type: string,
            callback: (type: string) => void,  
            failedCallback: (message: any) => void,          
        ): void
        getServices(
            callback: (services: string[]) => void,
            failedCallback: (message: any) => void,
        ): void;
        getServicesForType(
            serviceType: string,
            callback: (topics: string[]) => void, 
            failedCallback: (message: any) => void,
        ): void;
        getServiceType(
            service: string,
            callback: (type: string) => void,
            failedCallback: (message: any) => void,
        ): void;
        getTopics(
            callback: (topics: string[]) => void,
            failedCallback: (message: any) => void,
        ): void;
        getTopicsForType(
            topicType: string,
            callback: (topics: string[]) => void,
            failedCallback: (message: any) => void,
        ): void;
        getTopicType(
            topic: string,
            callback: (type: string) => void,
            failedCallback: (message: any) => void, 
        ): void;
        setStatusLevel(
            level: number,
            id: number,
        ): void;
    }
    
    // Service //

    class Service {
        constructor(options: ServiceOptions);  //Not sure how to define published method
        advertise(callback: (message: any) => void): void;
        unadvertise(callback: (message: any) => void): void;
        callService(
            request: string,
            callback: (response: string) => void,  //What type is the resp from service request
            failedCallback: (error: string) => void,
        ): void;
    }

    // ServiceRequest //
    
    class ServiceRequest {
        constructor(values: any);
    }

    // ServiceResponse //

    class ServiceResponse {
        constructor(values: any);
    }

    // Topic //

    class Topic {
        constructor(options: TopicOptions);
        publish(message: string): void;   //What type is ROSLIB.Message object
        subscribe(callback: (message: string) => void): void;
        toStream(options: ToStreamOptions): void;
        unadvertise(): void;
        unsubscribe(callback: (unsubscribe: string) => void): void;
    }
    

    const ROSLib: {
        Ros: typeof Ros;
        Topic: typeof Topic;
    };

    export default ROSLib;
}
