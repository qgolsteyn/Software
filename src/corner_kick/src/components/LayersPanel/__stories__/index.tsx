/*
 * This file creates a story for the LayersPanel
 */

import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { StorybookStage } from 'SRC/components/StorybookStage';
import { LayersPanel } from '..';

const stories = storiesOf('Layers Panel', module);

/**
 * Story describing a LayerPanel with some layers defined
 */
stories.add('with layers', () => (
    <StorybookStage width="300px">
        <LayersPanel
            layers={[
                {
                    layer_name: 'Friendly Robots',
                    shapes: [],
                    visible: true,
                },
                {
                    layer_name: 'Enemy Robots',
                    shapes: [],
                    visible: false,
                },
                {
                    layer_name: 'Ball',
                    shapes: [],
                    visible: true,
                },
                {
                    layer_name: 'Field',
                    shapes: [],
                    visible: true,
                },
            ]}
        />
    </StorybookStage>
));

/**
 * Story defining a LayerPanel with no layers — an empty state
 */
stories.add('with empty state', () => (
    <StorybookStage width="300px">
        <LayersPanel layers={[]} />
    </StorybookStage>
));
