import CallOut from "@/components/call_out/CallOut";

import styles from "./GroupShots.module.scss";
import GroupCarousel from "@/components/carousel/group_carousel/GroupCarousel";
export default function GroupShots() {
    return (
        <section className={styles.group_container}>
            <CallOut heading="Group Shots" />
            <GroupCarousel />
        </section>
    );
}
