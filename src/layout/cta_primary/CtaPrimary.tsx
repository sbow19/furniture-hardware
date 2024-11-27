import styles from "./CtaPrimary.module.scss";
export default function CtaPrimary() {
    return (
        <section className={styles.cta_container}>
            <video className={styles.banner_video} preload="auto">
                <source src="/videos/banner/sofa.mp4" type="video/mp4" />
            </video>
            <div className={styles.cta_content}>
                Introducing
            </div>
        </section>
    );
}
