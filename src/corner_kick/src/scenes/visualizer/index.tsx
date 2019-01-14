import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { SidebarPanels } from 'SRC/components/SidebarPanels';
import { Panel } from 'SRC/components/SidebarPanels/Panel';
import { ILayer, IRootState } from 'SRC/types';

import { actions, RootAction } from 'SRC/store';
import { Layers } from './Layers';
import { View } from './View';

const mapStateToProps = (state: IRootState) => ({
    layerOrder: state.visualizer.layerOrder,
    layers: state.visualizer.layers,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
        {
            changeLayerVisibility: actions.visualizer.changeVisibility,
            changeOrder: actions.visualizer.changeOrder,
        },
        dispatch,
    );

interface IVisualizerProps {
    layerOrder: string[];
    layers: { [K: string]: ILayer };
    changeLayerVisibility: typeof actions.visualizer.changeVisibility;
    changeOrder: typeof actions.visualizer.changeOrder;
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
                            onOrderChanged={this.onOrderChanged}
                        />
                    </Panel>
                    <Panel title="AI Controls" />
                    <Panel title="Game Status" disabled={true} />
                </SidebarPanels>
                <View layers={orderedLayers} />
            </>
        );
    }

    private onOrderChanged = (prevIndex: number, newIndex: number) => {
        this.props.changeOrder(prevIndex, newIndex);
    };

    private onLayerVisibilityChanged = (layer: ILayer) => {
        this.props.changeLayerVisibility(layer.topic, !layer.visible);
    };
}

export const Visualizer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(VisualizerInternal);
