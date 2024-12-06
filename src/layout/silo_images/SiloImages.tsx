'use client'
import Button from "@/components/button/Button";
import Image from 'next/image';
import chairImage from "root/public/images/silo_images/chair_drive.png";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'

import styles from "./SiloImages.module.scss";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: ()=>void
}

const SiloImages:React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
})=> {

    // Detect whenuser scrolls into range
	const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    console.log("Silo rendered")

    return (
        <motion.section className={styles.silo_container} ref={containerRef}>
            <div className={styles.silo_content}>
                <h3 className={styles.silo_content_heading}>
                    Product Silos
                </h3>
                <Button
                    text="Take a closer look" modifier="p-color"
                    onClick={() => { }}
                    buttonType={2}
                />
            </div>
            <Image
                src={chairImage}
                placeholder='blur'
                alt=''
                className={styles.silo_image}
            />
        </motion.section>
    );
}

export default SiloImages;