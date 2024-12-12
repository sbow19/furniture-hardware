import Lottie from 'lottie-react';
import popupButton from './tulfa-popup-button_plain.json'
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'
import styles from './tulfa_popup_button.module.scss'



const TulfaPopupButton = ({
   timer,
   text,
   height,
   width
}) => {

   const [isVisible, setIsVisible] = useState(false);

   // Detect when the user is in viewport
   const [isInView, setIsInView] = useState(false);
   const elementRef = useRef(null);

   useEffect(() => {
      // IntersectionObserver logic to track if element is in view
      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsInView(entry.isIntersecting); // Set inView status based on intersection
         },
         { threshold: 1 } // Trigger when 10% of the element is in view
      );

      if (elementRef.current) {
         observer.observe(elementRef.current); // Start observing the element
      }

      return () => {
         if (elementRef.current) {
            observer.unobserve(elementRef.current); // Clean up observer
         }
      };
   }, []);

   useEffect(() => {

      if (isInView) {
         setTimeout(() => {
            setIsVisible(true)
         }, timer)
      }


   }, [isInView])


   const style = {
      height,
      width
   }

   return (
      <div
         ref={elementRef}
      >

         {isVisible &&

            <div
               style={
                  {
                     position: 'relative',
                     height: height,
                     width: width
                  }
               }
            >
               <Lottie
                  animationData={popupButton}
                  autoplay={true}
                  loop={false}
                  style={style}
               />
               <motion.p
                  className={styles.text_style}
                  initial={{
                     opacity: 0
                  }}
                  animate={{
                     opacity: 1
                  }}
                  transition={{
                     delay: 1.2,
                     duration: 1
                  }}

               >{text}
               </motion.p>


            </div>
         }

      </div>
   )
}

export default TulfaPopupButton;

