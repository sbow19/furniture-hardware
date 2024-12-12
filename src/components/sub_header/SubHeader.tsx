'use client'
import Link from "next/link";
import styles from "./SubHeader.module.scss";
import TulfaSubheaderStyleOne from "@/assets/icons/tulfa_icon_1";
import TulfaSubheaderStyleTwo from "@/assets/icons/tulfa_icon_2";
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from "react";



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

            /* DISABLE TOGGLE */
            if(e.target.closest('.trigger_header_button')){
                setIsVisible(false)
            } else {
                setIsVisible(prev=>!prev)
            }

            
        }

        // if (typeof document !== 'undefined') {
        //     document.addEventListener("wheel", handleScroll);
        //     document.addEventListener("click", handleClick);

        //     // Cleanup the event listeners when the component unmounts
        //     return () => {
        //         document.removeEventListener("wheel", handleScroll);
        //         document.removeEventListener("click", handleClick);
        //     };
        // }

    }, [])

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
                    <div
                        className={styles.subheader_heading_container}
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
                    </div>


                    <nav className={styles.subheader_nav}>

                        <div>
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



                        <button>Book a demo</button>
                    </nav>
                </div>


            </motion.header>
        </>
    );
}
