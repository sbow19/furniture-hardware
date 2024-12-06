'use client'
import PopUp from "@/components/pop_up/PopUp";
import Button from '@/components/button/Button'
import Image from 'next/image';
import backgroundImageRender from "../../../public/images/functionality_images/Renders/White Bakground render.jpg"
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'
import styles from "./FunctionalityImages.module.scss";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const FunctionalityImages:React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.functionality_container} ref={containerRef}>
            <div className={styles.functionality_content}>
                <h3 className={styles.functionality_content_heading}>
                    Functionality Images
                </h3>
                <Image
                    src={backgroundImageRender}
                    className={styles.functionality_render}
                    alt=''
                    priority
                />

                <div
                    className={styles.functionality_button}
                >
                    <Button 
                        text="Take a closer look" 
                        modifier="p-color" 
                        buttonType={2}
                        onClick={()=>{}}
                    /> 
                </div>
                
                {/* <PopUp
                    className=""
                /> */}
                
            </div>
        </motion.section>
    );
}

export default FunctionalityImages;
