import { FaPlus } from "react-icons/fa";
import { LuExpand } from "react-icons/lu"

import styles from "./Button.module.scss";

type ButtonProps = {
    text: "Take a closer look" | "Schedule a Demo";
    modifier: keyof typeof styles;
    buttonType?: number;
    onClick: () => void
}

export default function Button({ text, modifier, buttonType, onClick }: ButtonProps) {

    let Button: React.FC;

    switch (buttonType) {
        case 1:
            Button = <ButtonOne
                text={text}
                modifier={modifier}
                onClick={onClick}
            />
            break
        case 2:
            Button = <ButtonTwo 
                text={text}
                modifier={modifier}
                onClick={onClick} />
            break
        default:
            break;
    }

    return (<>
        {Button}
    </>
    );
}

function ButtonOne({ text, modifier, onClick }: ButtonProps) {
    return (
        <button className={`${styles.button_one_container} ${styles[modifier]}`} onClick={onClick}>
            <span className={styles.pop_span}>
                {text}
            </span>
            <div className={styles.pop_circle}>
                <LuExpand className={styles.pop_circle_icon} />
            </div>
        </button>
    )
}

function ButtonTwo({ text, modifier, onClick }: ButtonProps) {
    return (
        <button className={`${styles.button_two_container} ${styles[modifier]}`} onClick={onClick}>
            <FaPlus className={styles.button_icon} /> {text}
        </button>
    )

}