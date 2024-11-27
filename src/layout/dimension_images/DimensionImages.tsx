import CallOut from "@/components/call_out/CallOut";
import UpDownCarousel from "@/components/carousel/updown_carousel/UpDownCarousel";

import styles from "./DimensionImages.module.scss";
export default function DimensionImages() {
    return (
        <section className={styles.dimension_container}>
            <CallOut heading="Dimension Images" />
            <UpDownCarousel modifier="bg-dimension" />
        </section>
    );
}
