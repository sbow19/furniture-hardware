import { LuExpand } from "react-icons/lu";

import styles from "./PopUp.module.scss";
export default function PopUp() {
    return (
        <button className={styles.pop_container}>
            <span className={styles.pop_span}>
                Take a closer look
            </span>
            <div className={styles.pop_circle}>
                <LuExpand className={styles.pop_circle_icon} />
            </div>
        </button>
    );
}
