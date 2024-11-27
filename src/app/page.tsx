import SubHeader from "@/components/sub_header/SubHeader";
import Banner from "@/layout/banner/Banner";
import ColorVar from "@/layout/color_var/ColorVar";
import CtaPrimary from "@/layout/cta_primary/CtaPrimary";
import CtaSecondary from "@/layout/cta_secondary/CtaSecondary";
import CtaTertiary from "@/layout/cta_tertiary/CtaTertiary";
import FabricVar from "@/layout/fabric_var/FabricVar";
import FunctionalityImages from "@/layout/functionality_images/FunctionalityImages";
import LifeStyleScenes from "@/layout/lifestyle_scenes/LifeStyleScenes";
import MaterialVar from "@/layout/material_var/MaterialVar";
import SiloImages from "@/layout/silo_images/SiloImages";
import SizeVar from "@/layout/size_var/SizeVar";
import Testemonial from "@/layout/testemonial/Testemonial";

export default function Home() {
  return (
    <>
      <SubHeader />
      <Banner />
      <CtaPrimary />
      <CtaSecondary />
      <CtaTertiary />
      <SiloImages />
      <SizeVar />
      <ColorVar />
      <FabricVar />
      <MaterialVar />
      <Testemonial />
      <LifeStyleScenes />
      <FunctionalityImages />
    </>
  );
}
