import * as React from 'react';

import { Portal, PortalLocation } from 'SRC/components/Portal';
import { Sidebar } from 'SRC/components/Sidebar';
import { Panel } from 'SRC/components/Sidebar/Panel';

import { Layers } from './Layers';

export class Visualizer extends React.Component {
    public render() {
        return (
            <>
                <Sidebar minPanelHeight={100} inactivePanelHeight={32}>
                    <Panel title="Layers">
                        <Layers
                            layers={[
                                {
                                    name: 'Friendly Robots',
                                    topic: 'friendly_robots',
                                    visible: true,
                                },
                                {
                                    name: 'Enemy Robots',
                                    topic: 'enemy_robots',
                                    visible: false,
                                },
                                {
                                    name: 'Ball',
                                    topic: 'ball',
                                    visible: true,
                                },
                                {
                                    name: 'Field',
                                    topic: 'field',
                                    visible: true,
                                },
                            ]}
                        />
                    </Panel>
                    <Panel title="AI Controls">Hello World</Panel>
                    <Panel title="Game Status" />
                    <Panel title="Game Status" />
                </Sidebar>
                <Portal portalLocation={PortalLocation.main}>
                    This is the visualizer
                </Portal>
            </>
        );
    }
}
