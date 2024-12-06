'use client'
import ShowCase from "@/components/showcase/ShowCase";
import Image from 'next/image';
import Button from '@/components/button/Button'
import lifeStyleScenesImage from "../../../public/images/lifestyle_scenes/background.png";
import styles from "./LifeStyleScenes.module.scss";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const LifeStyleScenes: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.lifestyle_container} ref={containerRef}>
            <Image
                src={lifeStyleScenesImage}
                alt=''
                priority
                className={styles.lifestyle_image}
            />
            <ShowCase heading="Lifestyle Scenes" />
            <Button
                text="Take a closer look"
                modifier="p-color"
                buttonType={1}
                onClick={()=>{}}
            />
        </motion.section>
    );
}

export default LifeStyleScenes;
