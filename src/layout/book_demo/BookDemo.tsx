"use client"

import Button from "@/components/button/Button";
import Image from 'next/image';
import bookDemoImage from "root/public/images/book_demo/sector.png"
import { motion } from 'framer-motion'
import useAutoScroll from "@/hooks/use_autoscroll";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}


import styles from "./BookDemo.module.scss";
const BookDemo = ({
    layoutName,
    handleLayoutLoad
}) => {

    const onClick = () => {

    }
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
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
                        onClick={onClick}
                        buttonType={2}
                    />
                </div>
            </div>
        </motion.section>
    );
}

export default BookDemo;
