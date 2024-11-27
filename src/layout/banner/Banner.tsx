import styles from "./Banner.module.scss";
export default function Banner() {
    return (
        <section className={styles.banner_container}>
            <video className={styles.banner_video} preload="auto">
                <source src="/videos/banner/sofa.mp4" type="video/mp4" />
            </video>
        </section>
    );
}
