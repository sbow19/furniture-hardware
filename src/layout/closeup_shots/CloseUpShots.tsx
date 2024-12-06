'use client'
import CallOut from "@/components/call_out/CallOut";
// import ShowCase from "@/components/showcase/ShowCase";
import Button from '@/components/button/Button'
import Image from 'next/image';
import backgroundImageRender from "../../assets/images/closeup_shots/nitavparikh_upholstery_cleaning_closeup_--v_6.1_a6bab072-4445-4e1c-b8b3-07bf91d176c8_1.png"
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'
import styles from "./CloseUpShots.module.scss";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const CloseUpShots: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.close_container} ref={containerRef}>

            <CallOut heading="Close Up Shots" />
            <div className={styles.close_showcase}>
                <Image
                    src={backgroundImageRender}
                    alt=''
                    priority
                    className={styles.close_background}
                />

            </div>

            <div
                className={styles.close_button_container}
            >
                <Button
                    text="Take a closer look"
                    modifier="p-color"
                    buttonType={1}
                />
            </div>
        </motion.section>
    );
}

export default CloseUpShots;
