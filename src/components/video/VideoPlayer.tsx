import React, { memo, useEffect } from 'react';
import styles from "./VideoPlayer.module.scss";

const VideoPlayer = memo(({ src, type, altText, onVideoComplete, loop, styleOverride }) => {


  return (
    <div 
      className={styles.video_container}
      style={styleOverride}
    >
      <video 
        controls={false} 
        muted  
        preload='auto' 
        autoPlay
        onEnded={onVideoComplete ?? null}
        style={{
          height: '100%',
          width: '100%',
          objectFit: "cover",
          position: 'absolute',
          zIndex: -1
        }}
        loop={loop}
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
