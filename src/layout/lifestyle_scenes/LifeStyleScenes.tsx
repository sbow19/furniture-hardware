import ShowCase from "@/components/showcase/ShowCase";

import styles from "./LifeStyleScenes.module.scss";
export default function LifeStyleScenes() {
    return (
        <section className={styles.lifestyle_container}>
            <ShowCase heading="Lifestyle Scenes" />
        </section>
    );
}
