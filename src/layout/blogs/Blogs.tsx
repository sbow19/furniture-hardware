import Card from "@/components/card/Card";
/* BLOG IMAGES*/
import blogOneImage from  'root/public/images/blogs/car.png'
import blogMetaImage from 'root/public/images/blogs/meta.png'
import blogCutleryImage from 'root/public/images/blogs/cutlery.png'


import styles from "./Blogs.module.scss";
export default function Blogs() {
    return (
        <section className={styles.blogs_container} data-testid="tulfa-blogs-container">
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
        </section>
    );
}
