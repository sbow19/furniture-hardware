'use client'
import ShowCase from "@/components/showcase/ShowCase";
import Image from 'next/image';
import Button from '@/components/button/Button'
import lifeStyleScenesImage from "../../assets/images/lifestyle_scenes/background.png";
import styles from "./LifeStyleScenes.module.scss";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from "react";
import useWindowSize from "@/hooks/use_window_size";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const LifeStyleScenes: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleScrollStopped
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    // Momentum scrolling https://medium.com/@d_vsh/craft-a-smooth-momentum-scrolling-experience-with-react-and-framer-motion-72533d3cfc92
    const scrollRef = useRef<HTMLDivElement>(null);

    const viewportHeight = useWindowSize();

    const { scrollY } = useScroll({
        target: scrollRef
    });

    /* Scroll animated values */
    const scale = useTransform(
        scrollY,
        [0, viewportHeight.height],
        [1.75, 1]
    )

    useEffect(()=>{

        /* Switch off default page scroll */
        handleScrollStopped(true)
    }, [])

    return (
        <>
            <motion.div
                ref={scrollRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    overflow: 'hidden',
                    zIndex: 99
                }}
                className={styles.scroll_container}
            >
                <motion.section
                    className={styles.lifestyle_container}
                    ref={containerRef}
                >
                    <motion.div
                        style={{
                            scale: scale,
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <Image
                            src={lifeStyleScenesImage}
                            alt=''
                            priority
                            className={styles.lifestyle_image}

                        />
                    </motion.div>

                    <motion.div

                    >
                        <ShowCase
                            heading="Lifestyle Scenes"
                        />
                    </motion.div>


                    <Button
                        text="Take a closer look"
                        modifier="p-color"
                        buttonType={1}
                        onClick={() => { }}
                    />
                </motion.section>
            </motion.div>

            <div style={{ height: viewportHeight.height
             }} />
        </>
    );
}

export default LifeStyleScenes;
