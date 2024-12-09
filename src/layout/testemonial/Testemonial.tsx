'use client'
import { Manrope } from "next/font/google"
import styles from "./Testemonial.module.scss";
import Image from 'next/image';
import profileImage from "../../assets/images/testemonial/profile.png";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'

const manrope = Manrope({
    weight: ["400", "500"],
    subsets: ["latin"]
})

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const Testemonial:React.FC<LayoutProps> =({
    layoutName,
    handleLayoutLoad
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);


    return (
        <motion.section 
            className={`${styles.testemonial_container} ${manrope.className}`} 
            ref={containerRef}
            initial={{ transform: "translateY(20px)" }}
            whileInView={{ transform: "translateY(0px)" }}
            transition={{ type: "spring", delay: 2, stiffness: 100, damping: 50, mass:0.1 }}
        >
            <div className={styles.testemonial_content}>
                <div className={styles.testemonial_content_icon} />
                <div className={styles.testemonial_content_card}>
                    <div className={styles.testemonial_content_card_icon} />
                    <div className={styles.testemonial_content_card_left}>
                        <p className={styles.testemonial_content_card_left_paragraph}>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                            Velit officia consequat duis enim velit mollit.
                            Exercitation veniam consequat sunt nostrud amet.
                        </p>
                        <div>
                            <h4 className={styles.testemonial_content_card_left_heading}>
                                Jhon Doe
                            </h4>
                            <span className={styles.testemonial_content_card_left_span}>
                                Chief Executive Officer - deWALT
                            </span>
                        </div>
                    </div>
                    <div className={styles.testemonial_content_card_right}>
                        <Image
                            src={profileImage}
                            alt=''
                            className={styles.testemonial_content_card_right_image}
                            priority
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default Testemonial;