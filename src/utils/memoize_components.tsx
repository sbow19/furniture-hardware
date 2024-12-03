import React, { memo } from 'react';

/**
 * @params 
 */
const memoizeComponents = (components: {
    [key: string]: React.FC;
}): {
    [key: string]: React.ExoticComponent;
} => {

    Object.keys(components).forEach((key: string) => {
        components[key] = memo(components[key]);
    });

    return components;
};

export {
    memoizeComponents
};