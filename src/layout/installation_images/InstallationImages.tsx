import CallOut from "@/components/call_out/CallOut";
import UpDownCarousel from "@/components/carousel/updown_carousel/UpDownCarousel";
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion'
import useAutoLoad from "@/hooks/use_autoload";
import { useEffect, useRef, useState } from "react";


/* INSTALLATION IMAGES */
import handbookSizeImage from '../../assets/images/installation_images/handbook.png'

import styles from "./InstallationImages.module.scss";

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
        "handbook"
    ],
    handbook: {
        imageName: "handbook",
        imageData: handbookSizeImage,
        buttonColor: "dark"
    }
}

const InstallationImages: React.FC<LayoutProps> = ({
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
            <motion.section className={styles.installation_container} ref={containerRef}>
                <CallOut heading="Installation Images" calloutStyleType={1} />
                <UpDownCarousel imageSet={imageSet} />
                <CallOut paragraph="Guide your customers with clear, step-by-step images for assembling and setting up the furniture." modifier="mw-623" />
            </motion.section>
        </div>
    );
}

export default InstallationImages;
