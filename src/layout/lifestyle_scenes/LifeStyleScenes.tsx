import PopUp from "@/components/pop_up/PopUp";

import styles from "./LifeStyleScenes.module.scss";
export default function LifeStyleScenes() {
    return (
        <section className={styles.lifestyle_container}>
            <div className={styles.lifestyle_background}>
                <h3 className={styles.lifestyle_background_heading}>
                    Lifestyle Scenes
                </h3>
                <div className={styles.lifestyle_background_pop}>
                    <PopUp />
                </div>
            </div>
        </section>
    );
}
