'use client'
import styles from "./Banner.module.scss";
import useAutoLoad from "@/hooks/use_autoload";
import { motion } from 'framer-motion'
import VideoPlayer from "@/components/video/VideoPlayer";
// import CtaPrimary from "@/layout/cta_primary/CtaPrimary";
// import { useEffect } from "react";


const Banner: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {

    // Loads next container when ready
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 1);

    // Trigger move to next slide programmatically??
    return (
        <div
        >
        <motion.section
            className={styles.banner_container}
            data-testid="tulfa-sofa-container"
            ref={containerRef}
        >
            {/* <CtaPrimary
                handleLayoutLoad={() => {
                    handleLayoutLoad(layoutName)
                }}
            /> */}
            <VideoPlayer
                src="/videos/banner/sofa.mp4"
                type="video/mp4"
                altText=''
                onVideoComplete={() => {
                    handleLayoutLoad(layoutName)
                    setTimeout(() => {
                        // Delay slide load
                        handleChangeSlide(1)
                    }, 2000)
                }}

            />

        </motion.section>
        </div>
    );
}

export default Banner;
