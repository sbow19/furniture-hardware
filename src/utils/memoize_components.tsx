import React, { memo } from 'react';

/**
 * @params 
 */
const memoizeComponents = (components: [Array<React.FC>, number]): Array<[React.ExoticComponent, number]> => {

    const memoizedComponents: Array<[React.ExoticComponent, number]>= [];
    components.forEach((comp: [React.FC, number]) => {
        
        const memoizedComponent = memo(comp[0])
        memoizedComponents.push([memoizedComponent, comp[1]]);
    });

    return memoizedComponents;
};

export {
    memoizeComponents
};