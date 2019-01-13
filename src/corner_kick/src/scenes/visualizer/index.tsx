import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Portal } from 'SRC/components/Portal';
import { SidebarPanels } from 'SRC/components/SidebarPanels';
import { Panel } from 'SRC/components/SidebarPanels/Panel';
import { ILayer, IRootState } from 'SRC/types';

import { actions, RootAction } from 'SRC/store';
import { Layers } from './Layers';

const mapStateToProps = (state: IRootState) => ({
    layerOrder: state.visualizer.layerOrder,
    layers: state.visualizer.layers,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            changeLayerVisibility: actions.visualizer.changeVisibility,
        },
        dispatch,
    );

interface IVisualizerProps {
    layerOrder: string[];
    layers: { [K: string]: ILayer };
    changeLayerVisibility: typeof actions.visualizer.changeVisibility;
}

export class VisualizerInternal extends React.Component<IVisualizerProps> {
    public render() {
        const { layerOrder, layers } = this.props;

        const orderedLayers = layerOrder.map((topic) => layers[topic]);
        return (
            <>
                <SidebarPanels>
                    <Panel title="Layers">
                        <Layers
                            layers={orderedLayers}
                            onVisibilityChanged={this.onLayerVisibilityChanged}
                        />
                    </Panel>
                    <Panel title="AI Controls" />
                    <Panel title="Game Status" disabled={true} />
                </SidebarPanels>
                <Portal to="main">This is the visualizer</Portal>
            </>
        );
    }

    private onLayerVisibilityChanged = (layer: ILayer) => {
        this.props.changeLayerVisibility(layer.topic, !layer.visible);
    };
}

export const Visualizer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(VisualizerInternal);
