import styles from "./Banner.module.scss";

export default function Banner() {
    return (
        <section className={styles.banner_container}>
            <video className={styles.banner_video} autoPlay muted loop>
                <source src="#" type="video/mp4" />
            </video>
        </section>
    );
}
