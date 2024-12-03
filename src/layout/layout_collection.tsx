
/**
 * Individual slides on the page.
 */
import Banner from "@/layout/banner/Banner";
import Blogs from "@/layout/blogs/Blogs";
import BookDemo from "@/layout/book_demo/BookDemo";
import CloseUpShots from "@/layout/closeup_shots/CloseUpShots";
import ColorVar from "@/layout/color_var/ColorVar";
import CtaPrimary from "@/layout/cta_primary/CtaPrimary";
import CtaSecondary from "@/layout/cta_secondary/CtaSecondary";
import CtaTertiary from "@/layout/cta_tertiary/CtaTertiary";
import DimensionImages from "@/layout/dimension_images/DimensionImages";
import FabricVar from "@/layout/fabric_var/FabricVar";
import FlatLayImages from "@/layout/flatlay_images/FlatLayImages";
import FunctionalityImages from "@/layout/functionality_images/FunctionalityImages";
import GroupShots from "@/layout/group_shots/GroupShots";
import InstallationImages from "@/layout/installation_images/InstallationImages";
import LifeStyleScenes from "@/layout/lifestyle_scenes/LifeStyleScenes";
import MarketingImages from "@/layout/marketing_images/MarketingImages";
import MaterialVar from "@/layout/material_var/MaterialVar";
import ProductExplodedView from "@/layout/product_exploded_view/ProductExplodedView";
import SiloImages from "@/layout/silo_images/SiloImages";
import SizeVar from "@/layout/size_var/SizeVar";
import Testemonial from "@/layout/testemonial/Testemonial";

/* Memoize components */
import { memoizeComponents } from "@/utils/memoize_components";

const layoutCollection: {
    [key: string]: React.FC;
  } = {
    Banner,
    Blogs,
    BookDemo,
    CloseUpShots,
    ColorVar,
    CtaPrimary,
    CtaSecondary,
    CtaTertiary,
    DimensionImages,
    FabricVar,
    FlatLayImages,
    FunctionalityImages,
    GroupShots,
    InstallationImages,
    LifeStyleScenes,
    MarketingImages,
    MaterialVar,
    ProductExplodedView,
    SiloImages,
    SizeVar,
    Testemonial
};

const layoutCollectionMemoized = memoizeComponents(layoutCollection);

export default layoutCollectionMemoized;