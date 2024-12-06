import CallOut from "@/components/call_out/CallOut";
import UpDownCarousel from "@/components/carousel/updown_carousel/UpDownCarousel";
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion'
import useAutoScroll from "@/hooks/use_autoscroll";


/* INSTALLATION IMAGES */
import handbookSizeImage from '/images/installation_images/handbook.png'

import styles from "./InstallationImages.module.scss";

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
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.installation_container} ref={containerRef}>
            <CallOut heading="Installation Images" />
            <UpDownCarousel imageSet={imageSet} />
            <CallOut paragraph="Guide your customers with clear, step-by-step images for assembling and setting up the furniture." modifier="mw-623" />
        </motion.section>
    );
}

export default InstallationImages;
