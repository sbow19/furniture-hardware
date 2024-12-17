'use client'
import styles from "./Banner.module.scss";
import useAutoLoad from "@/hooks/use_autoload";
import { motion } from 'framer-motion'
import VideoPlayer from "@/components/video/VideoPlayer";
// import CtaPrimary from "@/layout/cta_primary/CtaPrimary";
import { useEffect, useRef, useState } from "react";


const Banner: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {

    // Loads next container when ready
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.5);

    // Detect when the user is in viewport
    const [isInView, setIsInView] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        // IntersectionObserver logic to track if element is in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting); // Set inView status based on intersection
            },
            { threshold: 0.5 } // Trigger when 10% of the element is in view
        );

        if (elementRef.current) {
            observer.observe(elementRef.current); // Start observing the element
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current); // Clean up observer
            }
        };
    }, []);

    useEffect(() => {
        // Define the wheel event handler
        const myListener = (e) => {
            if (isInView) { // Check if the element is in view before handling scroll
                if (e.deltaY > 0) {
                    // Scrolled down
                    handleChangeSlide(1); // Call function to handle slide change (scroll down)
                } else {
                    // Scrolled up
                    handleChangeSlide(-1); // Call function to handle slide change (scroll up)
                }
            }
        };

        if (isInView) {
            // Apply the event listener after a 2-second delay
            elementRef.current.addEventListener("wheel", myListener);
        } else {
            elementRef.current.removeEventListener("wheel", myListener);
        }

    }, [isInView]); // Re-run the effect when `isInView` changes

    // Trigger move to next slide programmatically??
    return (
        <div
            ref={elementRef}
            style={{
                height: '100%',
                width: '100%'
            }}
        >
            <motion.section
                className={styles.banner_container}
                data-testid="tulfa-sofa-container"
                ref={containerRef}
            >
                <VideoPlayer
                    src="/videos/new_sofa.mp4"
                    type="video/mp4"
                    altText=''
                    loop={false}
                    onVideoComplete={() => {
                        // handleLayoutLoad(layoutName)
                        // setTimeout(() => {
                        //     // Delay slide load
                        //     handleChangeSlide(1)
                        // }, 2000)
                    }}

                />

            </motion.section>
        </div>
    );
}

export default Banner;
