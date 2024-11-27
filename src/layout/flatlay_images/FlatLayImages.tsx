import CallOut from "@/components/call_out/CallOut";

import styles from "./FlatLayImages.module.scss";
export default function FlatLayImages() {
    return (
        <section className={styles.flatlay_container}>
            <CallOut heading="Flat Lay Images" />
            <div className={styles.flatlay_image} />
            <CallOut paragraph="Create mood boards to help interior designers select elements to enhance their projects." modifier="mw-563" />
        </section>
    );
}
