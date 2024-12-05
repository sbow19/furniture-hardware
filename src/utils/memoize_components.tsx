import React, { memo } from 'react';

/**
 * @params 
 */
const memoizeComponents = (components: Array<React.FC>): Array<React.ExoticComponent> => {

    const memoizedComponents: Array<React.ExoticComponent> = [];
    components.forEach((comp: React.FC) => {
        memoizedComponents.push(memo(comp));
    });

    return memoizedComponents;
};

export {
    memoizeComponents
};