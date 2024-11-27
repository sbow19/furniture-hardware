import styles from "./CtaSecondary.module.scss";
export default function CtaSecondary() {
    return (
        <section className={styles.cta_container}>
            <h2 className={styles.cta_heading}>
                Virtual Product Photography
            </h2>
            <div className={styles.cta_image} />
        </section>
    );
}
