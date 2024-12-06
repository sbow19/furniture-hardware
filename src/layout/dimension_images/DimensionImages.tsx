'use client'
import CallOut from "@/components/call_out/CallOut";
import UpDownCarousel from "@/components/carousel/updown_carousel/UpDownCarousel";
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion'
import useAutoScroll from "@/hooks/use_autoscroll";

/* DIMENSION IMAGES */
import handbookSizeImage from '/images/dimension_images/sizes.png'
import lightChairSizeImage from '/images/dimension_images/2.png'
import sofaSizeImage from '/images/dimension_images/3.png'
import cushionSizeImage from '/images/dimension_images/4.png'
import kitchenSizeImage from '/images/dimension_images/5.png'
import darkChairSizeImage from '/images/dimension_images/6.png'

type ImageSet = {
    order: string[];
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor: "dark" | "light"
    };
}

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
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
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);
    return (
        <motion.section className={styles.dimension_container} ref={containerRef}>
            <CallOut heading="Dimension Images" />
            <UpDownCarousel imageSet={imageSet} />
            <CallOut paragraph="Give your customers a clear view of how you furniture fits into their
            space with precise dimensions and scale indicators." />
        </motion.section>
    );
}

export default DimensionImages;
