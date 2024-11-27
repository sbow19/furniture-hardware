import styles from "./Card.module.scss";

type CardProps = {
    heading: string;
    date: string;
    paragraph: string;
    modifier: keyof typeof styles;
}

export default function Card({ heading, date, paragraph, modifier }: CardProps) {
    return (
        <section className={styles.card_container}>
            <div className={`${styles.card_image} ${styles[modifier]}`} />
            <div className={styles.card_header}>
                <h5 className={styles.card_header_heading}>
                    {heading}
                </h5>
                <div className={styles.card_header_date}>
                    <div className={styles.card_header_date_icon} />
                    <span className={styles.card_header_date_written}>
                        {date}
                    </span>
                </div>
            </div>
            <p className={styles.card_paragraph}>
                {paragraph}
            </p>
        </section>
    );
}
