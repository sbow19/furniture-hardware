import CallOut from "@/components/call_out/CallOut";
import UpDownCarousel from "@/components/carousel/updown_carousel/UpDownCarousel";

import styles from "./InstallationImages.module.scss";
export default function InstallationImages() {
    return (
        <section className={styles.installation_container}>
            <CallOut heading="Installation Images" />
            <UpDownCarousel modifier="bg-installation" />
            <CallOut paragraph="Guide your customers with clear, step-by-step images for assembling and setting up the furniture." modifier="mw-623" />
        </section>
    );
}
