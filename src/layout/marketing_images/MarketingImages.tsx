'use client'
import styles from "./MarketingImages.module.scss";
import SliderCarousel from "@/components/carousel/slider-carousel/SliderCarousel"
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion'
import useAutoScroll from "@/hooks/use_autoscroll";

/* MARKETiNG IMAGES */
import marketingOneImage from 'root/public/images/marketing_images/first_source.png'
import marketingTwoImage from 'root/public/images/marketing_images/second_source.jpg'

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

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
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);
    return (
        <motion.section className={styles.marketing_container} ref={containerRef}>
            <h3 className={styles.marketing_heading}>
                Marketing Images.
            </h3>
            <SliderCarousel 
                imageSet={imageSet}
            />
        </motion.section>
    );
}

export default MarketingImages;
