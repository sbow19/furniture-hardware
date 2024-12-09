import PopUp from "@/components/pop_up/PopUp";

import styles from "./ShowCase.module.scss";

type ShowCaseProps = {
    heading?: "Lifestyle Scenes";
}

export default function ShowCase({ heading }: ShowCaseProps) {
    return (
        <div className={
            styles.showcase
        }>
            {heading && <h3 className={styles.showcase_heading}>{heading}</h3>}
            <div className={styles.showcase_pop}>
                {/* <PopUp /> */}
            </div>
        </div>
    );
}
