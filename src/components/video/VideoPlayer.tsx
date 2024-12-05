import React, { memo } from 'react';

const VideoPlayer = memo(({ src, type, altText }) => {
  return (
    <video controls={false} muted autoPlay>
      <source src={src} type={type} />
      Your browser does not support the video tag.
      {altText}
    </video>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
