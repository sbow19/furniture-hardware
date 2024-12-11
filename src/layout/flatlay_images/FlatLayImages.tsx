'use client'
import CallOut from "@/components/call_out/CallOut";
import AutomaticCarousel from "@/components/carousel/automatic_carousel/AutomaticCarousel";
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion'
import useAutoLoad from "@/hooks/use_autoload";
import { useEffect, useState, useRef } from "react";

/* FLATLAY IMAGES */
import flatlayOneImage from '../../assets/images/flatlay_images/FlatLay1.jpg'
import flatlayTwoImage from '../../assets/images/flatlay_images/FlatLay2.jpg'
import flatlayThreeImage from '../../assets/images/flatlay_images/scene1.png'
import flatlayFourImage from '../../assets/images/flatlay_images/scene2.png'

import styles from "./FlatLayImages.module.scss";

type ImageSet = {
    order: string[];
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor?: "dark" | "light"
    };
}

const imageSet: ImageSet = {
    order: [
        "flatlayFour",
        "flatlayTwo",
        "flatlayThree",
        "flatlayOne"
    ],
    flatlayOne: {
        imageName: "flaylayOne",
        imageData: flatlayOneImage,
    },
    flatlayTwo: {
        imageName: "flatlayTwo",
        imageData: flatlayTwoImage
    },
    flatlayThree: {
        imageName: "flatlayThree",
        imageData: flatlayThreeImage
    },
    flatlayFour: {
        imageName: "flaylayFour",
        imageData: flatlayFourImage
    }
}
const FlatLayImages: React.FC<LayoutProps> = ({
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
            elementRef.current.removeEventListener("wheel", myListener);
        }

    }, [isInView]); // Dependency array includes handleChangeSlide to ensure it's fresh if it changes
    return (
        <div ref={elementRef}>
            <motion.section className={styles.flatlay_container} ref={containerRef}>
                <CallOut heading="Flat Lay Images" calloutStyleType={1}/>
                <AutomaticCarousel
                    imageSet={imageSet}
                />
                <CallOut paragraph="Create mood boards to help interior designers select elements to enhance their projects." modifier="mw-563" />
            </motion.section>
        </div>
    );
}

export default FlatLayImages;
