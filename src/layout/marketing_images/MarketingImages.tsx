'use client'
import styles from "./MarketingImages.module.scss";
import SliderCarousel from "@/components/carousel/slider-carousel/SliderCarousel"
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion'
import useAutoLoad from "@/hooks/use_autoload";
import { useEffect, useRef, useState } from "react";

/* MARKETiNG IMAGES */
import marketingOneImage from '../../assets/images/marketing_images/first_source.png'
import marketingTwoImage from '../../assets/images/marketing_images/second_source.jpg'

type ImageSet = {
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor?: "dark" | "light"
    },
    order: Array<string>
}

const imageSet: ImageSet = {
    order: [
        "marketingOne",
        "marketingTwo"
    ],
    marketingOne: {
        imageName: "marketingOne",
        imageData: marketingOneImage
    },
    marketingTwo: {
        imageName: "marketingTwo",
        imageData: marketingTwoImage
    }
}

const MarketingImages: React.FC<LayoutProps> = ({
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
            <motion.section className={styles.marketing_container} ref={containerRef}>
                <h3 className={styles.marketing_heading}>
                    Marketing Images.
                </h3>
                <SliderCarousel
                    imageSet={imageSet}
                />
            </motion.section>
        </div>
    );
}

export default MarketingImages;
