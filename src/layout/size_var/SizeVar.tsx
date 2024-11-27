import styles from "./SizeVar.module.scss";
export default function SizeVar() {
    return (
        <section className={styles.size_container}>
            <div className={styles.size_group}>
                <div className={styles.size_group_content}>
                    <span className={styles.size_group_content_span_large}>L</span>
                    <div className={styles.size_group_content_image_large} />
                </div>
                <div className={styles.size_group_content}>
                    <span className={styles.size_group_content_span_medium}>M</span>
                    <div className={styles.size_group_content_image_medium} />
                </div>
                <div className={styles.size_group_content}>
                    <span className={styles.size_group_content_span_small}>S</span>
                    <div className={styles.size_group_content_image_small} />
                </div>
            </div>
            <span className={styles.size_span}>
                Product Size Variation
            </span>
        </section>
    );
}
