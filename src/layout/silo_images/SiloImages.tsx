'use client'
import Button from "@/components/button/Button";
import useAutoLoad from "@/hooks/use_autoload";
import { motion } from 'framer-motion'
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { StaticImageData } from "next/image";
import styles from "./SiloImages.module.scss";
import FadeInCarousel from "@/components/fade_in_slideshow.tsx/fadeSlideShow";
import useWindowSize from "@/hooks/use_window_size";
import ModalContainer from "@/components/modals/ModalContainer";

import chairImageOne from "../../assets/images/silo_images/chair_drive.png"
import chairImageTwo from "../../assets/images/silo_images/BCL 8003 BL_View02.png"
import chairImageThree from "../../assets/images/silo_images/BCL 8003 BL_View01.png"
import chairImageFour from "../../assets/images/silo_images/BCL 8003 BL_View04.png"
import chairImageFive from "../../assets/images/silo_images/BCL 8003 BL_View03.png"

/*MODAL IMAGES */
import modalChairImageOne from "../../assets/images/silo_images/silo/1.png"
import modalChairImageTwo from "../../assets/images/silo_images/silo/2.png"
import modalChairImageThree from "../../assets/images/silo_images/silo/3.png"
import modalChairImageFour from "../../assets/images/silo_images/silo/4.png"
import modalChairImageFive from "../../assets/images/silo_images/silo/5.png"


// type ImageSet = {
//     [key: string]: {
//         imageData: StaticImageData,
//         imageName: string,
//         buttonColor?: "dark" | "light",
//         width?: number
//         overrideStyle?:object
//     },
//     order: Array<string>
// }

const mainImageSet: ImageSet = {
    order: [
        "chairImageOne",
        "chairImageTwo",
        "chairImageThree",
        "chairImageFour",
        "chairImageFive"
    ],
    chairImageOne: {
        imageName: "chairImageOne",
        imageData: chairImageOne,
        overrideStyle: {
            transform: "scaleX(-1)"
        }
    },
    chairImageTwo: {
        imageName: "chairImageTwo",
        imageData: chairImageTwo,
        overrideStyle: {}
    },
    chairImageThree: {
        imageName: "chairImageThree",
        imageData: chairImageThree,
        overrideStyle: {}
    },
    chairImageFour: {
        imageName: "chairImageFour",
        imageData: chairImageFour,
        overrideStyle: {}
    },
    chairImageFive: {
        imageName: "chairImageFive",
        imageData: chairImageFive,
        overrideStyle: {}
    }
}

// const modalImageSet: ImageSet = {
//     order: [
//         "chairImageOne",
//         "chairImageTwo",
//         "chairImageFour",
//         "chairImageThree",
//         "chairImageFive"
//     ],
//     chairImageOne: {
//         imageName: "chairImageOne",
//         imageData: modalChairImageOne,
//         width: 1,
//         overrideStyle: {
//             objectPosition: "50% 50%"
//         }
//     },
//     chairImageTwo: {
//         imageName: "chairImageTwo",
//         imageData: modalChairImageTwo,
//         width: 1,
//         overrideStyle: {
//             objectPosition: "50% 50%"
//         }
//     },
//     chairImageThree: {
//         imageName: "chairImageThree",
//         imageData: modalChairImageThree,
//         width: 1,
//         overrideStyle: {
//             objectPosition: "50% 50%"
//         }
//     },
//     chairImageFour: {
//         imageName: "chairImageFour",
//         imageData: modalChairImageFour,
//         width: 1.5,
//         overrideStyle: {
//             objectPosition: "50% 60%"
//         }
//     },
//     chairImageFive: {
//         imageName: "chairImageFive",
//         imageData: modalChairImageFive,
//         width: 1,
//         overrideStyle: {
//             objectPosition: "25% 25%"
//         }
//     }
// }


/* Images under different categories */
type ModalImageSet = {
    [key: string]: Array<StaticImageData>
};


const SiloImages: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 1);

    const viewportSize = useWindowSize();

    // Detect when the user is in viewport
    const [isInView, setIsInView] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        // IntersectionObserver logic to track if element is in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting); // Set inView status based on intersection
            },
            { threshold: 0.5 } // Trigger when 10% of the element is in view
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

    /* Throttle on first render */
    const scrollDelayOnLoad = useRef(false);
    useEffect(()=>{

        scrollDelayOnLoad.current = true
        setTimeout(()=>{
            scrollDelayOnLoad.current = false; 
        }, 700)
    }, [isInView])

    useEffect(() => {
        const myListener = (e) => {
            // Event handler logic here
            if(scrollDelayOnLoad.current) return
            if (isInView) {
                if (e.deltaY > 0) {
                    // Scrolled down
                    handleChangeSlide(1, e)
                } else {
                    // Scrolled up
                    handleChangeSlide(-1, e)
                }
            };
        }

        if (isInView) {
            // Apply the event listener after a 2-second delay
            elementRef.current.addEventListener("wheel", myListener);
        } else {
            console.log(isInView)
            elementRef.current.removeEventListener("wheel", myListener);
        }


    }, [isInView]); // Dependency array includes handleChangeSlide to ensure it's fresh if it changes


    /* MODAL TRIGGER */
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = useCallback(()=>{
        setIsModalOpen(false)
    }, [])

    const modalImageSet = useMemo(() => {
        /* RETRIEVE IMAGE URLS FROM STORAGE LOCATION, BUT DONT LOAD YET */

        const dynamicImageSet: ModalImageSet = {
            top: [
                
                modalChairImageFour,
                modalChairImageOne,
                modalChairImageThree,
                modalChairImageTwo,
                modalChairImageFive

            ]
        }

        return dynamicImageSet;

    }, [])

    return (
        <>
            <div
                ref={elementRef}
                style={{
                    position: 'relative',
                    zIndex: 200,
                    height: "100%",
                    width: "100%"
                }}
            >

                <motion.section
                    className={styles.silo_container}
                    ref={containerRef}
                >
                    <div className={styles.silo_content}>
                        <h3 className={styles.silo_content_heading}>
                            Product Silos
                        </h3>
                        <Button
                            text="Take a closer look" modifier="p-color"
                            onClick={handleModalOpen}
                            buttonType={2}
                        />
                    </div>

                    <div
                        className={styles.silo_image}
                    >
                        <FadeInCarousel
                            imageSet={mainImageSet}
                        />
                    </div>

                </motion.section>
            </div>

            {/* MODAL CONTAINER */}
            <ModalContainer
                handleModalClose={handleModalClose}
                isModalOpen={isModalOpen}
                imageSet={modalImageSet}
                imageNo={9}
                selectionArray={[]}
            />
        </>
    );
}

export default SiloImages;