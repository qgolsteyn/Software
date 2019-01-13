/**
 * This file specifies the format of the application state
 */

import { Setting } from './settings';
import { ILayer } from './visualizer';

/**
 * The application state
 */
export interface IRootState {
    ros: IROSState;
    settings: ISettingsState;
    visualizer: IVisualizerState;
}

/**
 * The state object for ROS
 */
export interface IROSState {
    status: 'connected' | 'disconnected' | 'error';
    errorMessage: string;
    nodes: string[];
    topics: string[];
    services: string[];
    params: string[];
}

/**
 * The state object for settings
 */
export type ISettingsState = { [K in Setting]: string };

/**
 * The state object for the visualizer
 */
export interface IVisualizerState {
    layerOrder: string[];
    layers: { [K: string]: ILayer };
}
