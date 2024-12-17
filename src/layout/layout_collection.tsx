
/**
 * Individual slides on the page.
 * */
'use client'
import Banner from "@/layout/banner/Banner";
import Blogs from "@/layout/blogs/Blogs";
import BookDemo from "@/layout/book_demo/BookDemo";
import CloseUpShots from "@/layout/closeup_shots/CloseUpShots";
import ColorVar from "@/layout/color_var/ColorVar";
import CtaTertiary from "@/layout/cta_tertiary/CtaTertiary";
import DimensionImages from "@/layout/dimension_images/DimensionImages";
import FabricVar from "@/layout/fabric_var/FabricVar";
import FlatLayImages from "@/layout/flatlay_images/FlatLayImages";
import GroupShots from "@/layout/group_shots/GroupShots";
import InstallationImages from "@/layout/installation_images/InstallationImages";
import LifeStyleScenes from "@/layout/lifestyle_scenes/LifeStyleScenes";
import MarketingImages from "@/layout/marketing_images/MarketingImages";
import MaterialVar from "@/layout/material_var/MaterialVar";
import SiloImages from "@/layout/silo_images/SiloImages";
import SizeVar from "@/layout/size_var/SizeVar";

/* Memoize components */
import { memoizeComponents } from "@/utils/memoize_components";

import structureLayouts from "@/utils/structure_layouts";

/* LAYOUT COLLECTION MUST BE IN DESIRED ORDER */
const layoutCollection: Array<[React.FC, number]> = [
    [Banner, 0],
    [SiloImages, 0],
    [LifeStyleScenes, 2],
    [CtaTertiary, 0],
    // [ColorVar, 0],
    // [FabricVar, 0],
    // [SizeVar, 0],
    // [MaterialVar, 0],
    // [CloseUpShots, 2],
    // [GroupShots, 2],
    // [DimensionImages, 0],
    // [InstallationImages, 0],
    // [FlatLayImages, 0],
    // [MarketingImages, 0],
    // [BookDemo, 0],
    // [Blogs, 0],
];

const layoutCollectionMemoized = memoizeComponents(layoutCollection);

const layoutCollectionStructured = structureLayouts(layoutCollectionMemoized);

// Set first comp to rendered
layoutCollectionStructured[0].layoutRendered = true;

export default layoutCollectionStructured;
				
			