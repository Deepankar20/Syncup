import { useState, useEffect, useRef } from "react";

const useMediaStream = () => {
  const [state, setState] = useState<MediaStream>();
  const [screen, setScreen] = useState();
  const isStreamSet = useRef(false);

  useEffect(() => {
    if (isStreamSet.current) return;
    const displayMediaOptions = {
      video: {
        displaySurface: "browser",
      },
      audio: {
        suppressLocalAudioPlayback: false,
      },
      preferCurrentTab: false,
      selfBrowserSurface: "exclude",
      systemAudio: "include",
      surfaceSwitching: "include",
      monitorTypeSurfaces: "include",
    };
    isStreamSet.current = true;
    (async function initStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });


        setState(stream)
      } catch (e) {
        console.log("Error in media navigator", e);
      }
    })();
  }, []);

  return {
    stream: state,
    screen: screen,
  };
};

export default useMediaStream;
