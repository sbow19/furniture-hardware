import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import styles from "./UpDownCarousel.module.scss";

type UpDownCarouselProps = {
    modifier: keyof typeof styles;
}

export default function UpDownCarousel({ modifier }: UpDownCarouselProps) {
    return (
        <div className={`${styles.carousel_container} ${styles[modifier]}`}>
            <div className={styles.carousel_arrows}>
                <button>
                    <BsArrowUp className={styles.carousel_arrow_up} />
                </button>
                <button>
                    <BsArrowDown className={styles.carousel_arrow_down} />
                </button>
            </div>
        </div>
    );
}
