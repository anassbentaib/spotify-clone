import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/types";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeDown,
  FaVolumeUp,
} from "react-icons/fa";

import {
  Track,
  setCurrentTrackIndex,
  setPauseTrack,
  setPlayTrack,
} from "@/features/player";
import { token } from "@/token";
import { getCurrentyPlayingTrack } from "@/actions/player";
import { useEffect } from "react";
import SongsCard from "../tracks/songsCard";
const Footer = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const currentTrack = useSelector(
    (state: RootState) => state.player.currentTrackIndex
  );

  const handlePlay = () => {
    dispatch(setPlayTrack(currentTrack));
  };

  const handlePause = () => {
    dispatch(setPauseTrack());
  };

  const getCurrentPlayingTrack = async () => {
    const storedCurrentTrackIndex = localStorage.getItem("currentTrackIndex");

    if (token && token?.access_token && storedCurrentTrackIndex !== null) {
      try {
        const resultAction = await dispatch(getCurrentyPlayingTrack());

        if (getCurrentyPlayingTrack.fulfilled.match(resultAction)) {
          const storedTrackData = JSON.parse(storedCurrentTrackIndex);

          const storedTrack: Track = {
            added_at: storedTrackData.added_at,
            album: storedTrackData.album,
            artists: storedTrackData.artists,
            duration: storedTrackData.duration,
            id: storedTrackData.id,
            images: storedTrackData.images,
            name: storedTrackData.name,
            track_number: storedTrackData.track_number,
            favorited: storedTrackData.favorited,
          };

          dispatch(setCurrentTrackIndex(storedTrack));
        }
      } catch (error) {
        console.error("Error getting current playing track:", error);
      }
    }
  };

  useEffect(() => {
    getCurrentPlayingTrack();
  }, [token?.access_token, dispatch]);

  return (
    <div className="relative w-full  mx-auto min-h-[13vh] bg-[#000] p-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-between w-full mx-auto">
          <div className="flex items-center w-[300px]">
            <div className="w-full">
              {currentTrack && (
                <div className="">
                  <SongsCard key={currentTrack.id} track={currentTrack} name />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => {}} className="text-white">
              <FaStepBackward />
            </button>
            <button
              onClick={() => (isPlaying ? handlePause() : handlePlay())}
              className="text-white"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={() => {}} className="text-white">
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
