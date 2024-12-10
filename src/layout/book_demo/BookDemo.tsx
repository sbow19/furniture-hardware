"use client"

import Button from "@/components/button/Button";
import Image from 'next/image';
import bookDemoImage from "../../assets/images/book_demo/sector.png"
import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from "react";
import useAutoLoad from "@/hooks/use_autoload";

import styles from "./BookDemo.module.scss";
const BookDemo = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.5);

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

    useEffect(() => {
        // Define the wheel event handler
        const myListener = (e) => {
            // Event handler logic her

            if (!isInView) {
                return
            }
            if (e.deltaY > 0) {
                // Scrolled down
                handleChangeSlide(1);

            } else {
                // Scrolled up
                handleChangeSlide(-1);
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


    return (
        <div ref={elementRef}>
            <motion.section className={styles.book_container} ref={containerRef}>
                <div className={styles.book_content}>
                    <Image
                        alt=''
                        src={bookDemoImage}
                        priority
                        className={styles.book_demo_image}
                    />
                    <div className={styles.book_inner_container}>
                        <h4 className={styles.book_content_heading}>
                            Book a Demo
                        </h4>
                        <p className={styles.book_content_paragraph}>
                            We have produced product visuals and immersive experiences for fortune 500 companies.
                            Are you spending more than $50k on your product content? Talk to us.
                        </p>
                        <Button
                            text="Schedule a Demo"
                            modifier="l-color"
                            buttonType={2}
                        />
                    </div>
                </div>
            </motion.section>
        </div>
    );
}

export default BookDemo;
