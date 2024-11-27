import { FaPlus } from "react-icons/fa";

import styles from "./Button.module.scss";
export default function Button() {
    return (
        <button className={styles.button_container}>
            <FaPlus className={styles.button_icon} /> Take a closer look
        </button>
    );
}