/*
 * This file creates an example story for Storybook
 */

import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { StorybookStage } from 'SRC/components/StorybookStage';

import { Canvas } from '..';

import rect from './fixtures/rect.json';

const stories = storiesOf('Shape Canvas', module);

stories.add('with rects', () => (
    <StorybookStage width="60%" height="80%">
        <Canvas layers={rect} worldWidth={10} worldHeight={4.4} />
    </StorybookStage>
));
