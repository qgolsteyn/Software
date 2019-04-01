/*
 * This file defines the default parameters of the application
 */

import { IThemeProvider } from 'SRC/types';

// tslint:disable:object-literal-sort-keys
/**
 * Object defining the theme of the application
 */
export const theme: IThemeProvider = {
    // This is the application's color palette. Colors needs
    // to be strings as this is what our CSS code accepts.
    // Some of those attributes define color for a purpose
    // (`fg` defines the color for a foreground elements - like text)
    // while others define shades of a particular color (red defines the
    // shade of red we use)
    colors: {
        fg: '#24292e',
        bg: '#fafbfc',
        accent: '#00bbec',
        panel: '#ffffff',
        border: '#e1e4e8',
        selected: '#F1F2F3',
        subdued: '#6a737d',
        success: '#22863a',
        error: '#cd3131',
        warn: '#cd9731',
        info: '#316bcd',
        debug: '#800080',
        red: '#cd3131',
        orange: '#ff8f40',
        yellow: '#ffee99',
        green: '#22863a',
        cyan: '#39bae6',
        blue: '#005cc5',
        purple: '#d4bfff',
    },
};
