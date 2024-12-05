import Button from "@/components/button/Button";
import Image from 'next/image';
import chairImage from "root/public/images/silo_images/chair_drive.png";

import styles from "./SiloImages.module.scss";
export default function SiloImages() {
    return (
        <section className={styles.silo_container}>
            <div className={styles.silo_content}>
                <h3 className={styles.silo_content_heading}>
                    Product Silos
                </h3>
                <Button text="Take a closer look" modifier="p-color" />
            </div>
            <Image 
                src={chairImage}
                placeholder='blur'
                alt=''
                className={styles.silo_image}
            />
        </section>
    );
}