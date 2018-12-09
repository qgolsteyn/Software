/**
 * @fileoverview Typings file for the react-panelgroup library
 * Taken from react-panelgroup documentation: https://github.com/DanFessler/react-panelgroup
 */

declare module 'react-panelgroup' {
    export interface PanelWidth {
        size?: number,
        minSize?: number,
        resize?: "fixed" | "dynamic" | "stretch",
        snap?: string[],
    }
    
    interface PanelGroupProps {
        spacing?: number,
        borderColor?: string,
        panelColor?: string,
        direction?: "row" | "column",
        panelWidths?: Array<PanelWidth|null>,
        onUpdate?: (data: PanelWidth) => void;
    }

    export default class PanelGroup extends React.Component<PanelGroupProps, any> {}
}