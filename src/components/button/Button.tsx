import { FaPlus } from "react-icons/fa";
import { LuExpand } from "react-icons/lu"
import { useRef } from 'react'

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
    // Toggle hover - prevent re renders
    const buttonRef = useRef(null);
    return (
        <button
            ref={buttonRef}
            className={`${styles.button_one_container} ${styles[modifier]}`}
            onClick={onClick}
            // onMouseEnter={() => {
            //     buttonRef.current.classList.add(`${styles['button-hovered']}`)
            // }}
        >
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
    // Toggle hover - prevent re renders
    const buttonRef = useRef(null);
    return (
        <button 
            ref={buttonRef}
            className={`${styles.button_two_container} ${styles[modifier]}`} 
            onClick={onClick}
            onMouseEnter={() => {
                buttonRef.current.classList.add(`${styles.button_two_hovered}`)
            }}
            onMouseLeave={()=>{
                buttonRef.current.classList.remove(`${styles.button_two_hovered}`)
            }}
        >
            <FaPlus className={styles.button_icon} /> {text}
        </button>
    )

}