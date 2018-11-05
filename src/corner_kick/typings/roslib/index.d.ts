/**
 * @fileoverview Typings file for the roslib library
 * Taken from roslib documentation: http://robotwebtools.org/jsdoc/roslibjs/current/index.html
 */

declare module 'roslib' {
    // Ros //

    interface RosOptions {
        url: string;
    }

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
        callOnConnection(): void;
        close(): void;
        connect(url: string): void;
    }

    // Topic //

    class Topic {}

    const ROSLib: {
        Ros: typeof Ros;
    };

    export default ROSLib;
}
