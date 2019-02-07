import { ILayer } from './canvas';
import { IRosoutMessage } from './standardROSMessages';

/*
 * This file specifies the format of the application state
 */

/**
 * The application state
 */
export interface IRootState {
    ros: IROSState;
    console: IMessagesState;
    canvas: ICanvasState;
}

export interface ICanvasState {
    layers: { [key: string]: ILayer };
}

/**
 * The state object for ROS
 */
export interface IROSState {
    status: 'connected' | 'disconnected' | 'error';
    errorMessage: string;
}

/**
 * The messages state
 */
export interface IMessagesState {
    rosout: IRosoutMessage[];
}
