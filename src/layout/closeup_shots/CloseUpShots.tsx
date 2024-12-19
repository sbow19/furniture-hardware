'use client'

import ShowCase from "@/components/showcase/ShowCase";
import Image from 'next/image';
import backgroundImageRender from "../../assets/images/closeup_shots/nitavparikh_upholstery_cleaning_closeup_--v_6.1_a6bab072-4445-4e1c-b8b3-07bf91d176c8_1.png"
import useAutoLoad from "@/hooks/use_autoload";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import styles from "./CloseUpShots.module.scss";
import { useEffect, useRef, useState, useMemo } from "react";
import useWindowSize from "@/hooks/use_window_size";
import ModalContainer from "@/components/modals/ModalContainer";
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";


/*MODAL IMAGES */
import ImageOne from "../../assets/images/closeup_shots/rug_one.png"
import ImageTwo from "../../assets/images/closeup_shots/rug_two.png"
import ImageThree from "../../assets/images/closeup_shots/rug_three.png"


const CloseUpShots: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.3);

    // Calculate size of screen initially 
    const viewportSize = useWindowSize();
    const scrollHeight = useMemo(() => {

        // Height of element is 150%, therefore we  multiply viewport by 1.9 to get total scroll distance
        return viewportSize.height * 4;

    }, [viewportSize]);

    // Monitor scroll position and check if at top or bottom of component
    const isAtTopRef = useRef(true); // Ref for tracking if it's at the top
    const isAtBottomRef = useRef(false); // Ref for tracking if it's at the bottom
    const scrollTarget = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const scrollContainer = scrollTarget.current;

            // If scroll container is available, check the scroll position
            if (scrollContainer) {


                const scrollY = scrollContainer.scrollTop;
                const containerHeight = scrollContainer.clientHeight;



                // Check if we're at the top or bottom
                isAtTopRef.current = scrollY === 0;
                isAtBottomRef.current = scrollY + containerHeight >= scrollHeight - 1;
            }
        };
        // Add scroll event listener to track the scroll position
        const scrollContainer = scrollTarget.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('wheel', handleScroll);
        }

        // Cleanup event listener on unmount
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('wheel', handleScroll);
            }
        };
    }, [scrollHeight]);

    // Detect when the user is in viewport
    const [isInView, setIsInView] = useState(false);
    const elementRef = useRef(null);

    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const popupButtonRef = useRef(null)

    useEffect(() => {
        // IntersectionObserver logic to track if element is in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Check if the element is in view and update state
                if (entry.target === elementRef.current) {
                    setIsInView(entry.isIntersecting);
                } else if (entry.target === popupButtonRef.current) {
                    setIsPopupVisible(entry.isIntersecting);
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the element is in view
        );

        if (elementRef.current) {
            observer.observe(elementRef.current); // Start observing the element
        }

        if (popupButtonRef.current) {
            observer.observe(popupButtonRef.current); // Start observing the element
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current); // Clean up observer
            }

            if (popupButtonRef.current) {
                observer.unobserve(popupButtonRef.current); // Start observing the element
            }
        };
    }, []);


    /* Throttle on first render */
    const scrollDelayOnLoad = useRef(false);
    useEffect(() => {

        scrollDelayOnLoad.current = true
        setTimeout(() => {
            scrollDelayOnLoad.current = false;
        }, 700)
    }, [isInView])


    useEffect(() => {
        const myListener = (e) => {

            if (scrollDelayOnLoad.current) return

            if (isInView) {

                if (e.deltaY > 0) {
                    // Scrolled do

                    if (isAtBottomRef.current) {

                        handleChangeSlide(1, e);
                    };

                } else {

                    // Scrolled up
                    if (isAtTopRef.current) {

                        handleChangeSlide(-1, e)
                    };
                }
            }

        };


        if (isInView) {
            // Apply the event listener after a 2-second delay
            elementRef.current.addEventListener("wheel", myListener);
        } else {
            elementRef.current.removeEventListener("wheel", myListener);
        }


    }, [isInView]); // Dependency array includes handleChangeSlide to ensure it's fresh if it changes



    /* Target scroll container for animation tracking */
    const { scrollYProgress } = useScroll({
        container: scrollTarget
    });

    /* BACKGROUND ANIMATIONS */
    const transformScaleAnimationOne = useTransform(
        scrollYProgress,
        [0, .15, .7, 1],
        [2, 1, 1, 1.1]
    )
    const springyTransformScaleAnimationOne = useSpring(transformScaleAnimationOne, {
        damping: 40
    })

    const translateYAnimationOne = useTransform(
        scrollYProgress,
        [0, 0.2, 0.7, 1],
        [150, -150, -150, -viewportSize.height / 1.5]
    )
    const springyTranslateYAnimationOne = useSpring(translateYAnimationOne, {
        damping: 40
    })

    /* CALLOUT ANIMATIONS */
    const transformOpacityAnimationOne = useTransform(
        scrollYProgress,
        [0, .15, .7, 1],
        [0, 0.3, 0.3, 0]
    )

    const transformShowcaseAnimationOne = useTransform(
        scrollYProgress,
        [0, .15, 0.75, 1],
        [150, -250, -250, -700]
    )

    const springyTransformShowcaseAnimationOne = useSpring(transformShowcaseAnimationOne, {
        damping: 40
    })

    /* BUTTON ANIMATION */
    const transformOpacityAnimationTwo = useTransform(
        scrollYProgress,
        [0, .15, .7, 1],
        [0, 1, 1, 0]
    )

    const transformShowcaseAnimationTwo = useTransform(
        scrollYProgress,
        [0, .15],
        [150, -250]
    )

    const springyTransformShowcaseAnimationTwo = useSpring(transformShowcaseAnimationTwo, {
        damping: 40
    })

    /* Calculate popup button position*/
    const popupPosition = useMemo(() => {

        const popupPositionInternal = {
            height: 0,
            width: 0,
            left: 0,
            top: 0
        };

        if (viewportSize.width < 720) {
            popupPositionInternal.height = 50;
            popupPositionInternal.width = 200;
            popupPositionInternal.top = viewportSize.height / 1.2;
            popupPositionInternal.left = viewportSize.width / 4;
            popupPositionInternal.textStyle = {
                fontSize: "12px",
                left: "30%"
            }
        } else {
            popupPositionInternal.height = 70;
            popupPositionInternal.width = 300;
            popupPositionInternal.top = viewportSize.height / 1.2;
            popupPositionInternal.left = viewportSize.width / 2.5;
            popupPositionInternal.textStyle = {

            }
        }

        return popupPositionInternal;
    }, [viewportSize]);

    /* LIFESTYLE SCENE BRANCH STATE */
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const lastCallRef = useRef(0);
    useEffect(() => {
        if (!scrollTarget.current) return;
        if (typeof window === 'undefined') return;
        // Define the wheel handler function
        const handleWheel = (event) => {
            // Prevent default page scroll behavior
            event.preventDefault()

            if(scrollDelayOnLoad.current) return

            const now = Date.now();
            const limit = 850; // Throttle limit in milliseconds (1 second)

            if (now - lastCallRef.current >= limit) {

                const { deltaY } = event

                if(deltaY < 100 && deltaY > -100){
                    return
                }
                if (deltaY > 85 && deltaY < 120) {
                    scrollTarget.current.scrollBy(0, scrollHeight / 3 - 100)
        
                }
                else if (deltaY < -85 && deltaY > -120) {
                    scrollTarget.current.scrollBy(0, -scrollHeight / 3 + 100)
        
                }
                lastCallRef.current = now;
            }

        };
        if (scrollTarget.current) {
            scrollTarget.current.addEventListener('wheel', handleWheel, { passive: false });
        }

    }, []); // Empty dependency array ensures the effect runs once when the component mounts


    /* Images under different categories */
    type ImageSet = {
        [key: string]: Array<string>
    };

    const imageSet = useMemo(() => {
        /* RETRIEVE IMAGE URLS FROM STORAGE LOCATION, BUT DONT LOAD YET */

        const dynamicImageSet = {
            top: [
                ImageOne,
                ImageThree,
                ImageTwo,

            ]
        }

        return dynamicImageSet;

    }, [])

    return (
        <>

            <motion.div
                animate={{
                    opacity: true ? 1 : 0,
                    duration: 1
                }}
            >
                <div
                    style={{
                        height: '100vh',
                        width: '100vw',
                        overflowY: "scroll",
                        position: 'absolute',
                    }}
                    ref={scrollTarget}
                >
                    <div
                        style={{
                            minHeight: viewportSize.height * 4,
                            backgroundColor: 'transparent',
                            position: 'relative',
                            zIndex: 100
                        }}
                        ref={elementRef}

                    />
                </div>

                <div

                    style={{
                        position: 'relative',
                        height: '100%',
                        width: '100%'
                    }}
                >


                    <motion.div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            overflow: 'hidden',
                        }}
                        className={styles.scroll_container}
                    >

                        <motion.section
                            className={styles.close_container}
                            ref={containerRef}
                        >
                            {/* BACKDROP OVERLAY */}

                            <motion.div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: 20,
                                    backgroundColor: 'rgb(0,0,0)',
                                    opacity: transformOpacityAnimationOne
                                }}

                            />

                            {/* BACKGROUND IMAGE */}

                            <motion.div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    scale: springyTransformScaleAnimationOne,
                                    y: springyTranslateYAnimationOne
                                }}
                            >
                                <Image
                                    src={backgroundImageRender}
                                    alt=''
                                    priority
                                    className={styles.close_background}
                                />

                            </motion.div>

                            {/* CALLOUT CONTAINER */}
                            <motion.div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: 30
                                }}
                            >
                                <ShowCase
                                    heading="Close Up Shots"
                                    animationValues={{
                                        y: springyTransformShowcaseAnimationOne,
                                        opacity: transformOpacityAnimationTwo
                                    }}
                                />
                            </motion.div>

                            {/* BUTTON TRIGGER */}
                            <motion.div
                                className={styles.closeup_button_container}
                                style={{
                                    opacity: transformOpacityAnimationTwo,
                                    y: springyTransformShowcaseAnimationTwo,
                                }}
                                ref={popupButtonRef}
                            />
                        </motion.section>
                    </motion.div>
                </div>

                {/* POP BUTTON CONTAINER */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "calc(50vw - 110px)",
                        width: 400,
                        height: 60,
                        zIndex: 150,
                        top: "85vh",
                    }}


                >
                    {
                        isPopupVisible &&
                        <TulfaPopupButton
                            timer={1000}
                            height={60}
                            width={300}
                            textStyle={popupPosition.textStyle}
                            text={"Take a closer look"}
                            onClick={() => {
                                setIsModalOpen(true)
                            }}
                        />
                    }
                </div>

            </motion.div>


            {/* LIFESTYLE SCENES Modal */}
            <ModalContainer
                handleModalClose={handleModalClose}
                isModalOpen={isModalOpen}
                imageSet={imageSet}
                imageNo={9}
                selectionArray={[]}
            />


        </>
    );
}

export default CloseUpShots;
