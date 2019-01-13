import * as rosActions from './ros';
import * as settingsActions from './settings';
import * as visualizerActions from './visualizer';

import { ROSAction } from '../reducers/ros';
import { SettingsAction } from '../reducers/settings';
import { VisualizerActions } from '../reducers/visualizer';

export const actions = {
    ros: rosActions,
    settings: settingsActions,
    visualizer: visualizerActions,
};

// We combine all action types for convenient access throughout the application
export type RootAction = ROSAction | SettingsAction | VisualizerActions;
