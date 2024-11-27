import { Manrope } from "next/font/google"
import styles from "./Testemonial.module.scss";

const manrope = Manrope({
    weight: ["400", "500"],
    subsets: ["latin"]
})

export default function Testemonial() {
    return (
        <section className={`${styles.testemonial_container} ${manrope.className}`}>
            <div className={styles.testemonial_content}>
                <div className={styles.testemonial_content_icon} />
                <div className={styles.testemonial_content_card}>
                    <div className={styles.testemonial_content_card_icon} />
                    <div className={styles.testemonial_content_card_left}>
                        <p className={styles.testemonial_content_card_left_paragraph}>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                            Velit officia consequat duis enim velit mollit.
                            Exercitation veniam consequat sunt nostrud amet.
                        </p>
                        <div>
                            <h4 className={styles.testemonial_content_card_left_heading}>
                                Jhon Doe
                            </h4>
                            <span className={styles.testemonial_content_card_left_span}>
                                Chief Executive Officer - deWALT
                            </span>
                        </div>
                    </div>
                    <div className={styles.testemonial_content_card_right}>
                        <div className={styles.testemonial_content_card_right_image} />
                    </div>
                </div>
            </div>
        </section>
    );
}