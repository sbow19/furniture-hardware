import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import styles from "./MaterialVar.module.scss";
export default function MaterialVar() {
    return (
        <section className={styles.material_container}>
            <div className={styles.material_image} />
            <div className={styles.material_content}>
                <span className={styles.material_content_span}>
                    Material Variation
                </span>
                <div className={styles.material_content_arrows}>
                    <button className={styles.material_content_arrow_disabled}>
                        <MdKeyboardArrowLeft className={styles.material_content_arrow_icon} />
                    </button>
                    <button>
                        <MdKeyboardArrowRight className={styles.material_content_arrow_icon} />
                    </button>
                </div>
            </div>
        </section>
    );
}