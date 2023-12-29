import React, { useEffect } from "react";
import Navbar from "../Navbar/page";
import Heading from "../ui/Heading";
import { Image, Link } from "@chakra-ui/react";
import Avatar from "../ui/avatar";
import Songs from "../Tabel/songs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { useParams } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { IoPlayCircle } from "react-icons/io5";
import { getArtistTracks } from "@/actions/getArtists";
import { setArtistDetails } from "@/features/artists";
import EmptyState from "../EmptyState/page";

interface ArtistsProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
}

const Artists: React.FC<ArtistsProps> = ({ currentUser }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const artitsDetails = useSelector(
    (state: RootState) => state.artists?.artistDetails
  );

  const fetchTrackByUserId = async () => {
    try {
      if (id) {
        const resultAction = await dispatch(getArtistTracks({ id }));

        if (getArtistTracks.fulfilled.match(resultAction)) {
          const tracks = resultAction.payload;
          dispatch(setArtistDetails(tracks));
        } else {
          console.error("Error fetching artist details:", resultAction.error);
        }
      }
    } catch (error) {
      console.error("Error fetching artist details:", error);
    }
  };

  useEffect(() => {
    fetchTrackByUserId();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [dispatch, id]);

  if (!artitsDetails) {
    return (
      <EmptyState
        title="Unauthenticated"
        subTitle="Unauthenticated, Please login"
      />
    );
  }

  return (
    <div
      className={`relative w-full mx-auto bg-gradient-to-b from-[#242424] to-[#000] flex flex-col rounded-[5px] `}
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
                      src={
                        artitsDetails?.tracks[0]?.album.images?.[0]?.url ||
                        "https://img.freepik.com/premium-vector/simple-music-logo-design-concept-vector_9850-3776.jpg"
                      }
                      w="100%"
                      alt="Listing"
                      h={{
                        base: "190px",
                        sm: "220px",
                        md: "230px",
                        xl: "250px",
                      }}
                      mb="3"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto relative">
                <div>
                  <div>
                    <h6 className="font-semibold text-sm mt-2">Playlist</h6>
                  </div>
                  <div>
                    <Link
                      href={`/artists/artist/${artitsDetails?.tracks[0]?.artists[0]?.id}`}
                    >
                      <Heading
                        LargeTitle={artitsDetails?.tracks[0]?.artists[0].name}
                      />
                    </Link>

                    <div>{artitsDetails?.description}</div>
                    <div className="flex items-center">
                      <div className=" md:py-1 md:px-2 flex  flex-rowitems-center cursor-pointer   transition ">
                        <div className="hidden md:block rounded-full  border-black">
                          <Avatar src={currentUser?.imageUrl} />
                        </div>
                      </div>
                      <div className="font-semibold text-sm">
                        {currentUser?.name} {artitsDetails?.tracks?.length}
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
          <div className="px-4">
            <IoPlayCircle color="#1ed760" size="70px" />
          </div>
          <Songs
            playlistsDetails={artitsDetails}
            artitsDetails={artitsDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default Artists;
