import styles from "./Banner.module.scss";

export default function Banner() {
    return (
        <section className={styles.banner_container} data-testid="tulfa-sofa-container">
            <video className={styles.banner_video} preload="auto" muted>
                <source src="/videos/banner/sofa.mp4" type="video/mp4" />
                {/* ADD ALT TEXT */}
            </video>
        </section>
    );
}
