/*
 * This file creates an example story for Storybook
 */

import { color, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { StorybookStage } from 'SRC/components/StorybookStage';

import { Canvas } from '..';

const stories = storiesOf('Shape Canvas', module);

const dimenOptions = {
    max: 10,
    min: 0,
    range: true,
    step: 0.5,
};

const thetaOptions = {
    max: Math.PI + 0.1,
    min: -Math.PI,
    range: true,
    step: Math.PI / 4,
};

const weightOptions = {
    max: 1,
    min: 0,
    range: true,
    step: 0.05,
};

stories.add('with arc', () => {
    const fixture = [
        {
            name: 'Arc',
            shapes: [
                {
                    data: [
                        number('cx', 5, dimenOptions, 'dimensions'),
                        number('cy', 5, dimenOptions, 'dimensions'),
                        number('r', 1, dimenOptions, 'dimensions'),
                        number('thetaStart', 0, thetaOptions, 'dimensions'),
                        number('thetaEnd', Math.PI, thetaOptions, 'dimensions'),
                    ],
                    fill: color('fill', 'transparent', 'style'),
                    stroke: color('stroke', 'white', 'style'),
                    stroke_weight: number('stroke_weight', 0.05, weightOptions, 'style'),
                    type: 'arc',
                },
            ],
            visible: true,
        },
    ];

    return (
        <StorybookStage width="60%" height="80%">
            <Canvas layers={fixture} worldWidth={10} worldHeight={10} />
        </StorybookStage>
    );
});

stories.add('with ellipse', () => {
    const fixture = [
        {
            name: 'Rect',
            shapes: [
                {
                    data: [
                        number('x', 1, dimenOptions, 'dimensions'),
                        number('y', 1, dimenOptions, 'dimensions'),
                        number('width', 1, dimenOptions, 'dimensions'),
                        number('height', 1, dimenOptions, 'dimensions'),
                    ],
                    fill: color('fill', 'transparent', 'style'),
                    stroke: color('stroke', 'white', 'style'),
                    stroke_weight: number('stroke_weight', 0.05, weightOptions, 'style'),
                    type: 'rect',
                },
            ],
            visible: true,
        },
    ];

    return (
        <StorybookStage width="60%" height="80%">
            <Canvas layers={fixture} worldWidth={10} worldHeight={10} />
        </StorybookStage>
    );
});

stories.add('with rects', () => {
    const fixture = [
        {
            name: 'Rect',
            shapes: [
                {
                    data: [
                        number('x', 1, dimenOptions, 'dimensions'),
                        number('y', 1, dimenOptions, 'dimensions'),
                        number('width', 1, dimenOptions, 'dimensions'),
                        number('height', 1, dimenOptions, 'dimensions'),
                    ],
                    fill: color('fill', 'transparent', 'style'),
                    stroke: color('stroke', 'white', 'style'),
                    stroke_weight: number('stroke_weight', 0.05, weightOptions, 'style'),
                    type: 'rect',
                },
            ],
            visible: true,
        },
    ];

    return (
        <StorybookStage width="60%" height="80%">
            <Canvas layers={fixture} worldWidth={10} worldHeight={10} />
        </StorybookStage>
    );
});
