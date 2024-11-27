import CallOut from "@/components/call_out/CallOut";
import ShowCase from "@/components/showcase/ShowCase";

import styles from "./CloseUpShots.module.scss";
export default function CloseUpShots() {
    return (
        <section className={styles.close_container}>
            <CallOut heading="Close Up Shots" />
            <div className={styles.close_showcase}>
                <ShowCase />
            </div>
        </section>
    );
}
