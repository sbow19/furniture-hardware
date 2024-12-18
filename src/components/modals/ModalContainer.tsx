'use client'
import { motion, AnimatePresence } from 'framer-motion'
import BlurredBackdrop from '../backdrops/Blur';
import styles from './modal_container.module.scss';
import TulfaCloseButton from '@/assets/icons/tulfa_close_button';
import CallOut from '../call_out/CallOut';
import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image';

const ModalImageContainer = dynamic(() => import('./ModalImageContainer'), { ssr: false });

import ImageOne from "../../assets/images/lifestyle_scenes/placeholder/Kitchen.jpg";
import ImageTwo from "../../assets/images/lifestyle_scenes/placeholder/image_one.png";
import ImageThree from "../../assets/images/lifestyle_scenes/placeholder/image_two.png";


const ModalContainer = ({
    handleModalClose,
    isModalOpen
}) => {
    const selectionArray = [
        "All",
        "Applications",
        "Armchairs",
        "Bathrooms",
        "Bedrooms",
        "Cabinets",
        "Chairs",
        "Custom",
        "Indoor",
        "Holidays",
        "Kitchen",
        "Lighting",
        "Living Room",
        "Office",
        "Outdoors",
        "Prints",
        "Velvets",
        "Leathers",
        "Plains",
        "Embroidery"
    ]

    const [selectedIndex, setSelectedIndex] = useState(0);

    /* Images under different categories */
    type ImageSet = {
        [key: string]: Array<string>
    };

    const imageSet = useMemo(()=>{
        /* RETRIEVE IMAGE URLS FROM STORAGE LOCATION, BUT DONT LOAD YET */

        const dynamicImageSet = {
            top: [
                ImageOne,
                ImageThree,
                ImageTwo,
                
            ]
        }

        return dynamicImageSet;

    },[])

    return (
        <>
            <AnimatePresence
                initial={true}
            >
                <div
                    style={{
                        // overflow: "hidden",
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        height: "100vh",
                        width: "100vw"
                    }}
                >

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: isModalOpen ? 1 : 0,

                        }}

                        exit={{
                            opacity: 0,
                            transition: {
                                delay: 0
                            }
                        }}
                    >
                        <BlurredBackdrop onClick={handleModalClose} />

                    </motion.div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: "100vh"
                        }}
                        animate={{
                            opacity: isModalOpen ? 1 : 0,
                            y: 0,

                            transition: {
                                duration: 1,
                                delay: isModalOpen ? 1 : 0,  
                                opacity: { duration: 0.1, delay: isModalOpen ? 1.5 : 0 }, 
                                y: { duration: 1 }, 
                            }
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                opacity: { duration: 0.1 },
                                y: { duration: 0.1 }, 
                            }
                        }}
                    >
                        <TulfaCloseButton
                            height={40}
                            width={40}
                            onClick={handleModalClose}
                            className={styles.closeup_exit_button}

                        />
                    </motion.div>


                    <motion.div
                        className={styles.closeup_modal}
                        initial={{
                            opacity: 0,
                            y: "100vh"
                        }}
                        animate={{
                            opacity: isModalOpen ? 1 : 0,
                            y: isModalOpen ? 0 : "100vh"
                        }}
                        transition={{
                            duration: 1
                        }}
                        exit={{
                            opacity: 0,
                            y: "100vh"
                        }}
                        
                    >


                        <div className={styles.closeup_card}>

                            <div className={styles.closeup_modal_header}>

                                {/* HEADER IMAGE CONTAINER */}
                                <div
                                    className={styles.closeup_modal_header_image}
                                >
                                    <Image
                                        src={imageSet["top"][0]}
                                        priority
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "cover",
                                            borderRadius: 25
                                        }}
                                        alt=""
                                    />

                                </div>

                                {/* CALLOUT ? OPTIONS CONTAINER */}
                                <div
                                    className={styles.closeup_modal_header_banner}
                                >

                                    <CallOut
                                        calloutStyleType={1}
                                        paragraph="Showcase your furniture in thousands of beautifully designed room setups - without moving a thing or touching the camera."
                                        modifier="mw-623"
                                        overrideStyles={{
                                            height: "80%",
                                            padding: "50px 58px",
                                            fontSize: 40
                                        }}
                                    />

                                    <div
                                        className={styles.modal_button_container}
                                    >
                                        <div
                                            className={styles.modal_button_container_inner}
                                        >
                                            {
                                                selectionArray.map((selection, key) => {
                                                    return (
                                                        <button
                                                            style={{
                                                                backgroundColor: selectedIndex === key ? "" : ""
                                                            }}
                                                            key={key}
                                                            className={`${styles.modal_filter_button} disable_trigger_header_button`}
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                setSelectedIndex(key)
                                                            }}
                                                        >
                                                            {selection}
                                                        </button>)
                                                })
                                            }
                                        </div>
                                    </div>


                                </div>

                            </div>

                            {/*Image Container */}
                            {
                                isModalOpen && 
                                    <ModalImageContainer 
                                        imageSet={imageSet}
                                        imageNo={9}
                                    />
                            }


                        </div>
                    </motion.div>
                    </div>
            </AnimatePresence>
            
        </>
    );
}
export default ModalContainer;  