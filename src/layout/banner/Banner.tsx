'use client'
import styles from "./Banner.module.scss";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'
import VideoPlayer from "@/components/video/VideoPlayer";
import CtaPrimary from "@/layout/cta_primary/CtaPrimary";


type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const Banner: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {

    // Detect when user scrolls into range
    const containerRef = useAutoScroll(layoutName, null);

    return (
        <motion.section
            className={styles.banner_container}
            data-testid="tulfa-sofa-container"
            ref={containerRef}
            
        >
            <CtaPrimary
                handleLayoutLoad={() => {
                    handleLayoutLoad(layoutName)
                }}
            />
            <VideoPlayer
                src="/videos/banner/sofa.mp4"
                type="video/mp4"
                altText=''
            />

        </motion.section>
    );
}

export default Banner;
