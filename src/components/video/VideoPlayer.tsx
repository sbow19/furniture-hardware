import React, { memo, useEffect, useRef, useMemo, useState } from 'react';
import styles from "./VideoPlayer.module.scss";
import useWindowSize from '@/hooks/use_window_size';
import ScrollMovement from '@/utils/scroll_physics';

const VideoPlayer = memo(({
  src,
  type,
  altText,
  onVideoComplete,
  scrub,
  scrubOptions,
  onScrollEndHandler
}) => {

  const videoContainerRef = useRef(null);

  const videoRef = useRef(null)

  const scrollTargetRef = useRef(null)

  /*GPT SOLUTION */
  const [isScrub, setIsScrub] = useState(false); // Manage whether scrub is active
  const [scrollPercentage, setScrollPercentage] = useState(0); // Store scroll progress
  // Ref to store the animation frame ID
  const animationFrameIdRef = useRef(null);
  useEffect(() => {

    const handleScroll = (e) => {
      const videoContainer = videoContainerRef.current;
      const scrollHeight = videoContainer.scrollHeight;
      const distance = videoContainer.scrollTop;

      let percentage = distance / scrollHeight;
      percentage = Math.max(0, percentage);
      percentage = Math.min(percentage, 1);

      setScrollPercentage(percentage); // Update the scroll progress state
    };

    if (isScrub) {
      const videoContainer = videoContainerRef.current;
      videoContainer.addEventListener('wheel', handleScroll);
    }

    return () => {
      if (isScrub) {
        const videoContainer = videoContainerRef.current;
        videoContainer.removeEventListener('wheel', handleScroll);
      }
    };
  }, [isScrub]);

  useEffect(() => {
     console.log("Scroll Percentage updated")
    // Update the video currentTime smoothly based on scroll percentage
    const updateVideoProgress = () => {
      const video = videoRef.current;
      const percentage = scrollPercentage;

      if (video && video.duration > 0) {
        // Using requestAnimationFrame for smooth updates
        video.currentTime = video.duration * percentage;
        
        animationFrameIdRef.current = requestAnimationFrame(updateVideoProgress); // Recursively call for smooth transition
      }
    };

    if (scrollPercentage > 0) {
      updateVideoProgress(); // Start updating the video progress when scrollPercentage changes
    } else {
      cancelAnimationFrame(animationFrameIdRef.current); // Clean up the animation frame if no scroll percentage
    }

    return () => cancelAnimationFrame(animationFrameIdRef.current); // Clean up when component unmounts or scroll percentage changes
  }, [scrollPercentage]);
  /*GPT SOLUTION */

  // Monitor scroll position and check if at top or bottom of component
  const isAtTopRef = useRef(true); // Ref for tracking if it's at the top
  const isAtBottomRef = useRef(false); // Ref for tracking if it's at the bottom
  const [isInView, setIsInView] = useState(false);

  // Calculate size of screen initially 
  const viewportSize = useWindowSize();
  const scrollHeight = useMemo(() => {

    // Height of element is 150%, therefore we  multiply viewport by 1.9 to get total scroll distance
    return viewportSize.height * 100;

  }, [viewportSize])

  useEffect(() => {
    const handleScroll = () => {
      const videoContainer = videoContainerRef.current;

      // If scroll container is available, check the scroll position
      if (videoContainer) {

        const scrollY = videoContainer.scrollTop;
        const containerHeight = videoContainer.clientHeight;

        // Check if we're at the top or bottom
        isAtTopRef.current = scrollY === 0;
        isAtBottomRef.current = scrollY + containerHeight >= scrollHeight - 1;
      }
    };
    // Add scroll event listener to track the scroll position
    const videoContainer = videoContainerRef.current;
    if (videoContainer) {
      videoContainer.addEventListener('wheel', handleScroll);
    }

    // Cleanup event listener on unmount
    return () => {
      if (videoContainer) {
        videoContainer.removeEventListener('wheel', handleScroll);
      }
    };
  }, [scrollHeight]);

  useEffect(() => {
    // IntersectionObserver logic to track if element is in view
    const observer = new IntersectionObserver(
      ([entry]) => {

        // Check if the element is in view and update state
        if (entry.target === videoContainerRef.current) {
          setIsInView(entry.isIntersecting);
          setIsScrub(true)
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in view
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current); // Start observing the element
    }
    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current); // Clean up observer
      }
    };
  }, []);

  useEffect(() => {
    // Define the wheel event handler
    const videoScroll = (e) => {
      // Event handler logic her      
      if (isInView) {

        if (e.deltaY > 0) {
          // Scrolled do

          if (isAtBottomRef.current) {

            onScrollEndHandler(1);
          };

        } else {
          // Scrolled up
          if (isAtTopRef.current) {

            onScrollEndHandler(-1)
          };
        }
      }
    };

    if (isInView) {
      // Apply the event listener after a 2-second delay
      videoContainerRef.current.addEventListener("wheel", videoScroll);
    } else {
      videoContainerRef.current.removeEventListener("wheel", videoScroll);
    }


  }, [isInView]); // Dependency array includes handleChangeSlide to ensure it's fresh if it changes

  return (
    <>
      <div
        className={styles.video_container}
        style={{
          height: '100vh',
          width: '100vw',
          overflowY: "scroll",
          position: 'absolute',
        }}
        ref={videoContainerRef}
      >
       
          <div
            style={{
              minHeight: viewportSize.height * 100,
              zIndex: 30,
              position: 'relative',
            }}
            ref={scrollTargetRef}
          ></div>

      </div>
      <div
        className={styles.video_holder}

      >
        <video
          controls={false}
          muted
          preload='auto'
          // autoPlay
          playsInline
          onEnded={onVideoComplete ?? null}
          ref={videoRef}
        >
          <source src={src} type={type} />
          Your browser does not support the video tag.
          {altText}
        </video>
      </div>
    </>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
