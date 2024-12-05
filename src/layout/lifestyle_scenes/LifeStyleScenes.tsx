import ShowCase from "@/components/showcase/ShowCase";
import Image from 'next/image';
import lifeStyleScenesImage from "root/public/images/lifestyle_scenes/background.png";
import styles from "./LifeStyleScenes.module.scss";


export default function LifeStyleScenes() {
    return (
        <section className={styles.lifestyle_container}>
            <Image
                src={lifeStyleScenesImage}
                alt=''
                priority
                className={styles.lifestyle_image}
            />
            <ShowCase heading="Lifestyle Scenes" />
        </section>
    );
}
