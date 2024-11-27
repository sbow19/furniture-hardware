import styles from "./CtaTertiary.module.scss";
export default function CtaTertiary() {
    return (
        <section className={styles.cta_container}>
            <div className={styles.cta_content}>
                <p className={styles.cta_content_paragraph}>
                    <span className={styles.cta_content_paragraph_disabled}>Lorem ipsum dolor sit amet. </span>
                    <span className={styles.cta_content_paragraph_disabled}>Quo odit atque ut architecto obcaecati rem </span>
                    <span className={styles.cta_content_paragraph_activated}>vitae tempore non asperiores consequatur ut! </span>
                </p>
            </div>
            <div className={styles.cta_image} />
        </section>
    );
}
