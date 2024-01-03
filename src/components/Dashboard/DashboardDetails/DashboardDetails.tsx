import React, { useEffect } from "react";
import Navbar from "../../Navbar/page";
import Heading from "@/components/ui/Heading";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { Link } from "@chakra-ui/react";
import PostCard from "../posts/Post";
import { fetchAllAlbums } from "@/actions/getAlbums";
import { setItems } from "@/features/albums";
import { token } from "@/token";
import { fetchPlaylists } from "@/actions/getAllPlaylists";
import { setPlayListData } from "@/features/playlists";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchAllArtists } from "@/actions/getArtists";
import { setArtists } from "@/features/artists";
import { fetchAllTracks } from "@/actions/getAllTracks";
import { setTrackData } from "@/features/trackes";
import NoDataFound from "@/components/EmptyState/NoDataFound";

interface DashboardDetailsProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
}
const DashboardPostDetails: React.FC<DashboardDetailsProps> = ({
  currentUser,
}) => {
  const gradientStyle = {
    background: `linear-gradient(transparent, rgba(0, 0, 0, 1))`,
    backgroundColor: `rgb(32, 87, 100)`,
  };
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const { type } = useParams();
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
  if (!albums || !playlists) {
    return <NoDataFound />;
  }
  return (
    <div
      style={gradientStyle}
      className={`relative w-full mx-auto  flex flex-col rounded-[5px] `}
    >
      <div className="w-full pt-1 px-4 overflow-y-auto flex-grow max-h-[85vh]">
        <Navbar currentUser={currentUser} />
        <div className="">
          <Heading
            title={
              type === "artist"
                ? "Your Favorite Artists"
                : type === "album"
                ? "Your Favorite Albums"
                : type === "playlist"
                ? "You Favorite Playlists"
                : ""
            }
          />
        </div>
        <div className="pt-4 mx-auto">
          {artists?.length || albums?.length | playlists?.length ? (
            <div className="grid mx-auto gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
              {type === "artist"
                ? artists?.map((artist: any) => (
                    <Link
                      href={`/artists/artist/${artist?.id}`}
                      key={artist.id}
                    >
                      <PostCard data={artist} backgroundColor />
                    </Link>
                  ))
                : type === "album"
                ? albums?.map((album: any) => (
                    <Link href={`/albums/album/${album?.id}`} key={album.id}>
                      <PostCard data={album} backgroundColor />
                    </Link>
                  ))
                : playlists?.map((playlist: any) => (
                    <Link href={`/playlists/${playlist?.id}`} key={playlist.id}>
                      <PostCard data={playlist} backgroundColor />
                    </Link>
                  ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              No Data found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPostDetails;
