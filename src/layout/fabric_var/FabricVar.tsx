import styles from "./FabricVar.module.scss";
export default function FabricVar() {
    return (
        <section className={styles.fabric_container}>
            <div className={styles.fabric_left}>
                <div className={styles.fabric_left_image} />
            </div>
            <div className={styles.fabric_right}>
                <div className={styles.fabric_right_image} />
                <div className={styles.fabrics}>
                    <button>
                        <span className={styles.fabrics_span}>
                            Prints
                        </span>
                        <div className={styles.fabrics_figure}>
                            <div className={styles.fabrics_figure_one} />
                        </div>
                    </button>
                    <button>
                        <span className={styles.fabrics_span}>
                            Leathers
                        </span>
                        <div className={styles.fabrics_figure}>
                            <div className={styles.fabrics_figure_two} />
                        </div>
                    </button>
                    <button>
                        <span className={styles.fabrics_span}>
                            Embroidery
                        </span>
                        <div className={styles.fabrics_figure}>
                            <div className={styles.fabrics_figure_three} />
                        </div>
                    </button>
                    <button>
                        <span className={styles.fabrics_span}>
                            Velvets
                        </span>
                        <div className={styles.fabrics_figure}>
                            <div className={styles.fabrics_figure_four} />
                        </div>
                    </button>
                    <button className={styles.fabrics_last}>
                        <span className={styles.fabrics_span}>
                            Plains
                        </span>
                        <div className={styles.fabrics_figure}>
                            <div className={styles.fabrics_figure_five} />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}
