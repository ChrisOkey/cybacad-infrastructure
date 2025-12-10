import React from 'react';
import ReactPlayer from 'react-player';

const VideoWindow = ({ url, isPlaying, onProgressReport }) => {
  return (
    <div className="video-wrapper" style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
      <ReactPlayer
        url={url}
        playing={isPlaying}
        controls={true}
        width="100%"
        height="100%"
        // This is the heartbeat: it fires every ~500ms
        onProgress={(progress) => onProgressReport(progress.playedSeconds)}
      />
    </div>
  );
};

export default VideoWindow;