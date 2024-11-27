import CallOut from "@/components/call_out/CallOut";

import styles from "./ProductExplodedView.module.scss";
export default function ProductExplodedView() {
    return (
        <section className={styles.product_container}>
            <CallOut heading="Product Exploded View" />
            <div className={styles.product_mattres}>
                <div className={styles.product_mattres_layer_one} />
                <div className={styles.product_mattres_layer_two} />
                <div className={styles.product_mattres_layer_three} />
                <div className={styles.product_mattres_layer_four} />
                <div className={styles.product_mattres_layer_five} />
                <div className={styles.product_mattres_layer_six} />
                <div className={styles.product_mattres_layer_seven} />
                <div className={styles.product_mattres_layer_eight} />
            </div>
            <CallOut paragraph="Let Your Customers See The Meticulous Design, Premium Materials, And The Skill That Goes Into Every Detail-From The Inside Out." modifier="mw-928" />
        </section>
    );
}
