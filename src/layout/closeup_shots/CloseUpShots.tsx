import CallOut from "@/components/call_out/CallOut";
// import ShowCase from "@/components/showcase/ShowCase";
import Button from '@/components/button/Button'
import Image from 'next/image';
import backgroundImageRender from "root/public/images/closeup_shots/nitavparikh_upholstery_cleaning_closeup_--v_6.1_a6bab072-4445-4e1c-b8b3-07bf91d176c8_1.png"

import styles from "./CloseUpShots.module.scss";

export default function CloseUpShots() {
    return (
        <section className={styles.close_container}>

            <CallOut heading="Close Up Shots" />
            <div className={styles.close_showcase}>
                <Image
                    src={backgroundImageRender}
                    alt=''
                    priority
                    className={styles.close_background}
                />
                {/* <ShowCase /> */}

            </div>

            <div
                className={styles.close_button_container}
            >
                <Button
                    text="Take a closer look"
                    modifier="p-color"
                    buttonType={1}
                />
            </div>
        </section>
    );
}
