import Button from "@/components/button/Button";

import styles from "./SiloImages.module.scss";
export default function SiloImages() {
    return (
        <section className={styles.silo_container}>
            <div className={styles.silo_content}>
                <h3 className={styles.silo_content_heading}>
                    Product Silos
                </h3>
                <Button />
            </div>
            <div className={styles.silo_image} />
        </section>
    );
}