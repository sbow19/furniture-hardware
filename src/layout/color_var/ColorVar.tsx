import styles from "./ColorVar.module.scss";
export default function ColorVar() {
    return (
        <section className={styles.color_container}>
            <div className={styles.color_left}>
                <div className={styles.color_left_image} />
            </div>
            <div className={styles.color_left_filter}>
                <button className={styles.color_left_filter_one}>
                    <div className={styles.first_semicircle} />
                </button>
                <button className={styles.color_left_filter_two}>
                    <div className={styles.second_semicircle} />
                </button>
                <button className={styles.color_left_filter_three}>
                    <div className={styles.third_semicircle} />
                </button>
                <button className={styles.color_left_filter_four}>
                    <div className={styles.fourth_semicircle} />
                </button>
                <button className={styles.color_left_filter_five}>
                    <div className={styles.fifth_semicircle} />
                </button>
            </div>
            <div className={styles.color_right}>
                <div className={styles.color_right_image} />
            </div>
        </section>
    );
}
