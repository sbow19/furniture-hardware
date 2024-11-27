import PopUp from "@/components/pop_up/PopUp";

import styles from "./FunctionalityImages.module.scss";
export default function FunctionalityImages() {
    return (
        <section className={styles.functionality_container}>
            <div className={styles.functionality_content}>
                <h3 className={styles.functionality_content_heading}>
                    Functionality Images
                </h3>
                <PopUp />
            </div>
        </section>
    );
}
