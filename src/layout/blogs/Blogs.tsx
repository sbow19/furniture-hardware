import Card from "@/components/card/Card";
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
                        modifier="bg-car"
                    />
                    <Card
                        heading="Augmented Reality"
                        date="August 30, 2024"
                        paragraph="The End of an Era: Meta’s Spark AR Shutdown and the Way Forward"
                        modifier="bg-meta"
                    />
                    <Card
                        heading="eCommerce"
                        date="August 15, 2024"
                        paragraph="Amazon Enhanced Brand Content (A+ Content): Essential Tips"
                        modifier="bg-cutlery"
                    />
                </div>
            </div>
        </section>
    );
}
