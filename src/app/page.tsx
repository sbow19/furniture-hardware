'use client'

import SubHeader from "@/components/sub_header/SubHeader";
import layoutCollection from "@/layout/layout_collection";
import { useCallback, useState } from "react";

export default function Home() {
  // Layout Collection
  const [layoutCollectionState, setLayoutCollectionState] = useState(layoutCollection)

  // Load next slide based on 
  const handleLayoutLoad = useCallback((layoutName: number) => {

    // Calculate next layout name
    const nextLayoutName = layoutName + 1;

    if (layoutCollectionState[nextLayoutName].layoutRendered) {
      // Do nothing if layout already rendered
    } else if (!layoutCollectionState[nextLayoutName].layoutRendered) {
      const updatedLayoutCollection = {
        ...layoutCollectionState,
        [nextLayoutName]: {
          ...layoutCollectionState[nextLayoutName],
          layoutRendered: true,
        },
      };
      setLayoutCollectionState(updatedLayoutCollection);
    }
  }, []);

  return (
    <>
      {/* STICKY AT TOP - TO ANIMATE */}
      <SubHeader activePage="/" />

      {/* MOST RECENT COMPONENTS RENDERED */}
      {
        layoutCollection.order.map((compName) => {
          if (!layoutCollection[compName].layoutRendered) {
            return null
          }
          const NextComp = layoutCollection[compName].component;
          return (
            <NextComp
              key={compName}
              handleLayoutLoad={handleLayoutLoad}
            />
          )
        })
      }
    </>
  );
}
