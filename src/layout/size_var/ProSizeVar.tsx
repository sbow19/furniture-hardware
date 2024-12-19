'use client'
import styles from "./ProSizeVar.module.scss";
import ProductVariation from "@/components/variations/ProductVariations";
import {useMemo} from 'react'

/* PRODUCT SIZE IMAGES */
import sixLights from "../../assets/images/size_var/6set_light_off.png";
import eightLights from "../../assets/images/size_var/8set_light_off.png";
import tenLights from "../../assets/images/size_var/10set_light_off.png";
import twelveLights from "../../assets/images/size_var/12set_light_off.png";

/* HOVER IMAGES */
import sixLightsHover from "../../assets/images/size_var/6set_light_on.png";
import eightLightsHover from "../../assets/images/size_var/8set_light_on.png";
import tenLightsHover from "../../assets/images/size_var/10set_light_on.png";
import twelveLightsHover from "../../assets/images/size_var/12set_light_on.png";
import { StaticImageData } from "next/image";


const ProSizeVar: React.FC<LayoutProps> = ({
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
                [sixLights, "Six Lights", sixLightsHover],
                [eightLights, "Eight Lights", eightLightsHover],
                [tenLights, "Ten Lights", tenLightsHover],
                [twelveLights, "Twelve Lights", twelveLightsHover]
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
            title="Product Size Variations"
        />
    );
}

export default ProSizeVar
