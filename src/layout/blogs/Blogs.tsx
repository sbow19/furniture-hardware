'use client'
import Card from "@/components/card/Card";
import { motion } from 'framer-motion'
import useAutoScroll from "@/hooks/use_autoscroll";
/* BLOG IMAGES*/
import blogOneImage from  '../../../public/images/blogs/car.png'
import blogMetaImage from '../../../public/images/blogs/meta.png'
import blogCutleryImage from '../../../public/images/blogs/cutlery.png'

import styles from "./Blogs.module.scss";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const Blogs:React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);
    return (
        <motion.section className={styles.blogs_container} data-testid="tulfa-blogs-container" ref={containerRef}>
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
    );
}
export default Blogs;
