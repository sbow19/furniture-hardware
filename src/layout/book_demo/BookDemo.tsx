import Button from "@/components/button/Button";

import styles from "./BookDemo.module.scss";
export default function BookDemo() {
    return (
        <section className={styles.book_container}>
            <div className={styles.book_content}>
                <h4 className={styles.book_content_heading}>
                    Book a Demo
                </h4>
                <p className={styles.book_content_paragraph}>
                    We have produced product visuals and immersive experiences for fortune 500 companies.
                    Are you spending more than $50k on your product content? Talk to us.
                </p>
                <Button text="Schedule a Demo" modifier="l-color" />
            </div>
        </section>
    );
}
