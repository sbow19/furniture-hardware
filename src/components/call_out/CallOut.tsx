import styles from "./CallOut.module.scss";

type CallOutProps =
    | {
        heading: "Close Up Shots" | "Group Shots" | "Product Exploded View" | "Dimension Images" | "Installation Images" | "Flat Lay Images";
        paragraph?: never;
        modifier?: never
    } | {
        paragraph: string;
        heading?: never;
        modifier?: keyof typeof styles;
    }

export default function CallOut({ heading, paragraph, modifier }: CallOutProps) {
    return (
        <div className={styles.call_container}>
            {heading && <h3 className={styles.call_heading}>{heading}</h3>}
            {paragraph && <p className={`${styles.call_paragraph} ${modifier ? styles[modifier] : ''}`}>{paragraph}</p>}
        </div>
    );
}