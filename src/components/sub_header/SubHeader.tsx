import styles from "./SubHeader.module.scss";

export default function SubHeader() {
    return (
        <header className={styles.header_container}>
            <h3 className={styles.header_heading}>
                Home Décor & Furniture
            </h3>
            <nav className={styles.header_nav}>
                <a className={styles.header_nav_activated}>Product Images</a>
                <a className={styles.header_nav_disabled}>Product Videos</a>
                <a className={styles.header_nav_disabled}>Imersive Experience</a>
                <button className={styles.header_nav_button}>Book a demo</button>
            </nav>
        </header>
    );
}
