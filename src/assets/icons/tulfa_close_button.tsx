

import React from 'react';

const TulfaCloseButton = ({
    height,
    width,
    onClick,
    className
}) => {
    return (
        <button
            onClick={onClick}
            className={className}
        >
            <svg width={width} height={height} viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_b_2735_6319)">
                    <rect x="0.335938" width="36" height="36" rx="18" fill="#2A266A" />
                    <path d="M24.3359 12L12.3359 24M12.3359 12L24.3359 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <filter id="filter0_b_2735_6319" x="-2.33073" y="-2.66667" width="41.3333" height="41.3333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.33333" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2735_6319" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2735_6319" result="shape" />
                    </filter>
                </defs>
            </svg>

        </button>
    )
}

export default TulfaCloseButton