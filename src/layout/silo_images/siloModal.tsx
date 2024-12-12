import { motion } from 'framer-motion';
import { useState } from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image'
import styles from "./SiloImages.module.scss";
import useWindowSize from '@/hooks/use_window_size';
import TulfaCloseButton from "@/assets/icons/tulfa_close_button";

type ImageSet = {
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor?: "dark" | "light"
    },
    order: Array<string>
}

const SiloModal = ({ handleClose, modalOpen, imageSet }) => {
    // Animations based on state
    const dropIn = {
        hidden: {
            y: '100vh',
            opacity: 0
        },
        visible: {
            y: modalOpen ? '5vh' : '100vh',
            opacity: modalOpen ? 1 : 0,
            transition: {
                duration: 1, // Duration of the animation (in seconds)
                ease: 'easeInOut', // Easing function for smooth deceleration
                delay: 0.5
            },
        },
        exit: {
            opacity: 0,
            y: '100vh',
            transition: {
                duration: 1, // Duration of the animation (in seconds)
                ease: 'easeOut', // Easing function for smooth deceleration
            },
        },
    };

    const windowSize = useWindowSize();

    const [displacementValue, setDisplacementValue] = useState(windowSize.width / 4);

    

    const translateRight = () => {
        setDisplacementValue((prev) => prev + windowSize.width/4);
    };

    const translateLeft = () => {
        setDisplacementValue((prev) => prev - windowSize.width/4);
    };

    return (
        <>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
                className={styles.silo_modal_container}
            >
                <div
                    className={styles.silo_card_container}
                >
                    <TulfaCloseButton
                        onClick={handleClose}
                        className={`${styles.silo_handle_close} trigger_header_button`}
                    />
                    <div
                        className={styles.silo_text_container}
                    >
                        <p
                            className={styles.silo_text}
                        >
                            Ultra-high-definition images of your furniture shot from different
                            angles.
                        </p>
                    </div>

                    {/*CAROUSEL */}
                    <div
                        className={styles.silo_carousel_container}
                    >
                        

                        {imageSet.order.map((imageName: string, index) => {
                            index = index + 1;
                            return (
                                <motion.div
                                    key={index}
                                    style={{
                                        x: displacementValue,
                                        transition: 'ease-in-out 0.5s',
                                        height: '50vh',
                                        width: `${imageSet[imageName].width * 25}vw`,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        borderRadius: 40
                                    }}
                                    
                                >
                                    <Image

                                        src={imageSet[imageName].imageData}
                                        alt=''
                                        style={{
                                            objectFit: 'cover', // maintain aspect ratio but fill the container
                                            height: '100%', // ensure image fills height
                                            width: '100%', // ensure image fills width
                                            objectPosition:imageSet[imageName].overrideStyle.objectPosition , // center the image inside the container
                                            
                                          }}
                                        

                                    />
                                    
                                </motion.div>
                            );
                        })}
                        
                    </div>
                    <button
                            onClick={translateRight}
                            className={
                                `${styles.invisi_button_left} trigger_header_button`
                            }

                        />
                        <button
                            className={
                                `${styles.invisi_button_right} trigger_header_button`
                            }
                            onClick={translateLeft}
                        />
                </div>
            </motion.div>
        </>
    );
};

export default SiloModal;
