import React, { memo } from 'react';
import styles from "./VideoPlayer.module.scss";

const VideoPlayer = memo(({ src, type, altText }) => {
  return (
    <div className={styles.video_container}>
      <video controls={false} muted  preload='auto' autoPlay>
        <source src={src} type={type} />
        Your browser does not support the video tag.
        {altText}
      </video>
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
