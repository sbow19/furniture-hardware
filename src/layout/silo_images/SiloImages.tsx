'use client'
import Button from "@/components/button/Button";
import Image from 'next/image';
import chairImage from "../../assets/images/silo_images/chair_drive.png";
import useAutoLoad from "@/hooks/use_autoload";
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react";

import styles from "./SiloImages.module.scss";

const SiloImages: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 1);

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
        const myListener = (e) => {
            // Event handler logic here
            if (isInView) {
                if (e.deltaY > 0) {
                    // Scrolled down
                    console.log("down")
                    handleChangeSlide(1)
                } else {
                    // Scrolled up
                    console.log("up")
                    handleChangeSlide(-1)
                }
            };
        }

        

        if (isInView) {
            // Apply the event listener after a 2-second delay
            elementRef.current.addEventListener("wheel", myListener);
        } else {
            console.log(isInView)
            elementRef.current.removeEventListener("wheel", myListener);
        }


    }, [isInView]); // Dependency array includes handleChangeSlide to ensure it's fresh if it changes


    return (
        <div
            ref={elementRef}
        >
            <motion.section 
                className={styles.silo_container} ref={containerRef}>
                <div className={styles.silo_content}>
                    <h3 className={styles.silo_content_heading}>
                        Product Silos
                    </h3>
                    <Button
                        text="Take a closer look" modifier="p-color"
                        onClick={() => { }}
                        buttonType={2}
                    />
                </div>
                <Image
                    src={chairImage}
                    placeholder='blur'
                    alt=''
                    className={styles.silo_image}
                />
            </motion.section>
        </div>
    );
}

export default SiloImages;