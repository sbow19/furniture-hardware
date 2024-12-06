'use client'
import styles from "./CtaSecondary.module.scss";
import Image from 'next/image';
import sofaImage from "/images/cta_secondary/sofa.png";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const CtaSecondary: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);


    return (
        <motion.section
            ref={containerRef}
            className={styles.cta_container}


        >
            <div className={styles.virtual_product_gradient_container}>
                <div className={styles.gradient_one} />
                <div className={styles.gradient_two} />
                <div className={styles.gradient_three} />
                <div className={styles.gradient_four} />
                <div className={styles.gradient_five} />
                <div className={styles.gradient_six} />
                <div className={styles.gradient_seven} />
            </div>
            <motion.h2
                className={styles.cta_heading}
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 1,
                    delay: 3
                }}>
                Virtual Product Photography
            </motion.h2>
            <motion.div
                initial={{
                    transform: "translateY(5%)",
                    opacity: 0
                }}
                animate={{
                    transform: "translateY(0px)",
                    opacity: 1
                }}
                transition={{
                    duration: 1,
                    delay: 4
                }}
                className={styles.image_container}
            >
                <Image
                    alt=''
                    src={sofaImage}
                    className={styles.cta_image}
                    sizes="100vw"
                />
            </motion.div>
        </motion.section>
    );
}

export default CtaSecondary;
