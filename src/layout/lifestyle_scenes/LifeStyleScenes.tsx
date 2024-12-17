'use client'
import ShowCase from "@/components/showcase/ShowCase";
import Image from 'next/image';
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
import lifeStyleScenesImage from "../../assets/images/lifestyle_scenes/Banner.png";
import styles from "./LifeStyleScenes.module.scss";
import useAutoLoad from "@/hooks/use_autoload";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from "react";
import useWindowSize from "@/hooks/use_window_size";
import LifeStyleBranch from "./branch/LifeStyleScenesBranch";
import { throttle } from 'lodash'

const LifeStyleScenes: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.5);

    // Calculate size of screen initially 
    const viewportSize = useWindowSize();
    const scrollHeight = useMemo(() => {

        // Height of element is 150%, therefore we  multiply viewport by 1.9 to get total scroll distance
        return viewportSize.height * 4;

    }, [viewportSize])

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

    useEffect(() => {
        // Define the wheel event handler
        const myListener = (e) => {
            // Event handler logic her

            if (isInView) {

                if (e.deltaY > 0) {
                    // Scrolled do
                    if (isAtBottomRef.current) {

                        handleChangeSlide(1);
                    };

                } else {
                    
                    // Scrolled up
                    if (isAtTopRef.current) {

                        handleChangeSlide(-1)
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
        [0, .15, .9, 1],
        [2, 1, 1, 1.1]
    )
    const springyTransformScaleAnimationOne = useSpring(transformScaleAnimationOne, {
        damping: 40
    })

    const translateAnimationOne = useTransform(
        scrollYProgress,
        [0, .2, .9, 1],
        [150, -150, -150, -viewportSize.height / 1.5]
    )
    const springyTranslateAnimationOne = useSpring(translateAnimationOne, {
        damping: 40
    })

    /* SHOWCASE ANIMATIONS */
    const transformOpacityAnimationOne = useTransform(
        scrollYProgress,
        [0, .15, .9, 1],
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
        [0, .15, .9, 1],
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
    const [isLifestyleBVisible, setIsLifestyleBVisible] = useState(false);

    useEffect(() => {
        // Define the wheel handler function
        const handleWheel = (event) => {
            // Prevent default page scroll behavior
            event.preventDefault()

            const { deltaY } = event
            if (deltaY < 110 && deltaY > 0) {
                return

            } else if (deltaY > 140 || deltaY < -140) {
                return
            } else if (deltaY > 110) {
                scrollTarget.current.scrollBy(0, deltaY * 0.2)

            }
            else if (deltaY < -110) {
                scrollTarget.current.scrollBy(0, deltaY * 0.2)

            }

        };
        // Attach the wheel event listener to the 
        scrollTarget.current.addEventListener('wheel', handleWheel, { passive: false });


    }, []); // Empty dependency array ensures the effect runs once when the component mounts




    return (
        <>

            <motion.div
                animate={{
                    opacity: !isLifestyleBVisible ? 1 : 0,
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
                            className={styles.lifestyle_container}
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
                                    y: springyTranslateAnimationOne
                                }}
                            >
                                <Image
                                    src={lifeStyleScenesImage}
                                    alt=''
                                    priority
                                    className={styles.lifestyle_image}


                                />
                            </motion.div>

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
                                    heading="Lifestyle Scenes"
                                    animationValues={{
                                        y: springyTransformShowcaseAnimationOne,
                                        opacity: transformOpacityAnimationTwo
                                    }}
                                />
                            </motion.div>

                            {/* BUTTON TRIGGER */}
                            <motion.div
                                className={styles.lifestyle_button_container}
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
                            onClick={setIsLifestyleBVisible}
                        />
                    }
                </div>
            </motion.div>


            {/* LIFESTYLE SCENES BRANCH */}
            {
                isLifestyleBVisible && <LifeStyleBranch />
            }

        </>
    );
}

export default LifeStyleScenes;
