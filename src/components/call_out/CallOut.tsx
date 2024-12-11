import styles from "./CallOut.module.scss";

type CallOutProps =
    | {
        heading: "Close Up Shots" | "Group Shots" | "Product Exploded View" | "Dimension Images" | "Installation Images" | "Flat Lay Images";
        paragraph?: never;
        modifier?: never
        calloutStyleType?: 0 | 1
    } | {
        paragraph: string;
        heading?: never;
        modifier?: keyof typeof styles;
        calloutStyleType?: 0 | 1
    }
    

export default function CallOut({ heading, paragraph, modifier, calloutStyleType }: CallOutProps) {
    
    let calloutStyle = '';
    switch(calloutStyleType){
        case 0:
            calloutStyle = styles.callout_style_1
            break
        case 1:
            calloutStyle = styles.callout_style_2
            break
        default:
            break
    }
    
    
    return (
        <div 
            className={`${styles.call_container} ${calloutStyle}`}
            
        >
            {heading && <h3 className={styles.call_heading}>{heading}</h3>}
            {paragraph && <p className={`${styles.call_paragraph} ${modifier ? styles[modifier] : ''}`}>{paragraph}</p>}
        </div>
    );
}