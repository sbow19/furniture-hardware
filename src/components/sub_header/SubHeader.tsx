import styles from "./SubHeader.module.scss";
export default function SubHeader() {
    return (
        <header className={styles.subheader_container}>
            <h3 className={styles.subheader_heading}>
                Home Décor & Furniture
            </h3>
            <nav className={styles.subheader_nav}>
                <a className={styles.subheader_nav_activated}>Product Images</a>
                <a className={styles.subheader_nav_disabled}>Product Videos</a>
                <a className={styles.subheader_nav_disabled}>Imersive Experience</a>
                <a className={styles.subheader_nav_disabled}>Happiest Costumers</a>
                <button>Book a demo</button>
            </nav>
        </header>
    );
}
