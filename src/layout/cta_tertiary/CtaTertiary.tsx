'use client'
import styles from "./CtaTertiary.module.scss";
import Image from 'next/image';
import sofaImage from "../../assets/images/cta_tertiary/Green_sofa.png";
import useAutoLoad from "@/hooks/use_autoload";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from "react";
import useWindowSize from "@/hooks/use_window_size";


const CtaTertiary: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide,
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.5);

    // Calculate size invisible animation element 
    const viewportSize = useWindowSize();
    const scrollHeight = useMemo(() => {

        // Change size depending on desired length of animations
        return viewportSize.height * 5;

    }, [viewportSize])

    // Monitor scroll position and check if at top or bottom of component
    const isAtTopRef = useRef(true); // Ref for tracking if it's at the top
    const isAtBottomRef = useRef(false); // Ref for tracking if it's at the bottom
    const scrollTarget = useRef(null);

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


    /* Monitor when component in view */
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
            if (isInView) {

                if (e.deltaY > 0) {
                    // Scrolled down
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

    }, [isInView]); // Re-run the effect when `isInView` changes

    /**
     * For each SPAN element, check whether its in the viewport
     */

    useEffect(() => {
        // Select all the text groups
        const textGroups = document.querySelectorAll('.text-group');

        // Create an intersection observer
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    // When a text group enters the viewport, add 'highlight' class
                    if (entry.isIntersecting) {
                        entry.target.classList.add(`${styles.cta_content_paragraph_activated}`);
                    } else {
                        entry.target.classList.remove(`${styles.cta_content_paragraph_activated}`);
                    }
                });
            },
            {
                threshold: 1,
            },
        );

        // Observe each text group
        textGroups.forEach((group) => {
            observer.observe(group);
        });

        return
    });

    /* Target scroll container for animation tracking */
    const { scrollYProgress } = useScroll({
        container: scrollTarget
    })

    /* SCROLLBASED ANIMATIONS */
    const translateAnimationOne = useTransform(
        scrollYProgress,
        [0, 0.8],
        [scrollHeight / 5, -scrollHeight / 3]
    )
    const springyTranslateAnimationOne = useSpring(translateAnimationOne, {
        damping: 40,
        velocity: 50
    })

    const translateAnimationTwo = useTransform(
        scrollYProgress,
        [0, 0.1, 0.9, 1],
        [-scrollHeight / 15, -scrollHeight / 100, -scrollHeight / 100, -scrollHeight / 10]
    )

    const springyTranslateAnimationTwo = useSpring(translateAnimationTwo, {
        damping: 20
    })

    /*SCROLL THROTTLING*/

    // useEffect(() => {
    //     // Define the wheel handler function
    //     const handleWheel = (event) => {
    //         // Prevent default page scroll behavior
    //         event.preventDefault()

    //         const { deltaY } = event
    //         if (deltaY < 110 && deltaY > 0) {
    //             return

    //         } else if (deltaY > 140 || deltaY < -140) {
    //             return
    //         } else if (deltaY > 110) {
    //             scrollTarget.current.scrollBy(0, Math.max(deltaY * 0.25, 25))

    //         }
    //         else if (deltaY < -110) {
    //             scrollTarget.current.scrollBy(0, Math.min(deltaY * 0.25, -25))

    //         }

    //     };
    //     // Attach the wheel event listener to the 
    //     scrollTarget.current.addEventListener('wheel', handleWheel, { passive: false });


    // }, []); // Empty dependency array ensures the effect runs once when the component mounts

    // Create a ref to store the last time the function was called
    const lastCallRef = useRef(0);

    useEffect(() => {
        // Define the wheel handler function
        const handleWheel = (event) => {
            // Prevent default page scroll behavior
            event.preventDefault()

            const now = Date.now();
            const limit = 1000; // Throttle limit in milliseconds (1 second)

            if (now - lastCallRef.current >= limit) {

                const { deltaY } = event

                if(deltaY  < 100 && deltaY > -100){
                    return
                }
                if (deltaY > 0) {
                    scrollTarget.current.scrollBy(0, scrollHeight / 6)
        
                }
                else if (deltaY < 0) {
                    scrollTarget.current.scrollBy(0, -scrollHeight / 6)
        
                }
        

                lastCallRef.current = now;

            }

        };
        if (scrollTarget.current) {
            scrollTarget.current.addEventListener('wheel', handleWheel, { passive: false });
        }


    }, []); // Empty dependency array ensures the effect runs once when the component mounts

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
                        minHeight: viewportSize.height * 5,
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
                <motion.section
                    className={styles.cta_container}
                    ref={containerRef}
                >
                    <motion.div
                        className={styles.cta_content}
                        style={{
                            y: springyTranslateAnimationOne
                        }}
                    >
                        <p className={styles.cta_content_paragraph}>
                            <span className='text-group'>Lorem ipsum dolor sit amet. </span>
                            <span className='text-group'>Quo odit atque ut architecto obcaecati rem </span>
                            <span className='text-group'>vitae tempore non asperiores consequatur ut! </span>
                        </p>
                    </motion.div>
                    <motion.div
                        style={{
                            position: 'absolute',
                            y: springyTranslateAnimationTwo,
                            backgroundColor: 'transparent'
                        }}
                        className={
                            styles.cta_image_container
                        }
                    >
                        <Image
                            src={sofaImage}
                            alt=''
                            className={styles.cta_image}
                        />
                    </motion.div>

                </motion.section>
            </div>
        </>


    );
}

export default CtaTertiary
