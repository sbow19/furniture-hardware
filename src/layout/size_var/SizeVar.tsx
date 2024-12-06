'use client'
import styles from "./SizeVar.module.scss";
import Image from 'next/image';
import largeImage from "../../assets/images/size_var/large_drive.png";
import mediumImage from "../../assets/images/size_var/medium_drive.png";
import smallImage from "../../assets/images/size_var/small_drive.png";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const SizeVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.size_container} ref={containerRef}>
            <div className={styles.size_group}>
                <div className={styles.size_group_content}>
                    <span className={styles.size_group_content_span_large}>L</span>
                    <motion.div
                        initial={{ y: 100, opacity: 0}}
                        whileInView={{ y: 0, opacity: 1}}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true, amount: 0.75 }}
                    >
                        <Image
                            src={largeImage}
                            placeholder='blur'
                            alt=''
                            className={styles.size_group_content_image_large}
                            priority
                        />
                    </motion.div>
                </div>
                <div className={styles.size_group_content}>
                    <span className={styles.size_group_content_span_medium}>M</span>
                    <motion.div
                        initial={{ y: 100, opacity: 0}}
                        whileInView={{ y: 0, opacity: 1}}
                        transition={{ duration: 1, delay: 0.75 }}
                        viewport={{ once: true, amount: 0.75 }}
                    >
                        <Image
                            src={mediumImage}
                            placeholder='blur'
                            alt=''
                            className={styles.size_group_content_image_medium}

                        />
                    </motion.div>
                </div>
                <div className={styles.size_group_content}>
                    <span className={styles.size_group_content_span_small}>S</span>
                    <motion.div
                        initial={{ y: 100, opacity: 0}}
                        whileInView={{ y: 0, opacity: 1}}
                        transition={{ duration: 1, delay: 1 }}
                        viewport={{ once: true, amount: 0.75 }}
                    >
                        <Image
                            src={smallImage}
                            placeholder='blur'
                            alt=''
                            
                        />
                    </motion.div>
                </div>
            </div>
            <span className={styles.size_span}>
                Product Size Variation
            </span>
        </motion.section>
    );
}

export default SizeVar
