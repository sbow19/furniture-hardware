'use client'
import styles from "./CtaTertiary.module.scss";
import Image from 'next/image';
import sofaImage from "/images/cta_tertiary/sofa.png";
import useAutoScroll from "@/hooks/use_autoscroll";
import {motion} from 'framer-motion'

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: ()=>void
}

const CtaTertiary: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
})=> {

    // Detect whenuser scrolls into range
	const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.cta_container} ref={containerRef}>
            <div className={styles.cta_content}>
                <p className={styles.cta_content_paragraph}>
                    <span className={styles.cta_content_paragraph_disabled}>Lorem ipsum dolor sit amet. </span>
                    <span className={styles.cta_content_paragraph_disabled}>Quo odit atque ut architecto obcaecati rem </span>
                    <span className={styles.cta_content_paragraph_activated}>vitae tempore non asperiores consequatur ut! </span>
                </p>
            </div>
            <Image 
                src={sofaImage}
                placeholder='blur'
                alt=''
                className={styles.cta_image}
            />
        </motion.section>
    );
}

export default CtaTertiary
