"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// ✅ THE FIX: We cast this to 'any' to stop TypeScript from complaining about missing props
// on a dynamically imported component.
const ReactPlayer = dynamic(() => import('react-player'), { 
  ssr: false,
  loading: () => <div className="text-white p-4">Loading Player...</div>
}) as any;

interface VideoWindowProps {
  url: string;
  isPlaying: boolean;
  onProgressReport: (playedSeconds: number) => void;
}

const VideoWindow: React.FC<VideoWindowProps> = ({ url, isPlaying, onProgressReport }) => {
  // Mount check to ensure we only render on client (Double safety)
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

  if (!hasMounted) return <div className="video-wrapper bg-gray-900 h-full flex items-center justify-center text-gray-500">Initializing...</div>;

  return (
    <div className="video-wrapper" style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden', position: 'relative', paddingTop: '56.25%', background: '#000' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ReactPlayer
          url={url}
          playing={isPlaying}
          controls={true}
          width="100%"
          height="100%"
          onProgress={(state: any) => {
             if (state && state.playedSeconds !== undefined) {
               onProgressReport(state.playedSeconds);
             }
          }}
        />
      </div>
    </div>
  );
};

export default VideoWindow;