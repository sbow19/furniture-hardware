'use client'
import styles from "./SizeVar.module.scss";
import Image from 'next/image';
import largeImage from "root/public/images/size_var/large_drive.png";
import mediumImage from "root/public/images/size_var/medium_drive.png";
import smallImage from "root/public/images/size_var/small_drive.png";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: ()=>void
}

const SizeVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
})=> {

    // Detect whenuser scrolls into range
	const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.size_container} ref={containerRef}>
            <div className={styles.size_group}>
                <div className={styles.size_group_content}>
                    <span className={styles.size_group_content_span_large}>L</span>
                    <Image
                        src={largeImage}
                        placeholder='blur'
                        alt=''
                        className={styles.size_group_content_image_large}
                        priority
                    />
                </div>
                <div className={styles.size_group_content}>
                    <span className={styles.size_group_content_span_medium}>M</span>
                    <Image
                        src={mediumImage}
                        placeholder='blur'
                        alt=''
                        className={styles.size_group_content_image_medium}
                        
                    />
                </div>
                <div className={styles.size_group_content}>
                    <span className={styles.size_group_content_span_small}>S</span>
                    
                    <Image
                        src={smallImage}
                        placeholder='blur'
                        alt=''
                        className={styles.size_group_content_image_small}
                    />
                </div>
            </div>
            <span className={styles.size_span}>
                Product Size Variation
            </span>
        </motion.section>
    );
}

export default SizeVar
