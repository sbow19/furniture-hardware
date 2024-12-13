'use client'
import Link from "next/link";
import styles from "./SubHeader.module.scss";
import TulfaSubheaderStyleOne from "@/assets/icons/tulfa_icon_1";
import TulfaSubheaderStyleTwo from "@/assets/icons/tulfa_icon_2";
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useEffect, useState } from "react";
import useWindowSize from "@/hooks/use_window_size";
import { TulfaDownArrow } from "@/assets/icons/tulfa_nav_arrows";



type SubHeaderProps = {
    activePage: "/" | "/product_videos" | "/immersive_experience" | "/happiest_costumers";
    headerStyleType: 0 | 1 | 2;
}

export default function SubHeader({
    activePage,
    headerStyleType
}: SubHeaderProps) {
    const navLinks = [
        { href: "/", label: "Product Images" },
        { href: "/product_videos", label: "Product Videos" },
        { href: "/immersive_experience", label: "Immersive Experience" },
        // { href: "/happiest_costumers", label: "Happiest Costumers" },
    ];

    let headerStyle = "";
    let headerFontColor = "";
    let headerLinkActivated = "";
    let headerLinkDisabled = "";
    let TulfaIcon: JSX.Element = "";
    let arrowFill = "#433E99";

    switch (headerStyleType) {
        case 0:
            headerStyle = styles.subheader_style_1;
            headerFontColor = styles.subheader_font_color_1;
            headerLinkActivated = styles.subheader_nav_activated_1;
            headerLinkDisabled = styles.subheader_nav_disabled_1;
            TulfaIcon = TulfaSubheaderStyleOne;
            
            break
        case 1:
            headerStyle = styles.subheader_style_2;
            headerFontColor = styles.subheader_font_color_2;
            headerLinkActivated = styles.subheader_nav_activated_2;
            headerLinkDisabled = styles.subheader_nav_disabled_2;
            TulfaIcon = TulfaSubheaderStyleTwo;
            break
        case 2:
            headerStyle = styles.subheader_style_3;
            headerFontColor = styles.subheader_font_color_1;
            headerLinkActivated = styles.subheader_nav_activated_1;
            headerLinkDisabled = styles.subheader_nav_disabled_1;
            TulfaIcon = TulfaSubheaderStyleOne;
            arrowFill = "transparent"
            break
        default:
            break
    }



    /* SCROLLING */
    const headerRef = useRef(null);

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {

        const handleScroll = (e) => {

            if (e.deltaY > 0) {
                // If scrolling down...
                setIsVisible(false);

            } else if (e.deltaY < 0) {
                // If scrolling up
                setIsVisible(true)
            }
        }

        const handleClick = (e) => {

            if (e.target.closest('.trigger_header_button')) {
                setIsVisible(false)
            } else if (e.target.closest('.disable_trigger_header_button')) {
                return
            } else {
                setIsVisible(prev => !prev)
            }


        }

        if (typeof document !== 'undefined') {
            document.addEventListener("wheel", handleScroll, {capture: true});
            document.addEventListener("click", handleClick, {capture: true});

            // Cleanup the event listeners when the component unmounts
            return () => {
                document.removeEventListener("wheel", handleScroll);
                document.removeEventListener("click", handleClick);
            };
        }

    }, [])

    /* DEVICE SIZE  */
    const viewportSize = useWindowSize();

    const [headerActivated, setHeaderActivated] = useState(false);

    return (
        <>

            <motion.header
                ref={headerRef}
                className={`${styles.subheader_container} ${headerStyle}`}
                initial={{ top: '-10vh' }}
                animate={{ top: isVisible ? 0 : '-10vh' }}
                transition={{
                    type: "spring",
                    damping: 20,
                    velocity: 100

                }}
            >

                <div
                    className={styles.subheader_inner_container}

                >
                    <motion.div
                        className={styles.subheader_heading_container}
                        animate={{
                            transform: (headerActivated && viewportSize.width < 720 && viewportSize.width > 500) ? `translateX(-15vw)` : null
                        }}
                    >
                        <h3 className={
                            `${styles.subheader_heading} ${headerFontColor}`
                        }>
                            {/* LOGO SVG */}
                            <TulfaIcon
                                height={30}
                                width={120}
                            />

                        </h3>
                    </motion.div>


                    <motion.nav
                        className={styles.subheader_nav}
                        animate={{
                            transform: (headerActivated && viewportSize.width < 720 && viewportSize.width > 500) ? `translateX(15vw)` : null
                        }}
                    >

                        {/* LAPTOPS */}
                        {viewportSize.width > 720 && <div>
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={
                                        activePage === href
                                            ? headerLinkActivated
                                            : headerLinkDisabled
                                    }
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                        }

                        {/* MOBILE DEVICES */}
                        {viewportSize.width < 720 &&

                            <>
                                <motion.div
                                    className={styles.dropdown_arrow}
                                    initial={{
                                        rotate: 0
                                    }}
                                    animate={
                                        {
                                            rotate: headerActivated ? 180 : 0
                                        }
                                    }
                                >
                                    <TulfaDownArrow
                                        height={30}
                                        width={30}
                                        fill={arrowFill}
                                        arrowColor="#FFF"
                                        handleClick={() => {
                                            setHeaderActivated(prev => !prev)
                                        }}
                                    />

                                </motion.div>


                            </>
                        }

                        <button
                            className={styles.book_demo}
                        >Book a demo</button>
                    </motion.nav>

                    {/* DROPDOWN BAR */}
                    <motion.div
                        className={styles.dropdown_bar}
                        animate={{
                            transform: headerActivated ? `translateY(37vh)` : 'translateY(-30vh)'
                        }}
                        transition={{
                            type: 'spring',
                            damping: 40,
                            duration: 0.2
                        }}
                    >
                        {navLinks.map(({ href, label }) => (
                            <AnimatePresence
                                key={href}

                            >
                                <motion.div
                                   
                                    initial={{ opacity: 0 }}  // Start with opacity 0
                                    whileInView={{ opacity: 1 }}  // Fade in to opacity 1 when in view
                                    transition={{ duration: 0.2}}
                                    exit={{ opacity: 0 }} 
                                    style={{
                                        width: "100%",
                                        height: '100%'
                                    }}
                                >
                                    <Link

                                        href={href}
                                        className={
                                            activePage === href
                                                ? headerLinkActivated
                                                : headerLinkDisabled
                                        }
                                        style={{
                                            textAlign: 'left',
                                            width: '80%',
                                            paddingLeft: "15vw"
                                        }}
                                    >
                                        {label}
                                    </Link>
                                </motion.div>
                            </AnimatePresence>
                        ))}

                    </motion.div>

                </div>


            </motion.header>
        </>
    );
}
