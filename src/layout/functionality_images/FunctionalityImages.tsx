import PopUp from "@/components/pop_up/PopUp";
import Button from '@/components/button/Button'
import Image from 'next/image';
import backgroundImageRender from "root/public/images/functionality_images/Renders/White Bakground render.jpg"

import styles from "./FunctionalityImages.module.scss";
export default function FunctionalityImages() {
    return (
        <section className={styles.functionality_container}>
            <div className={styles.functionality_content}>
                <h3 className={styles.functionality_content_heading}>
                    Functionality Images
                </h3>
                <Image
                    src={backgroundImageRender}
                    className={styles.functionality_render}
                    alt=''
                    priority
                />

                <div
                    className={styles.functionality_button}
                >
                    <Button text="Take a closer look" modifier="p-color" /> 
                </div>
                
                {/* <PopUp
                    className=""
                /> */}
                
            </div>
        </section>
    );
}
