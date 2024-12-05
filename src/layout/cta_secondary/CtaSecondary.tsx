import styles from "./CtaSecondary.module.scss";
import Image from 'next/image';
import sofaImage from "root/public/images/cta_secondary/sofa.png";

export default function CtaSecondary() {
    return (
        <section className={styles.cta_container}>
            <h2 className={styles.cta_heading}>
                Virtual Product Photography
            </h2>
            <Image 
                alt=''
                src={sofaImage}
                placeholder="blur"
                className={styles.cta_image}
                sizes="100vw"
            />
        </section>
    );
}
