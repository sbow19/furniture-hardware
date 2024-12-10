'use client'
import CallOut from "@/components/call_out/CallOut";
import Image from 'next/image';
import groupShotBackgroundImage from '../../assets/images/group_shots/Firefly 20240929230829.png'
import basketMask from '../../assets/images/group_shots/Basket/Product 44_120cm copy.png'
import benchMask from '../../assets/images/group_shots/Bench/bench_01.tif'
import { motion } from 'framer-motion'
import useAutoLoad from "@/hooks/use_autoload";
import { useEffect, useState, useRef } from "react";

import styles from "./GroupShots.module.scss";
// import GroupCarousel from "@/components/carousel/group_carousel/GroupCarousel";

/**
 * Lay images over images i background
 *  
 */


const GroupShots: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {

    // Detect whenuser scrolls into range
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
            // Event handler logic her

            if (!isInView) {
                return
            }
            if (e.deltaY > 0) {
                // Scrolled down
                handleChangeSlide(1);

            } else {
                // Scrolled up
                handleChangeSlide(-1);
            }
        };

        if (isInView) {
            // Apply the event listener after a 2-second delay
            elementRef.current.addEventListener("wheel", myListener);
        } else {
            console.log(isInView)
            elementRef.current.removeEventListener("wheel", myListener);
        }

    }, [isInView]); // Dependency array includes handleChangeSlide to ensure it's fresh if it changes

    return (
        <div ref={elementRef}>
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
        </div>
    );
}

export default GroupShots;
