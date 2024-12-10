'use client'
import styles from "./CtaTertiary.module.scss";
import Image from 'next/image';
import sofaImage from "../../assets/images/cta_tertiary/sofa.png";
import useAutoLoad from "@/hooks/use_autoload";
import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from "react";
import useWindowSize from "@/hooks/use_window_size";


const CtaTertiary: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide,
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.5);

    

    // Calculate size of screen initially 
    const viewportSize = useWindowSize();
    const scrollHeight = useMemo(() => {

        // Height of element is 190vh, therefore we  multiply viewport by 1.9 to get total scroll distance
        return viewportSize.height * 1.9;

    }, [viewportSize])

    // Monitor scroll position and check if at top or bottom of component
    const isAtTopRef = useRef(true); // Ref for tracking if it's at the top
    const isAtBottomRef = useRef(false); // Ref for tracking if it's at the bottom
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollContainer = scrollContainerRef.current;

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
        const scrollContainer = scrollContainerRef.current;
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


    return (

        <div

            ref={elementRef}
            style={{
                zIndex: 100,
                position: 'relative',
                height: '100vh'
            }}
        >
            <div
                ref={scrollContainerRef}
                style={{
                    zIndex: 100,
                    position: 'relative',
                    height: '100vh',
                    overflowY: "auto",
                }}
            >
                <motion.section
                    className={styles.cta_container}
                    ref={containerRef}
                >
                    <div className={styles.cta_content}>
                        <p className={styles.cta_content_paragraph}>
                            <span className='text-group'>Lorem ipsum dolor sit amet. </span>
                            <span className='text-group'>Quo odit atque ut architecto obcaecati rem </span>
                            <span className='text-group'>vitae tempore non asperiores consequatur ut! </span>
                        </p>
                    </div>
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true, amount: 0.25 }}
                        className={styles.cta_image_container}
                    >
                        <Image
                            src={sofaImage}
                            alt=''
                            className={styles.cta_image}
                        />
                    </motion.div>

                </motion.section>
            </div>
        </div>
    );
}

export default CtaTertiary
