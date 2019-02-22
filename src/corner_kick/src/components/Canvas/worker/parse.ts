import { ILayer } from 'SRC/types';
import { IParsedMessage } from '../type';

export const parseMessage = (layer: ILayer, message: any) => {
    const { parseInfo } = layer;

    const x = parseInfo.x || 0;
    const y = parseInfo.y || 0;

    const count =
        typeof parseInfo.count === 'function'
            ? parseInfo.count(message)
            : parseInfo.count;

    const parsedMessages: IParsedMessage[] = [];

    for (let i = 0; i < count; i++) {
        const parsedMessage = {
            x: typeof x === 'function' ? x(message, i) : x,
            y: typeof y === 'function' ? y(message, i) : y,
        };

        parsedMessages.push(parsedMessage);
    }

    return parsedMessages;
};
