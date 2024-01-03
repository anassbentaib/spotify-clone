import Navbar from "@/components/Navbar/page";
import Heading from "@/components/ui/Heading";
import { token } from "@/token";
import { RootState } from "@/types";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../posts/Post";
import EmptyState from "@/components/EmptyState/page";
import { fetchAllTracks } from "@/actions/getAllTracks";
import { setTrackData } from "@/features/trackes";

interface SearchPageProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
}
const Search: React.FC<SearchPageProps> = ({ currentUser }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const tracks = useSelector((state: RootState) => state.tracks?.items);

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

  if (!tracks) {
    return (
      <EmptyState
        title="Unauthenticated"
        subTitle="Unauthenticated, Please login"
      />
    );
  }

  return (
    <div
      className={`relative w-full mx-auto flex flex-col bg-gradient-to-b from-blue-900 rounded-[5px]`}
    >
      <div className="w-full pt-1 px-4 overflow-auto flex-grow max-h-[85vh] pb-10 ">
        <div className="min-h-[100vh]">
          <Navbar currentUser={currentUser} searchBar hidden />
          <div>
            <div className="pb-10">
              <Heading title="Recent searches" />
              <div className="pt-4 mx-auto">
                {tracks?.length ? (
                  <div className="grid mx-auto gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
                    {tracks?.map((track: any) => (
                      <PostCard key={track.id} data={track} backgroundColor />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    No tracks found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
