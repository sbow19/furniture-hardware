import styles from "./MarketingImages.module.scss";
import SliderCarousel from "@/components/carousel/slider-carousel/SliderCarousel"
import { StaticImageData } from "next/image";

/* MARKETiNG IMAGES */
import marketingOneImage from 'root/public/images/marketing_images/first_source.png'
import marketingTwoImage from 'root/public/images/marketing_images/second_source.jpg'

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

export default function MarketingImages() {
    return (
        <section className={styles.marketing_container}>
            <h3 className={styles.marketing_heading}>
                Marketing Images.
            </h3>
            <SliderCarousel 
                imageSet={imageSet}
            />
        </section>
    );
}
