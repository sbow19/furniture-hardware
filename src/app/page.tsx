import SubHeader from "@/components/sub_header/SubHeader";
import layoutCollectionMemoized from "@/layout/layout_collection";

export default function Home() {
  return (
    <>
      <SubHeader activePage="/" />

      {/* MOST RECENT COMPONENTS RENDERED */}
      {
        Object.keys(layoutCollectionMemoized).map((compName, index)=>{
          const NextComp = layoutCollectionMemoized[compName];
          return (<NextComp key={index} />)
        })
      }      
    </>
  );
}
