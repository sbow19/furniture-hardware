import SubHeader from "@/components/sub_header/SubHeader";
import Banner from "@/layout/banner/Banner";
import CtaPrimary from "@/layout/cta_primary/CtaPrimary";
import CtaSecondary from "@/layout/cta_secondary/CtaSecondary";

export default function Home() {
  return (
    <>
      <SubHeader />
      <Banner />
      <CtaPrimary />
      <CtaSecondary />
    </>
  );
}
