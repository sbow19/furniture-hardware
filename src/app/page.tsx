'use client'

import SubHeader from "@/components/sub_header/SubHeader";
import layoutCollection from "@/layout/layout_collection";
import { useCallback, useState } from "react";
import { motion } from "motion/react"

export default function Home() {
  // Layout Collection
  const [layoutCollectionState, setLayoutCollectionState] = useState(layoutCollection)

  // Load next slide based on 
  const handleLayoutLoad = useCallback((layoutName: number) => {

    setLayoutCollectionState((prevLayoutCollectionState) => {
      // Calculate next layout name
      const nextLayoutName = layoutName + 1;
      if (nextLayoutName >= layoutCollection.order.length) {
        return prevLayoutCollectionState
      }

      if (prevLayoutCollectionState[nextLayoutName].layoutRendered) {
        // Do nothing if layout already rendered
        return prevLayoutCollectionState
      }
      else if (!prevLayoutCollectionState[nextLayoutName].layoutRendered) {
        const updatedLayoutCollection = {
          ...prevLayoutCollectionState,
          [nextLayoutName]: {
            ...prevLayoutCollectionState[nextLayoutName],
            layoutRendered: true,
          },
        };
        return updatedLayoutCollection;
      }
    })

  }, []);



  return (
    <>
      {/* STICKY AT TOP - TO ANIMATE */}
      <SubHeader activePage="/" />

      {/* MOST RECENT COMPONENTS RENDERED */}
      {
        layoutCollectionState.order.map((compName) => {

          if (!layoutCollectionState[compName].layoutRendered) {
            return null
          }
          const NextComp = layoutCollectionState[compName].component;
          return (
            <motion.div
              key={compName}
              initial={{ opacity: 0 }} // Initial state
              animate={{ opacity: 1 }} // Animated state
              transition={{ duration: 1, delay: 2 }} // Duration of animation
            >
              <NextComp
               
                layoutName={compName}
                handleLayoutLoad={handleLayoutLoad}
              />
            </motion.div>
          )
        })
      }
    </>
  );
}
