import styles from "./SliderCarousel.module.scss";
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

// Define SliderCarousel component that accepts `imageSet` as a prop
interface SliderCarouselProps {
    imageSet: ImageSet;
}

const SliderCarousel: React.FC<SliderCarouselProps> = ({ imageSet }) => {
    return (
        <div className={`${styles.carousel_container}`}>
            {
                imageSet.order.map((imageName: string, index:number)=>{
                    return(
                        <div
                            key={index}
                            className={styles.slider_image_container}
                        >
                            <Image
                                
                                src={imageSet[imageName].imageData}
                                alt=''
                                className={styles.slider_carousel_image}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default SliderCarousel
