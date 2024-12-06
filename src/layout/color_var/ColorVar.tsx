'use client'
import styles from "./ColorVar.module.scss";
import Image, { StaticImageData } from 'next/image';
import ColorVariation from "@/components/color_var/ColorVaration";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion';

/* LEFT IMAGES */
import leftImageRed from "../../assets/images/color_var/Red Organic.png";
import leftImageBrown from "../../assets/images/color_var/Brown.png";
import leftImageLGrey from "../../assets/images/color_var/Light Grey.png";
import leftImageOrganic from "../../assets/images/color_var/Organic.png";
import leftImagePGreen from "../../assets/images/color_var/Pine Green.png";

/* RIGHT IMAGES */
import rightImageRed from "../../assets/images/color_var/Red Organic_S.png";
import rightImageBrown from "../../assets/images/color_var/Brown_S.png";
import rightImageLGrey from "../../assets/images/color_var/Light Grey_S.png";
import rightImageOrganic from "../../assets/images/color_var/Organic_S.png";
import rightImagePGreen from "../../assets/images/color_var/Pine Green_S.png";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

type ColorVarImageSet = {
    [key: string]: {
        left: StaticImageData,
        right: StaticImageData,
        buttonColor: string
        buttonFilter: string
    }
};

const colorVarImageSet: ColorVarImageSet = {
    red: {
        right: rightImageRed,
        left: leftImageRed,
        buttonColor: styles.color_left_filter_five,
        buttonFilter: styles.fifth_semicircle
    },
    brown: {
        right: rightImageBrown,
        left: leftImageBrown,
        buttonColor: styles.color_left_filter_one,
        buttonFilter: styles.first_semicircle
    },
    lGrey: {
        right: rightImageLGrey,
        left: leftImageLGrey,
        buttonColor: styles.color_left_filter_two,
        buttonFilter: styles.second_semicircle
    },
    organic: {
        right: rightImageOrganic,
        left: leftImageOrganic,
        buttonColor: styles.color_left_filter_three,
        buttonFilter: styles.third_semicircle
    },
    pGreen: {
        right: rightImagePGreen,
        left: leftImagePGreen,
        buttonColor: styles.color_left_filter_four,
        buttonFilter: styles.fourth_semicircle
    }

}



const ColorVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.color_container} ref={containerRef}>
           <ColorVariation 
                imageSet={colorVarImageSet}
           /> 
        </motion.section>
    );
}

export default ColorVar;
