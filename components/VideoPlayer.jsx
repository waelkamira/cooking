// components/VideoPlayer.js
import { useRef } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="360" controls>
        <source
          src="https://cdn.cartoon-go.com/75441e2b95254493ab02a4e94d7710e9:arteenz/001/sandy_bell/sandy_bell_04.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
