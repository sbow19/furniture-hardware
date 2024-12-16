import VideoPlayer from "@/components/video/VideoPlayer"
import { AnimatePresence, motion } from 'framer-motion'
import ShowCase from "@/components/showcase/ShowCase";
import { useRef, useEffect, useState } from 'react'
import CallOut from "@/components/call_out/CallOut";
import Image from 'next/image';
import useWindowSize from "@/hooks/use_window_size";

import groupShotBackgroundImage from '../../../assets/images/group_shots/Firefly 20240929230829.png'

const LifeStyleBranch = () => {

    /* Initial Video Container Ref */
    const lifestyleContainerRef = useRef(null);

    const [isLifestyleContainerActive, setIsLifestyleContainerActive] = useState(true);

    const groupShotsContainerRef = useRef(null);

    const [isGroupContainerActive, setIsGroupContainerActive] = useState(false);

    const groupImagesRef = useRef(null);

    const [isGroupImagesActive, setIsGroupImagesActive] = useState(false);

    // Calculate size of screen initially 
    const viewportSize = useWindowSize();

    /*  */
    useEffect(() => {

        const lifestyleContainer = lifestyleContainerRef.current;

        const handlePageScrollTrigger = (e) => {
            /* Prevent default behaviour */
            e.preventDefault();

            if(e.deltaY > 0){
                
                setIsLifestyleContainerActive(false);
                setIsGroupContainerActive(true);
                lifestyleContainer.removeEventListener("wheel", handlePageScrollTrigger);
                
            } 
        
        }


        if (lifestyleContainer && isLifestyleContainerActive) {
            lifestyleContainer.addEventListener("wheel", handlePageScrollTrigger)
        }

        return (() => {
            const lifestyleContainer = lifestyleContainerRef.current;

            if (lifestyleContainer) {
                lifestyleContainer.removeEventListener("wheel", handlePageScrollTrigger)
            }
        })

    }, [isLifestyleContainerActive])
    

    useEffect(() => {

        const groupShotsContainer = groupShotsContainerRef.current;

        const handlePageScrollTriggerTwo = (e) => {

            /* Prevent default behaviour */
            e.preventDefault();

            if(e.deltaY > 0){
                setIsGroupContainerActive(false)
                setIsGroupImagesActive(true)
            } else {
                setIsLifestyleContainerActive(true);
                setIsGroupContainerActive(false);
                
            }
            groupShotsContainer.removeEventListener("wheel", handlePageScrollTriggerTwo)
        }

        if (isGroupContainerActive) {

            if (groupShotsContainer) {
                groupShotsContainer.addEventListener("wheel", handlePageScrollTriggerTwo)
            }

        }

        return (() => {
            const groupShotsContainer = groupShotsContainerRef.current;

            if (groupShotsContainer) {
                groupShotsContainer.removeEventListener("wheel", handlePageScrollTriggerTwo)
            }
        })

    }, [isGroupContainerActive])

    

    useEffect(() => {

        const groupImagesContainer = groupImagesRef.current;

        const handlePageScrollTriggerThree = (e) => {

            /* Prevent default behaviour */
            e.preventDefault();

            if(e.deltaY > 0){
                return
            } else {
                setIsGroupImagesActive(false);
                setIsGroupContainerActive(true);
                groupImagesContainer.removeEventListener("wheel", handlePageScrollTriggerThree)
            }
        }

        if (isGroupImagesActive) {
            if (groupImagesContainer) {
                groupImagesContainer.addEventListener("wheel", handlePageScrollTriggerThree)
            }

        }


        return (() => {
            const groupImagesContainer = groupImagesRef.current;

            if (groupImagesContainer) {
                groupImagesContainer.removeEventListener("wheel", handlePageScrollTriggerThree)
            }
        })

    }, [isGroupImagesActive])



    return (

        <>

            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1,
                    duration: 1
                }}

                style={{
                    height: isLifestyleContainerActive ? '100vh' : viewportSize.height * 3,
                    position: 'relative'
                }}

            >
                {/* INITIAL SCENE */}

                <motion.div
                    style={{
                        width: '100vw',
                        height: '100vh',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 30
                    }}
                    initial={{
                        transform: `scale(1.2)`
                    }}
                    animate={{
                        transform: isLifestyleContainerActive ? `scale(1.2)` : `scale(1) translateY(-70vh)`,
                        opacity: isGroupImagesActive ? 0 : 1,
                    }}
                    transition={{
                        duration: 0.7,
                    }}

                    ref={lifestyleContainerRef}
                >
                    <motion.div
                        style={{

                            width: '100vw',
                            height: '100vh',
                            backgroundColor: "rgba(0, 0, 0, 1)",
                            position: "relative",
                            zIndex: 1
                        }}

                    >
                        <div
                            style={{
                                position: 'absolute',
                                bottom: "10vh",
                                width: `100%`,
                                display: `flex`,
                                justifyItems: 'center',

                            }}
                        >

                            <ShowCase
                                heading="Lifestyle Scenes"
                                style={{
                                    left: `30vw`
                                }}

                            />
                        </div>

                        <motion.div>
                            <VideoPlayer
                                src='/videos/lifestyle/-b7fc-4a9b-80ad-780f951e5462.mp4'
                                type="video/mp4"
                                loop={true}
                                styleOverride={{
                                    zIndex: 0,
                                    position: 'absolute',
                                    opacity: 0.5
                                }}
                            >
                            </VideoPlayer>
                        </motion.div>

                    </motion.div>
                </motion.div>

                {/* Group shots container */}
                <motion.div
                    ref={groupShotsContainerRef}
                    initial={{
                        transform: `translateY(30vh)`,
                        opacity: 0,
                        backgroundColor: 'white'
                    }}
                    animate={{
                        transform: 'translateY(30vh)',
                        opacity: isGroupContainerActive || isGroupImagesActive ? 1 : 0,
                        zIndex: isGroupContainerActive ? 1000 : 0,
                    }}
                    transition={{
                        duration: 0.7
                    }}

                    style={{
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <CallOut
                        paragraph="Showcase your furniture in thousands of beautiful designed room setups - without moving a thing or touching the camera"
                        modifier="mw-768"
                        calloutStyleType={2}

                    />


                    {/* GROUP SHOTS ELEMENT */}

                    <motion.div
                        style={{
                            height: '100% ',
                            zIndex: 100
                        }}
                        initial={{
                            scale: 1.2,
                            y: 100
                        }}
                        animate={{
                            scale: isGroupImagesActive ? 1 : 1.2,
                            y: isGroupImagesActive ? `-60vh` : 100,
                            transition: {
                                duration: 0.5
                            }
                        }}
                        ref={groupImagesRef}

                    >


                        <Image
                            src={groupShotBackgroundImage}
                            alt=''
                            priority

                            style={{
                                objectFit: 'cover', // maintain aspect ratio but fill the container
                                height: '100%', // ensure image fills height
                                width: '100%', // ensure image fills width


                            }}
                        />

                        {/*BUTTON OVERLAY */}

                    </motion.div>

                </motion.div>


            </motion.div >

        </>

    )

}

export default LifeStyleBranch