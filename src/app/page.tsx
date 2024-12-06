'use client'

import SubHeader from "@/components/sub_header/SubHeader";
import layoutCollection from "@/layout/layout_collection";
import { useCallback, useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, SpringOptions, useSpring } from "motion/react"
import ResizeObserver from "resize-observer-polyfill";

export default function Home() {
  // Layout Collection
  const [layoutCollectionState, setLayoutCollectionState] = useState(layoutCollection)

  // Momentum scrolling https://medium.com/@d_vsh/craft-a-smooth-momentum-scrolling-experience-with-react-and-framer-motion-72533d3cfc92
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollableHeight, setScrollableHeight] = useState<number>(0);

  const resizeScrollableHeight = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setScrollableHeight(entry.contentRect.height);
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      resizeScrollableHeight(entries)
    );
    scrollRef.current && resizeObserver.observe(scrollRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const { scrollY } = useScroll();
  const negativeScrollY = useTransform(
    scrollY,
    [0, scrollableHeight],
    [0, -scrollableHeight]
  );

  const springPhysics: SpringOptions = {
    damping: 40,
    mass: 0.1,
    stiffness: 100,
    bounce: 0.4,
    duration: 0.4,
    velocity: 400,
  };

  const springNegativeScrollY = useSpring(negativeScrollY, springPhysics);

  /*  END OF SCROLLING IMPLEMENTATION */

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

      <motion.div
        ref={scrollRef}
        style={{
          y: springNegativeScrollY,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          overflow: "hidden",
          willChange: "transform",
        }}
      className="scroll-container"
      >
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

    </motion.div >

      <div style={{ height: scrollableHeight }} />

    </>
  );
}
