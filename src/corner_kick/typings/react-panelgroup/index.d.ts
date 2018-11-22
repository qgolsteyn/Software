/**
 * @fileoverview Typings file for the react-panelgroup library
 * Taken from react-panelgroup documentation: https://github.com/DanFessler/react-panelgroup
 */

declare module 'react-panelgroup' {
    
    interface PanelWidthObject {
        size: number,
        minSize: number,
        resize: "fixed" | "dynamic" | "stretch",
        snap?: string[],
    }
    
    export interface PanelGroupProps {
        spacing: number,
        borderColor?: string,
        panelColor?: string,
        direction: "row" | "column",
        panelWidths?: PanelWidthObject[],
        onUpdate(): PanelWidthObject;
    }


    let PanelGroup: React.ComponentClass<PanelGroupProps>;
    export default PanelGroup;
}