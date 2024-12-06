'use client'
import styles from "./CtaTertiary.module.scss";
import Image from 'next/image';
import sofaImage from "../../assets/images/cta_tertiary/sofa.png";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'
import { useEffect } from "react";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const CtaTertiary: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    /**
     * For each SPAN element, check whether its in the viewport
     */

    useEffect(() => {
        // Select all the text groups
        const textGroups = document.querySelectorAll('.text-group');

        // Create an intersection observer
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    // When a text group enters the viewport, add 'highlight' class
                    if (entry.isIntersecting) {
                        entry.target.classList.add(`${styles.cta_content_paragraph_activated}`);
                    } else {
                        entry.target.classList.remove(`${styles.cta_content_paragraph_activated}`);
                    }
                });
            },
            {
                threshold: 1,
            },
        );

        // Observe each text group
        textGroups.forEach((group) => {
            observer.observe(group);
        });

        return
    });

    return (
        <motion.section className={styles.cta_container} ref={containerRef}>
            <div className={styles.cta_content}>
                <p className={styles.cta_content_paragraph}>
                    <span className='text-group'>Lorem ipsum dolor sit amet. </span>
                    <span className='text-group'>Quo odit atque ut architecto obcaecati rem </span>
                    <span className='text-group'>vitae tempore non asperiores consequatur ut! </span>
                </p>
            </div>
            <motion.div
                initial={{ y: -100, opacity: 0}}
                whileInView={{ x: 0, opacity: 1}}
                transition={{ duration: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                className={styles.cta_image_container}
            >
                <Image
                    src={sofaImage}
                    alt=''
                    className={styles.cta_image}
                />
            </motion.div>

        </motion.section>
    );
}

export default CtaTertiary
