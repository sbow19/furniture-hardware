'use client'
import Card from "@/components/card/Card";
import { motion } from 'framer-motion'
/* BLOG IMAGES*/
import blogOneImage from '../../assets/images/blogs/car.png'
import blogMetaImage from '../../assets/images/blogs/meta.png'
import blogCutleryImage from '../../assets/images/blogs/cutlery.png'
import { useRef, useEffect, useState } from "react";

import styles from "./Blogs.module.scss";

const Blogs: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {

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
            <motion.section className={styles.blogs_container} data-testid="tulfa-blogs-container">
                <div className={styles.blogs_content}>
                    <h4 className={styles.blogs_content_heading}>
                        Latest Blogs
                    </h4>
                    <div className={styles.blogs_content_cards}>
                        <Card
                            heading="Additive Manufacturing"
                            date="August 31, 2024"
                            paragraph="3D Printing the Electric Explorer: Ford’s Vision for the Future"
                            imageData={blogOneImage}
                        />
                        <Card
                            heading="Augmented Reality"
                            date="August 30, 2024"
                            paragraph="The End of an Era: Meta’s Spark AR Shutdown and the Way Forward"
                            imageData={blogMetaImage}
                        />
                        <Card
                            heading="eCommerce"
                            date="August 15, 2024"
                            paragraph="Amazon Enhanced Brand Content (A+ Content): Essential Tips"
                            imageData={blogCutleryImage}
                        />
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
export default Blogs;
