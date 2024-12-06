'use client'
import CallOut from "@/components/call_out/CallOut";
import Image from 'next/image';
import groupShotBackgroundImage from '../../../public/images/group_shots/Firefly 20240929230829.png'
import basketMask from '../../../public/images/group_shots/Basket/Product 44_120cm copy.png'
import benchMask from '../../../public/images/group_shots/Bench/bench_01.tif'
import { motion } from 'framer-motion'
import useAutoScroll from "@/hooks/use_autoscroll";

import styles from "./GroupShots.module.scss";
// import GroupCarousel from "@/components/carousel/group_carousel/GroupCarousel";

/**
 * Lay images over images i background
 *  
 */

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}


const GroupShots: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.group_container} ref={containerRef}>
            <CallOut heading="Group Shots" />
            {/* <GroupCarousel /> */}
            <div
                className={styles.group_background_container}
            >
                <Image
                    src={groupShotBackgroundImage}
                    alt=''
                    priority
                    className={styles.group_background}
                />

                {/* MASKING IMAGES */}
                <Image
                    src={basketMask}
                    alt=''
                    className={styles.basket_mask}
                />
                {/* <Image
                    src={benchMask}
                    alt=''
                    className={styles.bench_mask}
                    width={2000}
                    height={2000}
                /> */}
                <div className={styles.mask_test}></div>


            </div>
            <CallOut paragraph="Let your customers see the meticulous design, premium materials, and the skill that goes into every detail— from the inside out." modifier="mw-623" />
        </motion.section>
    );
}

export default GroupShots;
