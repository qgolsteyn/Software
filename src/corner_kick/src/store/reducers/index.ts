/**
 * This file combines all reducers to be consumed by the Redux store
 */

import { combineReducers } from 'redux';

import rosReducer from './ros';
import settingsReducer from './settings';
import visualizerReducer from './visualizer';

/**
 * Combines all reducers. This is what the Redux accepts when being
 * initialized
 */
export default combineReducers({
    ros: rosReducer,
    settings: settingsReducer,
    visualizer: visualizerReducer,
});
