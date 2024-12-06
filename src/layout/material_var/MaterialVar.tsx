'use client'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from 'next/image';
import styles from "./MaterialVar.module.scss";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'

/* KITCHEN ONDA MATERIAL VARIATIONS */
import kitchenCounterBlack from "/images/material_var/kitchen_onda_black.png"
import kitchenCounterBlue from "/images/material_var/kitchen_onda_blue.png"
import kitchenCounterGold from "/images/material_var/kitchen_onda_gold imperial.png"
import kitchenCounterGreen from "/images/material_var/kitchen_onda_green.png"
import kitchenCounterPearl from "/images/material_var/kitchen_onda_pearl royal.png"
import kitchenCounterRed from "/images/material_var/kitchen_onda_red.png"
import kitchenCounterWhite from "/images/material_var/kitchen_onda_white.png"
import kitchenCounterYellow from "/images/material_var/kitchen_onda_yellow.png"

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const MaterialVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
})=> {

     // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.material_container} ref={containerRef}>
             <Image
                    src={kitchenCounterYellow}
                    alt=''
                    className={styles.material_image}
                    priority
                />
            <div className={styles.material_content}>
                <span className={styles.material_content_span}>
                    Material Variation
                </span>
                <div className={styles.material_content_arrows}>
                    <button className={styles.material_content_arrow_disabled}>
                        <MdKeyboardArrowLeft className={styles.material_content_arrow_icon} />
                    </button>
                    <button>
                        <MdKeyboardArrowRight className={styles.material_content_arrow_icon} />
                    </button>
                </div>
            </div>
        </motion.section>
    );
}

export default MaterialVar;