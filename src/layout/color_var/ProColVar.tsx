'use client'
import styles from "./ProColBar.module.scss";
import ProductVariation from "@/components/variations/ProductVariations";
import {useMemo} from 'react'

/* PRODUCT COLOR IMAGES */

/* MAIN IMAGES */
import MainImageRed from "../../assets/images/color_var/Red Organic.png";
import MainImageBrown from "../../assets/images/color_var/Brown.png";
import MainImageLGrey from "../../assets/images/color_var/Light Grey.png";
import MainImageOrganic from "../../assets/images/color_var/Organic.png";

/* HOVER IMAGES */
import HoverImageRed from "../../assets/images/color_var/Red Organic_S.png";
import HoverImageBrown from "../../assets/images/color_var/Brown_S.png";
import HoverImageLGrey from "../../assets/images/color_var/Light Grey_S.png";
import HoverImageOrganic from "../../assets/images/color_var/Organic_S.png";
import { StaticImageData } from "next/image";


const ProColVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {

    /* Images under different categories */
    type ImageSet = {
        [key: string]: Array<[StaticImageData, string]>
    };

    const imageSet = useMemo(()=>{
        /* RETRIEVE IMAGE URLS FROM STORAGE LOCATION, BUT DONT LOAD YET */

        const dynamicImageSet: ImageSet = {
            top: [
                [MainImageRed, "Italiano Rose", HoverImageRed],
                [MainImageBrown, "Sugar Coated Almond", HoverImageBrown],
                [MainImageOrganic, "Park Avenue", HoverImageOrganic],
                [MainImageLGrey, "Greek Isles", HoverImageLGrey]
            ]
        }

        return dynamicImageSet;

    },[])

    return (
        <ProductVariation
            layoutName={layoutName}
            handleChangeSlide={handleChangeSlide}
            handleLayoutLoad={handleLayoutLoad}
            imageSet={imageSet}
            title="Product Color Variations"
        />
    );
}

export default ProColVar
