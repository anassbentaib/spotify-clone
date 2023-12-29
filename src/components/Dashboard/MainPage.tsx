import React, { useEffect } from "react";
import Navbar from "../Navbar/page";
import Heading from "@/components/ui/Heading";
import { setPlayListData } from "@/features/playlists";
import { fetchAllTracks } from "@/actions/getAllTracks";
import { token } from "@/token";
import { Track, setTrackData } from "@/features/trackes";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/types";
import SongPost from "./tracks/post";
import PostCard from "./posts/Post";
import { fetchAllArtists } from "@/actions/getArtists";
import { setArtists } from "@/features/artists";
import { fetchAllAlbums } from "@/actions/getAlbums";
import { setItems } from "@/features/albums";
import { fetchPlaylists } from "@/actions/getAllPlaylists";
import { Link } from "@chakra-ui/react";
import EmptyState from "../EmptyState/page";

interface MainPageProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
}
const MainPage: React.FC<MainPageProps> = ({ currentUser }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const tracks = useSelector((state: RootState) => state.tracks?.items);
  const artists = useSelector((state: RootState) => state?.artists?.items);
  const albums = useSelector((state: RootState) => state?.albums?.items);
  const playlists = useSelector((state: RootState) => state?.playlists?.items);

  const getPlaylists = () => {
    if (token && token.access_token) {
      dispatch(fetchPlaylists(token.access_token))
        .then((resultAction) => {
          if (fetchPlaylists.fulfilled.match(resultAction)) {
            const playlists = resultAction.payload;
            dispatch(setPlayListData(playlists));
          } else {
            console.error("Error fetching playlists:", resultAction.error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const getArtists = () => {
    if (token && token.access_token) {
      dispatch(fetchAllArtists(token.access_token))
        .then((resultAction) => {
          if (fetchAllArtists.fulfilled.match(resultAction)) {
            const artists = resultAction.payload;
            dispatch(setArtists(artists));
          } else {
            console.error("Error fetching artisrs`:", resultAction.error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
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
  const getAlbums = () => {
    if (token && token.access_token) {
      dispatch(fetchAllAlbums(token.access_token))
        .then((resultAction) => {
          if (fetchAllAlbums.fulfilled.match(resultAction)) {
            const albums = resultAction.payload;
            dispatch(setItems(albums));
          } else {
            console.error("Error fetching albums:", resultAction.error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    getAllTracks();
    getArtists();
    getAlbums();
    getPlaylists();
  }, [dispatch, token?.access_token]);

  if (!tracks || !albums || !playlists) {
    return (
      <EmptyState
        title="Unauthenticated"
        subTitle="Unauthenticated, Please login"
      />
    );
  }
  return (
    <div
      className={`relative w-full mx-auto bg-gradient-to-b 
      from-emerald-800  flex flex-col  rounded-[5px] `}
    >
      <div className="w-full pt-1 px-4 overflow-auto flex-grow max-h-[85vh] pb-10 ">
        <div className="min-h-[100vh]">
          <Navbar currentUser={currentUser} />
          <div>
            <div className="pb-10">
              <Heading title="Good Afternone" />
              <div className="pt-4 mx-auto">
                {tracks?.length ? (
                  <div className="grid mx-auto gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                    {tracks.slice(0, 9).map((track: any) => (
                      <SongPost
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
            <div className="pb-10">
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <Heading title="Your Artists" />
                </div>
                <div className="w-full text-end">
                  {artists?.length > 5 && (
                    <Link href={`/section/${artists?.[0]?.type}`}>
                      <span className="w-full text-end text-[#a7a7a7a7] font-bold text-[11px] 2xl:text-[15px] xl:text-[15px] md:text-[14px] sm:text-[11px]">
                        Show all
                      </span>
                    </Link>
                  )}
                </div>
              </div>
              <div className="pt-4 mx-auto">
                {artists?.length ? (
                  <div className="grid mx-auto gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
                    {artists?.slice(0, 5).map((artist: any) => (
                      <Link
                        href={`/artists/artist/${artist?.id}`}
                        key={artist.id}
                      >
                        <PostCard
                          key={artist.id}
                          data={artist}
                          backgroundColor
                        />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    No Artists found
                  </div>
                )}
              </div>
            </div>
            <div className="pb-10">
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <Heading title="Your Albums" />
                </div>
                <div className="w-full text-end">
                  {albums?.length > 5 && (
                    <Link href={`/section/${albums?.[0]?.type}`}>
                      <span className="w-full text-end text-[#a7a7a7a7] font-bold text-[11px] 2xl:text-[15px] xl:text-[15px] md:text-[14px] sm:text-[11px]">
                        Show all
                      </span>
                    </Link>
                  )}
                </div>
              </div>
              <div className="pt-4 mx-auto">
                {albums?.length ? (
                  <div className="grid mx-auto gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
                    {albums?.slice(0, 5).map((artist: any) => (
                      <PostCard key={artist.id} data={artist} backgroundColor />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    No Albums found
                  </div>
                )}
              </div>
            </div>
            <div className="pb-10">
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <Heading title="Your Playlists" />
                </div>
                <div className="w-full text-end">
                  {playlists?.length > 5 && (
                    <Link href={`/section/${playlists?.[0]?.type}`}>
                      <span className="w-full text-end text-[#a7a7a7a7] font-bold text-[11px] 2xl:text-[15px] xl:text-[15px] md:text-[14px] sm:text-[11px]">
                        Show all
                      </span>
                    </Link>
                  )}
                </div>
              </div>
              <div className="pt-4 mx-auto">
                {playlists?.length ? (
                  <div className="grid mx-auto gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
                    {playlists?.slice(0, 5).map((playlist: any) => (
                      <Link
                        href={`/playlists/${playlist?.id}`}
                        textDecor="none"
                      >
                        <PostCard
                          creator
                          key={playlist.id}
                          data={playlist}
                          backgroundColor
                        />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    No Artists found
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

export default MainPage;
