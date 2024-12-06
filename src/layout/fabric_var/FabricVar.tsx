import styles from "./FabricVar.module.scss";
import { StaticImageData } from "next/image";
import useAutoScroll from "@/hooks/use_autoscroll";
import { motion } from 'framer-motion'
import DropdownVar from "@/components/dropdown_var/DropdownVar";
import { useMemo } from "react";

/* FABRIC CHOICES */
import printsSample from "../../assets/images/fabric_var/print_sample.png";
import printsLeft from "../../assets/images/fabric_var/Prints_as.jpg"

import plainsSample from "../../assets/images/fabric_var/plains_sample.png";
import plainsLeft from "../../assets/images/fabric_var/Plains_as.jpg"

import lLeatherSample from "../../assets/images/fabric_var/light_leather_sample.png";
import lLeatherLeft from "../../assets/images/fabric_var/light_leather_right.tif"

import embroiderySample from "../../assets/images/fabric_var/embroidery_sample.png";
import embroideryLeft from "../../assets/images/fabric_var/Embroidery_as.jpg";

import velvetSample from "../../assets/images/fabric_var/velvet_sample.png";
import velvetLeft from "../../assets/images/fabric_var/Velvets_as.jpg";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}

type DropdownVarSet = {
    [key: string]: {
        left: {
            imageData: StaticImageData,
            width?: number
            height?: number
        },
        right: {
            imageData: StaticImageData,
            width?: number
            height?: number
        },
        choiceImage: {
            imageData: StaticImageData,
            width?: number
            height?: number
        }
        choiceName: string

    },
    
};




const FabricVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoScroll(layoutName, handleLayoutLoad)

    const dropDownVarSet: DropdownVarSet = useMemo(()=>{
    
        const myObject = {
            embroidery: {
                left: {
                    imageData: embroideryLeft
                },
                right: {
                    imageData: embroiderySample
                },
                choiceImage: {
                    imageData: embroiderySample
                },
                choiceName: "Embroidery"
            },
            lLeather: {
                left: {
                    imageData: lLeatherLeft,
                    width: 128,
                    height: 128
                },
                right: {
                    imageData: lLeatherSample,
                    width: 128,
                    height: 128
                },
                choiceImage: {
                    imageData: lLeatherSample,
                    width: 128,
                    height: 128
                },
                choiceName: "Light Leather"
            },
            prints: {
                left: {
                    imageData: printsLeft
                },
                right: {
                    imageData: printsSample
                },
                choiceImage: {
                    imageData: printsSample
                },
                choiceName: "Prints"
            },
            plains: {
                left: {
                    imageData:plainsLeft
                    
                },
                right: {
                    imageData: plainsSample
                },
                choiceImage: {
                    imageData: plainsSample
                },
                choiceName: "Plains"
            },
            velvets: {
                left: {
                    imageData: velvetLeft
                },
                right: {
                    imageData: velvetSample
                },
                choiceImage: {
                    imageData: velvetSample
                },
                choiceName: "Velvets"
            }
        }
    
        return myObject
    
    }, [])

    return (
        <motion.section className={styles.variation_container} ref={containerRef}>
            <DropdownVar
                variationSet={dropDownVarSet}
                defaultVar={"lLeather"}
            />
        </motion.section>
    );
}

export default FabricVar;
