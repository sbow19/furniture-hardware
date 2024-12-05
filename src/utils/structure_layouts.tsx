/* Take in array of layouts and output object to keep track of rendered layouts */

import React from "react";

type LayoutSet = {
    order: number[];
    [key: string]: {
        layoutName: number
        layoutRendered: boolean
        component: React.FC | React.ExoticComponent
    };
}

const structureLayouts = (layoutCollection: Array<React.FC | React.ExoticComponent>): LayoutSet =>{

    const layoutStructure: LayoutSet = {
        order: []        
    };

    for(let i = 0; i < layoutCollection.length; i++){
        layoutStructure.order.push(i);
        layoutStructure[i] = {
            layoutName: i,
            layoutRendered: false,
            component: layoutCollection[i]
        }
    }

    return layoutStructure;
};

export default structureLayouts;