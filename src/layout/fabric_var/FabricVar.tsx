import styles from "./FabricVar.module.scss";
import Image from 'next/image';
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'
import lightLeatherRight from "/images/fabric_var/light_leather_right.tif";
import lightLeatherFabricCloseup from "/images/fabric_var/right.png";
/* FABRIC CHOICES */
import blueFabric from "/images/fabric_var/blue.png";
import grayFabric from "/images/fabric_var/gray.png";
import orangeFabric from "/images/fabric_var/orange.png";
import yellowFabric from "/images/fabric_var/yellow.png";
import greenFabric from "/images/fabric_var/green.png";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

const FabricVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad)

    return (
        <motion.section className={styles.fabric_container} ref={containerRef}>
            <div className={styles.fabric_left}>
                <Image
                    src={lightLeatherRight}
                    width={2000}
                    height={2000}
                    alt=''
                    className={styles.fabric_left_image}
                    priority
                />
            </div>
            <div className={styles.fabric_right}>
                <Image
                    src={lightLeatherFabricCloseup}
                    width={580}
                    height={832}
                    alt=''
                    className={styles.fabric_right_image}
                    priority
                />

                {/* SELECTION POPUP - REFACTOR OUT */}
                <div className={styles.fabrics}>
                    <button>
                        <span className={styles.fabrics_span}>
                            Prints
                        </span>
                        <div className={styles.fabrics_figure}>
                            <Image
                                src={blueFabric}
                                width={150}
                                height={78}
                                alt=''
                                className={styles.fabrics_figure_one}
                            />
                        </div>

                    </button>
                    <button>
                        <span className={styles.fabrics_span}>
                            Leathers
                        </span>
                        <div className={styles.fabrics_figure}>
                        <Image
                                src={yellowFabric}
                                width={150}
                                height={78}
                                alt=''
                                className={styles.fabrics_figure_two}
                            />
                        </div>
                    </button>
                    <button>
                        <span className={styles.fabrics_span}>
                            Embroidery
                        </span>
                        <div className={styles.fabrics_figure}>
                        <Image
                                src={orangeFabric}
                                width={150}
                                height={78}
                                alt=''
                                className={styles.fabrics_figure_three}
                            />
                        </div>
                    </button>
                    <button>
                        <span className={styles.fabrics_span}>
                            Velvets
                        </span>
                        <div className={styles.fabrics_figure}>
                        <Image
                                src={greenFabric}
                                width={150}
                                height={78}
                                alt=''
                                className={styles.fabrics_figure_four}
                            />
                        </div>
                    </button>
                    <button className={styles.fabrics_last}>
                        <span className={styles.fabrics_span}>
                            Plains
                        </span>
                        <div className={styles.fabrics_figure}>
                        <Image
                                src={grayFabric}
                                width={150}
                                height={78}
                                alt=''
                                className={styles.fabrics_figure_five}
                            />
                        </div>
                    </button>
                </div>
            </div>
        </motion.section>
    );
}

export default FabricVar;
