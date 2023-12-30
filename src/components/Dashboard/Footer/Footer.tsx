import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/types";
import { token } from "@/token";

import { useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeDown,
  FaVolumeUp,
} from "react-icons/fa";

import {
  PauseTrack,
  PlayTrack,
  getCurrentyPlayingTrack,
  getPrevTrack,
} from "@/actions/player";
import {
  setCurrentTrack,
  setPauseTrack,
  setPlayTrack,
} from "@/features/player";
import SongPost from "../tracks/post";
import { fetchAllTracks } from "@/actions/getAllTracks";
import { setTrackData } from "@/features/trackes";

const Footer = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const tracks = useSelector((state: RootState) => state.tracks?.items);
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const currentTracks = useSelector(
    (state: RootState) => state.player.currentTrack
  );
  console.log("current track:", currentTracks);

  const getAllTracks = () => {
    if (token && token.access_token) {
      dispatch(fetchAllTracks(token.access_token))
        .then((resultAction: any) => {
          if (fetchAllTracks.fulfilled.match(resultAction)) {
            const tracks = resultAction.payload;
            dispatch(setTrackData(tracks));
          } else {
            console.error("Error fetching tracks:", resultAction.error);
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    getAllTracks();
  }, [dispatch, token?.access_token]);

  // const handlePlay = () => {
  //   if (token && token?.access_token) {
  //     dispatch(PlayTrack())
  //       .then((resultAction) => {
  //         if (PlayTrack.fulfilled.match(resultAction)) {
  //           const track = resultAction.payload;
  //           dispatch(setPlayTrack(track));
  //         } else {
  //           console.error("Error play track:", resultAction.error);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  // const handlePause = () => {
  //   if (token && token?.access_token) {
  //     dispatch(PauseTrack())
  //       .then((resultAction) => {
  //         if (PauseTrack.fulfilled.match(resultAction)) {
  //           const track = resultAction.payload;
  //           dispatch(setPauseTrack(track));
  //         } else {
  //           console.error("Error pause track:", resultAction.error);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  const getCurrentPlayed = () => {
    if (token && token?.access_token) {
      dispatch(getCurrentyPlayingTrack())
        .then((resultAction) => {
          if (getCurrentyPlayingTrack.fulfilled.match(resultAction)) {
            const track = resultAction.payload;
            dispatch(setCurrentTrack(track));
          } else {
            console.error(
              "Error play current track track:",
              resultAction.error
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getCurrentPlayed();
  }, [dispatch, token?.access_token]);

  // const handlePrev = () => {
  //   dispatch(getPrevTrack());
  // };

  const handlePlay = (track: any) => {
    // Your play logic here
    dispatch(setPlayTrack(track));
  };

  const handlePause = (track: any) => {
    // Your pause logic here
    dispatch(setPauseTrack(track));
  };

  const handlePrev = () => {
    // Your previous track logic here
  };

  const handleNext = () => {
    // Your next track logic here
  };

  // Display only the first track from the array
  const currentTrack =
    currentTracks && currentTracks.length > 0 ? currentTracks[0] : null;

  return (
    <div className="relative w-full mx-auto min-h-[10vh] bg-[#000] p-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-between w-full mx-auto">
          <div className="flex items-center w-[300px]">
            <div className="w-full">
              {currentTrack && (
                <div className="">
                  {/* Assuming SongPost takes a track prop */}
                  <SongPost key={currentTrack.id} track={currentTrack} name />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={handlePrev} className="text-white">
              <FaStepBackward />
            </button>
            <button
              onClick={() =>
                isPlaying ? handlePause(currentTrack) : handlePlay(currentTrack)
              }
              className="text-white"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={handleNext} className="text-white">
              <FaStepForward />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button className="text-white">
              <FaVolumeDown />
            </button>
            <span className="text-white">10%</span>
            <button className="text-white">
              <FaVolumeUp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
