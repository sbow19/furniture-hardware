import styles from "./MarketingImages.module.scss";
export default function MarketingImages() {
    return (
        <section className={styles.marketing_container}>
            <h3 className={styles.marketing_heading}>
                Marketing Images.
            </h3>
            <div className={styles.marketing_slider}>
                <div className={styles.marketing_slider_image_one} />
                <div className={styles.marketing_slider_image_two} />
            </div>
        </section>
    );
}
