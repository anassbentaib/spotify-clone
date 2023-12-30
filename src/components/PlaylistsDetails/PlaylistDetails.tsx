import React, { useEffect } from "react";
import Navbar from "../Navbar/page";
import Heading from "../ui/Heading";
import { Image } from "@chakra-ui/react";
import Avatar from "../ui/avatar";
import { fetchPlaylistsById } from "@/actions/getPlaylistById";
import Songs from "../Tabel/songs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { useParams } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { setPlaylistDetails } from "@/features/playlists";
import EmptyState from "../EmptyState/page";
import { none } from "@/assets";
interface PlaylistDetailsProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
}

const PlaylistDetails: React.FC<PlaylistDetailsProps> = ({ currentUser }) => {
  const gradientStyle = {
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 21))`,
    backgroundColor: `rgb(162, 9, 9)`,
  };

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const playlistsDetails = useSelector(
    (state: RootState) => state.playlists.playlisDetails
  );

  const fetchPlaylistDetails = async () => {
    try {
      if (id) {
        const resultAction = await dispatch(fetchPlaylistsById({ id }));

        if (fetchPlaylistsById.fulfilled.match(resultAction)) {
          const playlistDetails = resultAction.payload;
          dispatch(setPlaylistDetails(playlistDetails));
        } else {
          console.error("Error fetching playlist details:", resultAction.error);
        }
      }
    } catch (error) {
      console.error("Error fetching playlist details:", error);
    }
  };

  useEffect(() => {
    fetchPlaylistDetails();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [dispatch, id]);

  if (!playlistsDetails) {
    return (
      <EmptyState
        title="Unauthenticated"
        subTitle="Unauthenticated, Please login"
      />
    );
  }

  return (
    <div
      style={gradientStyle}
      className={`relative w-full mx-auto  flex flex-col rounded-[5px] `}
    >
      <div className="w-full pt-1  overflow-auto flex-grow max-h-[85vh]">
        <div className="px-4 pb-5">
          <Navbar currentUser={currentUser} />
          <div className="w-full relative">
            <div className="block sm:flex md:flex xl:flex 2xl:flex  items-center mx-auto mr-5 ">
              <div className="col-span-1 cursor-pointer group mr-5">
                <div className="flex flex-col  w-full ">
                  <div
                    className={`aspect-square w-full relative overflow-hidden rounded-[5px]`}
                  >
                    <Image
                      className="object-cover h-full w-full group-hover:scale-110 transition"
                      src={playlistsDetails?.images?.[0]?.url || none}
                      w="100%"
                      alt="Listing"
                      h={{
                        base: "190px",
                        sm: "220px",
                        md: "230px",
                        xl: "250px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto relative">
                <div>
                  <div>
                    <h6 className="font-semibold text-sm">Playlist</h6>
                  </div>
                  <div>
                    <Heading LargeTitle={playlistsDetails?.name} />
                    <div className="text-[11px] 2xl:text-[15px] xl:text-[15px] md:text-[14px] sm:text-[11px]">
                      {playlistsDetails?.description}
                    </div>
                    <div className="flex items-center  mt-2">
                      <div className=" md:py-1 md:px-2 flex  flex-rowitems-center cursor-pointer   transition ">
                        <div className="hidden md:block rounded-full  border-black">
                          <Avatar src={currentUser?.imageUrl} />
                        </div>
                      </div>
                      <div className="font-semibold text-[12px] 2xl:text-[15px] xl:text-[16px] md:text-[14px] sm:text-[12px]">
                        {currentUser?.name} {playlistsDetails?.tracks?.length}
                        &nbsp; songs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full relative pt-7 box-shadow-md bg-[rgba(0,0,0,0.1)] min-h-[70vh]">
          <Songs playlistsDetails={playlistsDetails} />
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetails;
