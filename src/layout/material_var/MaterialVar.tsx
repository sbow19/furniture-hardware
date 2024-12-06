'use client'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import Image from 'next/image';
import styles from "./MaterialVar.module.scss";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion, AnimatePresence } from 'framer-motion'
import structureImages from "@/utils/structure_images";

/* KITCHEN ONDA MATERIAL VARIATIONS */
import kitchenCounterBlack from "../../assets/images/material_var/kitchen_onda_black.png"
import kitchenCounterBlue from "../../assets/images/material_var/kitchen_onda_blue.png"
import kitchenCounterGold from "../../assets/images/material_var/kitchen_onda_gold imperial.png"
import kitchenCounterGreen from "../../assets/images/material_var/kitchen_onda_green.png"
import kitchenCounterPearl from "../../assets/images/material_var/kitchen_onda_pearl royal.png"
import kitchenCounterRed from "../../assets/images/material_var/kitchen_onda_red.png"
import kitchenCounterWhite from "../../assets/images/material_var/kitchen_onda_white.png"
import kitchenCounterYellow from "../../assets/images/material_var/kitchen_onda_yellow.png"

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const imageDataset = structureImages([
    kitchenCounterBlack,
    kitchenCounterBlue,
    kitchenCounterGold,
    kitchenCounterGreen,
    kitchenCounterPearl,
    kitchenCounterRed,
    kitchenCounterWhite,
    kitchenCounterYellow
])

const MaterialVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    const [currentImage, setCurrentImage] = useState(0);

    const [carouselDirection, setCarouselDirection ] = useState(1) 

    const handleSetCurrentImage = (i: number) => {

        setCarouselDirection(prev=>{
            if(i > 0 && prev < 0){
                return i
            }else if (i < 0 && prev > 0){
                return i
            }else {
                return prev
            }
        })

        setCurrentImage(prev => {
            if (prev + i > imageDataset.order.length - 1) {
                return 0
            } else if (prev + i < 0) {
                return imageDataset.order.length - 1
            }
            return prev + i
        })
    
    }


    return (
        <motion.section className={styles.material_container} ref={containerRef}>
            <AnimatePresence
                mode='wait'
                initial={true}
            >
                <motion.div
                    initial={{ x: carouselDirection * -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }} // Use animate to trigger the opacity change right away
                    transition={
                        { 
                            duration: 0.2, 
                            delay: 0.4,
                            type: "spring",
                            stiffness: 300,  
                            damping: 25,     
                            mass: 1,         
                            velocity: 2
                        }
                    }     
                    exit={{ x: carouselDirection * 100, opacity: 0 }}
                    className={styles.image_container}
                    key={currentImage}
                >
                    <Image
                        src={imageDataset[currentImage].imageData}
                        alt=''
                        className={styles.material_image}
                        priority

                    />
                </motion.div>
            </AnimatePresence>
            <div className={styles.material_content}>
                <span className={styles.material_content_span}>
                    Material Variation
                </span>
                <div className={styles.material_content_arrows}>
                    <button className={styles.material_content_arrow_disabled}
                        onClick={() => handleSetCurrentImage(-1)}>
                        <MdKeyboardArrowLeft className={styles.material_content_arrow_icon} />
                    </button>
                    <button
                        onClick={() => handleSetCurrentImage(1)}
                    >
                        <MdKeyboardArrowRight className={styles.material_content_arrow_icon} />
                    </button>
                </div>
            </div>
        </motion.section>
    );
}

export default MaterialVar;