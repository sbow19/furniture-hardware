'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import useWindowSize from '@/hooks/use_window_size';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import useAutoLoad from '@/hooks/use_autoload';
import Image from 'next/image';
import styles from './ProductVariations.module.scss'

const ProductVariation = ({
    imageSet,
    headerImage,
    title,
    handleChangeSlide,
    layoutName,
    handleLayoutLoad
}) => {

    /* CONTAINER REFS */
    const backgroundImageRef = useRef(null);

    const [isBackgroundActive, setIsBackgroundActive] = useState(true);

    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.5);


    // Calculate size of screen initially 
    const viewportSize = useWindowSize();
    const scrollHeight = useMemo(() => {

        return viewportSize.height * 2;

    }, [viewportSize])

    /* SCROLL ANIMATION TRIGGERS */
    useEffect(() => {

        const backgroundImage = backgroundImageRef.current;

        const handlePageScrollTrigger = (e) => {
            /* Prevent default behaviour */
            e.preventDefault();


            if (e.deltaY > 0) {

                setIsBackgroundActive(false);
                backgroundImage.removeEventListener("wheel", handlePageScrollTrigger);

            }

        }


        if (backgroundImage) {
            backgroundImage.addEventListener("wheel", handlePageScrollTrigger)
        }

        return (() => {
            const backgroundImage = backgroundImageRef.current;

            if (backgroundImage) {
                backgroundImage.removeEventListener("wheel", handlePageScrollTrigger)
            }
        })

    }, [isBackgroundActive])

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
    }, [viewportSize]);

    // Detect when the user is in viewport
    const [isInView, setIsInView] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        // IntersectionObserver logic to track if element is in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Check if the element is in view and update state
                if (entry.target === elementRef.current) {
                    setIsInView(entry.isIntersecting);
                }
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


    /* Throttle on first render */
    const scrollDelayOnLoad = useRef(false);
    useEffect(()=>{

        scrollDelayOnLoad.current = true
        setTimeout(()=>{
            scrollDelayOnLoad.current = false; 
        }, 1000)
    }, [isInView])

    /* THROTTLING */
    const lastCallRef = useRef(0);

    useEffect(() => {
        if (!scrollTarget.current) return;
        if (typeof window === 'undefined') return;
        // Define the wheel handler function
        const handleWheel = (event) => {
            // Prevent default page scroll behavior
            event.preventDefault();

            if(scrollDelayOnLoad.current) return

            const now = Date.now();
            const limit = 750; // Throttle limit in milliseconds (1 second)

            if (now - lastCallRef.current >= limit) {

                const { deltaY } = event

                if (deltaY < 100 && deltaY > -100) {
                    return
                }
                if (deltaY > 85 && deltaY < 120) {
                    scrollTarget.current.scrollBy(0, scrollHeight / 3)
        
                }
                else if (deltaY < -85 && deltaY > -120) {
                    scrollTarget.current.scrollBy(0, -scrollHeight / 3)
        
                }
                lastCallRef.current = now;
            }

        };
        if (scrollTarget.current) {
            scrollTarget.current.addEventListener('wheel', handleWheel, { passive: false });
        }

    }, []); // Empty dependency array ensures the effect runs once when the component mounts


    /* Target scroll container for animation tracking */
    const { scrollYProgress } = useScroll({
        container: scrollTarget
    });

    /* BACKGROUND ANIMATIONS */
    const transformScaleAnimationOne = useTransform(
        scrollYProgress,
        [0, 0.15],
        [1.2, 1]
    )
    const springyTransformScaleAnimationOne = useSpring(transformScaleAnimationOne, {
        damping: 40
    })

    /* PRODUCT CONTENT CONTAINER ANIMATIONS */
    const translateAnimationOne = useTransform(
        scrollYProgress,
        [0, .25],
        [0, -viewportSize.height / 10 * 6]
    )
    const springyTranslateAnimationOne = useSpring(translateAnimationOne, {
        damping: 40
    })


    return (
        <>
            {/* SCROLLTARGET */}
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
                        minHeight: viewportSize.height * 2,
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
                        height: "100%",
                        overflow: 'hidden',
                    }}
                >
                    <motion.section
                        className={styles.product_container}
                        ref={containerRef}
                    >
                        {/* BACKGROUND IMAGE */}
                        <motion.div
                            style={{
                                width: '100%',
                                height: '100%',
                                scale: springyTransformScaleAnimationOne
                            }}
                        >
                            <Image
                                src={imageSet["top"][0][0]}
                                alt=''
                                priority
                                className={styles.main_image}
                            />
                        </motion.div>

                        {/* SIZE VARIATION CONTAINER */}
                        <motion.div
                            className={styles.product_variation_content_container}
                            style={{
                                y: springyTranslateAnimationOne
                            }}
                        >
                            {/* TITLE */}
                            <div
                                className={styles.title_container}
                            >
                                <div>
                                    {title}
                                </div>
                            </div>

                            {/* IMAGE CONTAINER */}
                            <div
                                className={styles.images_container}
                            >
                                {
                                    imageSet["top"].map((imageSource, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={styles.indiv_image_container}
                                            >
                                                <motion.div
                                                    className={styles.indiv_image_container_inner}
                                                    whileHover={{
                                                        opacity: 0
                                                    }}
                                                    onMouseEnter={()=>{
                                                        console.log("Hello world")
                                                    }}
                                                >

                                                    <Image
                                                        src={imageSource[0]}
                                                        alt={imageSource[1]}
                                                        className={styles.indiv_image}
                                                    />
                                                </motion.div>

                                                <Image
                                                    src={imageSource[2]}
                                                    alt={imageSource[1]}
                                                    className={styles.indiv_image_overlay}

                                                />
                                                <p
                                                    className={styles.image_text}
                                                >
                                                    {imageSource[1]}
                                                </p>


                                            </div>
                                        )
                                    })
                                }

                            </div>




                        </motion.div>

                    </motion.section>
                </motion.div>
            </div>
        </>
    )
}

export default ProductVariation