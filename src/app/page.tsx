'use client'

import dynamic from "next/dynamic";
const SubHeader = dynamic(
  () => import("@/components/sub_header/SubHeader"),
  { ssr: false }
)
import layoutCollection from "@/layout/layout_collection";
import { useCallback, useState, useRef, useEffect } from "react";
import { motion } from "motion/react"
import useWindowSize from "@/hooks/use_window_size";
import {throttle} from 'lodash'

export default function Home() {
  // Layout Collection
  const [layoutCollectionState, setLayoutCollectionState] = useState(layoutCollection);

  const [ headerStyle, setHeaderStyle ] = useState(0);

  const windowSize = useWindowSize();

  const [currentSlide, setCurrentSlide] = useState({
    currentSlide: 0,
    previousSlide: 0
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleChangeSlide = useCallback((direction: number) => {
    // Clear any existing timeout before setting a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a timeout to handle the slide change after a delay
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide(prev => {
        if (prev.currentSlide + direction < 0) {
          return prev;
        } else if (prev.currentSlide + direction >= layoutCollectionState.order.length) {
          return prev;
        } else {
          return {
            currentSlide: prev.currentSlide + direction,
            previousSlide: prev.currentSlide
          };
        }
      });

      

    
    }, 100);
  }, [])

  useEffect(()=>{
    setHeaderStyle(layoutCollectionState[currentSlide.currentSlide].subheaderStyle)
  }, [currentSlide])

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

  useEffect(() => {
    // This will be our throttled scroll handler
    const handleWheel = throttle((event) => {
      // Prevent default scroll behavior (optional)
      event.preventDefault();

      // Adjust the scroll sensitivity for the trackpad (event.deltaY is the scroll amount)
      let scrollSpeed = 1; // Default speed for mouse wheel
      if (Math.abs(event.deltaY) > 10) {
        // If the event delta is too large (likely from trackpad), reduce sensitivity
        scrollSpeed = 0.1; // Adjust this value as needed
      }
      // Handle the scroll event (e.g., move content, change state, etc.)
      window.scrollBy(0, event.deltaY * scrollSpeed);
      
    }, 1000); // Throttle to run once every 100ms

    // Attach event listener for 'wheel' event
    window.addEventListener('scroll', handleWheel);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleWheel);
    };
  }, []);


  return (
    <>
      <SubHeader 
        activePage="/" 
        headerStyleType={headerStyle}
      />

      <motion.div
        // ref={scrollRef}
        style={{
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* MOST RECENT COMPONENTS RENDERED */}
        {
          layoutCollectionState.order.map((compName) => {

            if (!layoutCollectionState[compName].layoutRendered) {
              return null
            }

            if(compName > currentSlide.currentSlide + 1 || compName < currentSlide.currentSlide - 1){
              return null
            }

            const NextComp = layoutCollectionState[compName].component;

            // Determine whether the component falls eitehrside of current component
            const direction = compName - currentSlide.currentSlide;
            let modifier = 1;

            if (direction < 0) {
              modifier = -1
            }

            
            return (
              <motion.div
                key={compName}
                style={{
                  position: 'absolute',
                  width: "100%",
                  height: "100%"

                }}
                initial={{
                  opacity: 0,
                  y: currentSlide.currentSlide === compName ? 0 : modifier * windowSize.height,
                }}
                animate={{
                  opacity: currentSlide.currentSlide === compName ? 1 : 0,
                  y: currentSlide.currentSlide === compName ? 0 : modifier * windowSize.height
                }}
                transition={{
                  duration: 0.5
                }}
                
              >
                <NextComp
                  layoutName={compName}
                  handleLayoutLoad={handleLayoutLoad}
                  handleChangeSlide={handleChangeSlide}
                  currentSlide={currentSlide}
                />

              </motion.div>
            )
          })
        }

      </motion.div >
    </>
  );
}
