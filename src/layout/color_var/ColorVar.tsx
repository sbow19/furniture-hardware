'use client'
import styles from "./ColorVar.module.scss";
import Image from 'next/image';
import rightImageRed from "/images/color_var/right_drive.png";
import leftImageRed from "/images/color_var/left_drive.png";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const ColorVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.color_container} ref={containerRef}>
            <div className={styles.color_left}>
                <Image
                    src={leftImageRed}
                    placeholder='blur'
                    alt=''
                    className={styles.color_left_image}
                    priority
                />
            </div>
            <div className={styles.color_left_filter}>
                <button className={styles.color_left_filter_one}>
                    <div className={styles.first_semicircle} />
                </button>
                <button className={styles.color_left_filter_two}>
                    <div className={styles.second_semicircle} />
                </button>
                <button className={styles.color_left_filter_three}>
                    <div className={styles.third_semicircle} />
                </button>
                <button className={styles.color_left_filter_four}>
                    <div className={styles.fourth_semicircle} />
                </button>
                <button className={styles.color_left_filter_five}>
                    <div className={styles.fifth_semicircle} />
                </button>
            </div>
            <div className={styles.color_right}>
                <Image
                    src={rightImageRed}
                    placeholder='blur'
                    alt=''
                    className={styles.color_right_image}
                />
            </div>
        </motion.section>
    );
}

export default ColorVar;
