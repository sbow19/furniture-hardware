'use client'
import Image from "next/image";
import { memo, useRef, useEffect, useCallback } from 'react'
import styles from './image_container.module.scss'

const ImageContainer = memo(({
    imageSrc,
    fullscreenToggle,
    imageStyles,
    imageClassName,
    priority
}) => {

    const elementRef = useRef<HTMLDivElement | null>(null);
    const fullscreenRef = useRef<boolean>(false);

    // Function to handle fullscreen changes (without re-rendering the component)
    const handleFullscreenChange = () => {
        if (document.fullscreenElement) {
            fullscreenRef.current = true;
        } else {
            fullscreenRef.current = false;
        }
    };

    // Request fullscreen mode with vendor prefixes (same as before)
    const enterFullscreen = () => {
        if (elementRef.current) {
            if (elementRef.current.requestFullscreen) {
                elementRef.current.requestFullscreen();
            } else if (elementRef.current.mozRequestFullScreen) { // Firefox
                elementRef.current.mozRequestFullScreen();
            } else if (elementRef.current.webkitRequestFullscreen) { // Chrome, Safari
                elementRef.current.webkitRequestFullscreen();
            } else if (elementRef.current.msRequestFullscreen) { // IE/Edge
                elementRef.current.msRequestFullscreen();
            }
        }
    };

    // Exit fullscreen mode (same as before)
    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    };

    // Toggle fullscreen mode based on current state
    const toggleFullscreen = useCallback(() => {
        if (fullscreenRef.current) {
            exitFullscreen();
        } else {
            enterFullscreen();
        }
    }, []);

    // Set up fullscreen change listener
    // Setup fullscreen event listeners without affecting component state
    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Safari
        document.addEventListener('mozfullscreenchange', handleFullscreenChange); // Firefox
        document.addEventListener('MSFullscreenChange', handleFullscreenChange); // IE/Edge

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);


    return (
        <>
            <Image
                src={imageSrc}
                alt=""
                style={imageStyles}
                className={`${imageClassName} ${styles.indiv_image}`}
                priority={priority}
                ref={elementRef}
                onClick={toggleFullscreen}
            />
        </>
    )
})

ImageContainer.displayName = "image container"

export default ImageContainer;