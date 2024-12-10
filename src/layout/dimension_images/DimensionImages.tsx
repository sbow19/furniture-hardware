'use client'
import CallOut from "@/components/call_out/CallOut";
import UpDownCarousel from "@/components/carousel/updown_carousel/UpDownCarousel";
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion'
import useAutoLoad from "@/hooks/use_autoload";
import { useEffect, useRef, useState } from "react";

/* DIMENSION IMAGES */
import handbookSizeImage from '../../assets/images/dimension_images/1.png'
import lightChairSizeImage from '../../assets/images/dimension_images/2.png'
import sofaSizeImage from '../../assets/images/dimension_images/3.png'
import cushionSizeImage from '../../assets/images/dimension_images/4.png'
import kitchenSizeImage from '../../assets/images/dimension_images/5.png'
import darkChairSizeImage from '../../assets/images/dimension_images/6.png'

type ImageSet = {
    order: string[];
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor: "dark" | "light"
    };
}

const imageSet: ImageSet = {
    order: [
        "handbook",
        "lightChair",
        "sofaSize",
        "cushionSize",
        "kitchenSize",
        "darkChair"
    ],
    handbook: {
        imageData: handbookSizeImage,
        imageName: "handbook",
        buttonColor: "light"
    },
    lightChair: {
        imageData: lightChairSizeImage,
        imageName: "lightChair",
        buttonColor: "dark"
    },
    sofaSize: {
        imageData: sofaSizeImage,
        imageName: "sofaSize",
        buttonColor: "dark"
    },
    cushionSize: {
        imageData: cushionSizeImage,
        imageName: "cushionSize",
        buttonColor: "light"
    },
    kitchenSize: {
        imageData: kitchenSizeImage,
        imageName: "kitchenSize",
        buttonColor: "light"
    },
    darkChair: {
        imageData: darkChairSizeImage,
        imageName: "darkChair",
        buttonColor: "light"
    }
}

import styles from "./DimensionImages.module.scss";
const DimensionImages: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.1);

    // Detect when the user is in viewport
    const [isInView, setIsInView] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        // IntersectionObserver logic to track if element is in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting); // Set inView status based on intersection
            },
            { threshold: 0.1 } // Trigger when 10% of the element is in view
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
            <motion.section className={styles.dimension_container} ref={containerRef}>
                <CallOut heading="Dimension Images" />
                <UpDownCarousel imageSet={imageSet} />
                <CallOut paragraph="Give your customers a clear view of how you furniture fits into their
            space with precise dimensions and scale indicators." />
            </motion.section>
        </div>
    );
}

export default DimensionImages;
