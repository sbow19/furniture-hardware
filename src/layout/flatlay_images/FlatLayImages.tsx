'use client'
import CallOut from "@/components/call_out/CallOut";
import AutomaticCarousel from "@/components/carousel/automatic_carousel/AutomaticCarousel";
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion'
import useAutoScroll from "@/hooks/use_autoscroll";

/* FLATLAY IMAGES */
import flatlayOneImage from 'root/public/images/flatlay_images/FlatLay1.jpg'
import flatlayTwoImage from 'root/public/images/flatlay_images/FlatLay2.jpg'
import flatlayThreeImage from 'root/public/images/flatlay_images/scene1.png'
import flatlayFourImage from 'root/public/images/flatlay_images/scene2.png'

import styles from "./FlatLayImages.module.scss";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

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
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);
    return (
        <motion.section className={styles.flatlay_container} ref={containerRef}>
            <CallOut heading="Flat Lay Images" />
            <AutomaticCarousel
                imageSet={imageSet}
            />
            <CallOut paragraph="Create mood boards to help interior designers select elements to enhance their projects." modifier="mw-563" />
        </motion.section>
    );
}

export default FlatLayImages;
