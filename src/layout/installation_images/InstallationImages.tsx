import CallOut from "@/components/call_out/CallOut";
import UpDownCarousel from "@/components/carousel/updown_carousel/UpDownCarousel";
import { StaticImageData } from "next/image";

/* INSTALLATION IMAGES */
import handbookSizeImage from 'root/public/images/installation_images/handbook.png'

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

export default function InstallationImages() {
    return (
        <section className={styles.installation_container}>
            <CallOut heading="Installation Images" />
                <UpDownCarousel imageSet={imageSet}/>
            <CallOut paragraph="Guide your customers with clear, step-by-step images for assembling and setting up the furniture." modifier="mw-623" />
        </section>
    );
}
