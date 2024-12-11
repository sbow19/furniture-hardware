'use client'
import ShowCase from "@/components/showcase/ShowCase";
import Image from 'next/image';
import Button from '@/components/button/Button'
import lifeStyleScenesImage from "../../assets/images/lifestyle_scenes/background.png";
import styles from "./LifeStyleScenes.module.scss";
import useAutoLoad from "@/hooks/use_autoload";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from "react";
import useWindowSize from "@/hooks/use_window_size";

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
        return viewportSize.height * 8;

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

    useEffect(() => {
        // IntersectionObserver logic to track if element is in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting); // Set inView status based on intersection
            },
            { threshold: 0.1 } // Trigger when 10% of the element is in view
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
                    console.log(isAtTopRef.current)
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
            console.log(isInView)
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
        [2, 1, 1, 1.5]
    )
    const springyTransformScaleAnimationOne = useSpring(transformScaleAnimationOne, {
        damping: 40
    })

    const translateAnimationOne = useTransform(
        scrollYProgress,
        [0, .2, .9, 1],
        [150, -150, -150, -400]
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


    return (
        <>
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
                        minHeight: viewportSize.height * 8,
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
                        overflow: 'hidden'
                    }}
                    className={styles.scroll_container}
                >
                    <motion.section
                        className={styles.lifestyle_container}
                        ref={containerRef}
                    >
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
                                backgroundColor: 'rgba(0,0,0)',
                                opacity: transformOpacityAnimationOne
                            }}
                        >
                            <ShowCase
                                heading="Lifestyle Scenes"
                                animationValues={{
                                    y: springyTransformShowcaseAnimationOne
                                }}
                            />
                        </motion.div>



                    </motion.section>
                </motion.div>

                <Button
                    text="Take a closer look"
                    modifier="p-color"
                    buttonType={1}
                    onClick={() => { }}
                    containerStyles={{
                        position: 'fixed',
                        bottom: '5%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                />
            </div>
        </>
    );
}

export default LifeStyleScenes;
