import { fetchAllTracks } from "@/actions/getAllTracks";
import Heading from "@/components/ui/Heading";
import { Track, setTrackData } from "@/features/trackes";
import { token } from "@/token";
import { RootState } from "@/types";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongsCard from "./songsCard";
import NoDataFound from "@/components/EmptyState/NoDataFound";

const TracksPage = () => {
  const tracks = useSelector((state: RootState) => state.tracks?.items);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const [loading, setLoading] = useState(false);
  const getAllTracks = () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllTracks();
  }, [dispatch, token?.access_token]);

  if (loading) {
    return <NoDataFound />;
  }
  return (
    <div className="pb-10">
      <Heading title="Good Afternone" />
      <div className="pt-4 mx-auto">
        {tracks?.length ? (
          <div className="grid mx-auto gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
            {tracks.slice(0, 9).map((track: any) => (
              <SongsCard
                key={track.id}
                track={track as Track}
                backgroundColor
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            No tracks found
          </div>
        )}
      </div>
    </div>
  );
};

export default TracksPage;
