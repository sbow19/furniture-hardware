import styles from "./AutomaticCarousel.module.scss";
import Image from 'next/image';
import { StaticImageData } from "next/image";

type ImageSet = {
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor?: "dark" | "light"
    },
    order: Array<string>
}

// Define AutomaticCarousel component that accepts `imageSet` as a prop
interface AutomaticCarouselProps {
    imageSet: ImageSet;
}

const AutomaticCarousel: React.FC<AutomaticCarouselProps> = ({ imageSet }) => {
    return (
        <div className={`${styles.carousel_container}`}>
            {
                imageSet.order.map((imageName: string, index:number)=>{
                    return(
                        <Image
                            key={index}
                            src={imageSet[imageName].imageData}
                            alt=''
                            className={styles.background_image}
                        />
                    )
                })
            }
        </div>
    );
}

export default AutomaticCarousel
