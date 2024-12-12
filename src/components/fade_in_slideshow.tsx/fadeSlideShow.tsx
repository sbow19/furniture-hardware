// import styles from "./AutomaticCarousel.module.scss";
import Image from 'next/image';
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion';
import { useEffect, useState, memo } from 'react';

type ImageSet = {
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
    },
    order: Array<string>
}

// Define AutomaticCarousel component that accepts `imageSet` as a prop
interface FadeInCarouselProps {
    imageSet: ImageSet;
}

const FadeInCarousel: React.FC<FadeInCarouselProps> = memo(({ imageSet }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setCurrentIndex(prev => {

                const imageSetLength = imageSet.order.length;

                if (prev + 1 > imageSetLength - 1) {
                    return 0
                } else {
                    return prev + 1
                }
            })
        }, 3000)
    }, [currentIndex])

    return (

        <>
            {
                imageSet.order.map((imageName: string, index: number) => {
                    return (
                        <motion.div
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: currentIndex === index ? 1 : 0
                            }}
                            key={index}
                            style={{
                                minHeight:'100vh',
                                maxWidth: '100vw',
                                position: 'absolute',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                transform: imageSet[imageName].overrideStyle.transform
                            }}
                        >
                            <Image
                               
                                src={imageSet[imageName].imageData}
                                alt=''
                                objectFit='contain'
                                objectPosition='0 0'

                            />
                        </motion.div>
                    )
                })
            }
        </>

    );
})

FadeInCarousel.displayName = "FadeInCarousel"

export default FadeInCarousel