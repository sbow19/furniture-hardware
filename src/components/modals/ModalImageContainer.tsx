'use client'
import styles from './modal_container.module.scss';
import useWindowSize from '@/hooks/use_window_size';
import { memo, useMemo } from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion'

const ModalImageContainer = memo(({ imageSet, imageNo }) => {

    const viewportSize = useWindowSize();

    const memoizedComponents = [];

    let rowNumber = 1;
    let columnNumber = 1;
    let columnSpan = 1;

    let imageIndex = 0;

    for (let i = 1; i < imageNo + 1; i++) {


        // Every third image occupies a full row, so we check when we move to next row
        if (i >= 3) {
            // Every third image starts a new row
            if (i % 3 === 0 || i % 3 === 1) {
                rowNumber++; // Move to the next row after every third image
            }
        }



        // Every image in a 5 image cycle occupies  particular column start and column span
        const checkColumnValue = (i + 5) % 6;

        switch (checkColumnValue) {
            case 0:
                columnNumber = 1;
                columnSpan = 7;
                break
            case 1:
                columnNumber = 8;
                columnSpan = 5
                break
            case 2:
                columnNumber = 1;
                columnSpan = 12;
                break
            case 3:
                columnNumber = 1;
                columnSpan = 5;
                break
            case 4:
                columnNumber = 6;
                columnSpan = 7;
                break
            case 5:
                columnNumber = 1;
                columnSpan = 12;
                break
            default:
                break

        }


        memoizedComponents.push(
            <div
                key={i}
                style={{
                    gridArea: `${rowNumber} / ${columnNumber} / span 1 / span ${columnSpan}`,
                }}
                className={styles.modal_indiv_image_container}
            >
                <Image
                    alt=""
                    src={imageSet["top"][imageIndex]}
                    className={styles.modal_indiv_image}
                    
                />

                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out', // Fade in/out transition for the overlay
                        borderRadius: '8px',
                        zIndex: 10,
                    }}
                    className={styles.modal_focus_overlay}
                    whileHover={{
                        opacity: 1
                    }}
                    
                />

            </div>
        )

        imageIndex = Math.floor(Math.random() * imageSet["top"].length);




    }

    return (
        <div
            className={styles.modal_image_container}
            style={{
                gridTemplateRows: `repeat(${Math.ceil(imageNo / 1.5)}, ${viewportSize.height / (viewportSize.height > 960 ? 1 : 2)}px)`,
            }}
        >
            {memoizedComponents}
        </div>
    )
})

ModalImageContainer.displayName = "ModalImageContainer"

export default ModalImageContainer;