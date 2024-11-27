import { FaPlus } from "react-icons/fa";

import styles from "./Button.module.scss";

type ButtonProps = {
    text: "Take a closer look" | "Schedule a Demo";
    modifier: keyof typeof styles;
}

export default function Button({ text, modifier }: ButtonProps) {
    return (
        <button className={`${styles.button_container} ${styles[modifier]}`}>
            <FaPlus className={styles.button_icon} /> {text}
        </button>
    );
}