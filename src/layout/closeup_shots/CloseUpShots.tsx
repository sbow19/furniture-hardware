'use client'
import CallOut from "@/components/call_out/CallOut";
// import ShowCase from "@/components/showcase/ShowCase";
import Button from '@/components/button/Button'
import Image from 'next/image';
import backgroundImageRender from "../../assets/images/closeup_shots/nitavparikh_upholstery_cleaning_closeup_--v_6.1_a6bab072-4445-4e1c-b8b3-07bf91d176c8_1.png"
import useAutoLoad from "@/hooks/use_autoload";
import { motion } from 'framer-motion'
import styles from "./CloseUpShots.module.scss";
import { useEffect, useRef, useState } from "react";


const CloseUpShots: React.FC<LayoutProps> = ({
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
            <motion.section className={styles.close_container} ref={containerRef}>

                <CallOut heading="Close Up Shots" />
                <div className={styles.close_showcase}>
                    <Image
                        src={backgroundImageRender}
                        alt=''
                        priority
                        className={styles.close_background}
                    />

                </div>

                <div
                    className={styles.close_button_container}
                >
                    <Button
                        text="Take a closer look"
                        modifier="p-color"
                        buttonType={1}
                    />
                </div>
            </motion.section>
        </div>
    );
}

export default CloseUpShots;
