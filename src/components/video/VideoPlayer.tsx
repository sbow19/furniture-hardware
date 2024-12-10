import React, { memo, useEffect } from 'react';
import styles from "./VideoPlayer.module.scss";

const VideoPlayer = memo(({ src, type, altText, onVideoComplete }) => {


  return (
    <div className={styles.video_container}>
      <video 
        controls={false} 
        muted  
        preload='auto' 
        autoPlay
        onEnded={onVideoComplete ?? null}
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
        {altText}
      </video>
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
