'use client'
import CallOut from "@/components/call_out/CallOut";
// import ShowCase from "@/components/showcase/ShowCase";
import Button from '@/components/button/Button'
import Image from 'next/image';
import backgroundImageRender from "../../assets/images/closeup_shots/nitavparikh_upholstery_cleaning_closeup_--v_6.1_a6bab072-4445-4e1c-b8b3-07bf91d176c8_1.png"
import useAutoLoad from "@/hooks/use_autoload";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import styles from "./CloseUpShots.module.scss";
import { useEffect, useRef, useState, useMemo } from "react";
import useWindowSize from "@/hooks/use_window_size";


const CloseUpShots: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.3);

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

    useEffect(() => {
        const myListener = (e) => {
   
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
        [2, 1, 1, 1.5]
    )
    const springyTransformScaleAnimationOne = useSpring(transformScaleAnimationOne, {
        damping: 40
    })

    const translateXAnimationOne = useTransform(
        scrollYProgress,
        [0, 0.15],
        [-500, 0]
    )
    const springyTranslateXAnimationOne = useSpring(translateXAnimationOne, {
        damping: 40
    })

    const translateYAnimationOne = useTransform(
        scrollYProgress,
        [0, 0.15, 0.75, 1],
        [400, 0, 0, -100]
    )
    const springyTranslateYAnimationOne = useSpring(translateYAnimationOne, {
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
                        minHeight: viewportSize.height * 4,
                        backgroundColor: 'transparent',
                        position: 'relative',
                        zIndex: 100
                    }}
                    ref={elementRef}

                />
            </div>

            <motion.section className={styles.close_container} ref={containerRef}>

                <CallOut
                    heading="Close Up Shots"
                    calloutStyleType={0}
                />
                <motion.div
                    className={styles.close_showcase}
                    style={{
                        scale: springyTransformScaleAnimationOne,
                        x: springyTranslateXAnimationOne,
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


            </motion.section>
            <div
                className={styles.close_button_container}
            >
                <Button
                    text="Take a closer look"
                    modifier="p-color"
                    buttonType={1}
                />
            </div>

        </>
    );
}

export default CloseUpShots;
