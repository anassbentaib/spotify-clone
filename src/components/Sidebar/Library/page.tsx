import { fetchAllAlbums } from "@/actions/getAlbums";
import { fetchPlaylists } from "@/actions/getAllPlaylists";
import { fetchAllTracks } from "@/actions/getAllTracks";
import { fetchAllArtists } from "@/actions/getArtists";
import PostCard from "@/components/Dashboard/posts/Post";
import Header from "@/components/Sidebar/Library/Header";
import { setItems } from "@/features/albums";
import { setArtists } from "@/features/artists";
import { setPlayListData } from "@/features/playlists";
import { setTrackData } from "@/features/trackes";
import { token } from "@/token";
import { RootState } from "@/types";
import { Link } from "@chakra-ui/react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface LibraryPageProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ currentUser }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const artists = useSelector((state: RootState) => state?.artists?.items);
  const albums = useSelector((state: RootState) => state?.albums?.items);
  const playlists = useSelector((state: RootState) => state?.playlists?.items);
  const [filter, setFilter] = useState(playlists);
  const [activeFilter, setActiveFilter] = useState("playlist");

  const handleFilter = (item: string) => {
    setActiveFilter(item);
    switch (item) {
      case "playlist":
        setFilter(playlists);
        break;
      case "artist":
        setFilter(artists);
        break;
      case "album":
        setFilter(albums);
        break;
      default:
        setFilter(playlists);
    }
  };

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

  useEffect(() => {
    getAllTracks();
    getArtists();
    getAlbums();
    getPlaylists();
  }, []);

  return (
    <div className="w-full relative  flex flex-col min-h-[40vh] md:max-w-[700px] sm:max-w-[700px]">
      <Header onFilter={handleFilter} activeFilter={activeFilter} />
      <div
        className="
        pt-3
        overflow-auto flex-grow max-h-[40vh]
        grid 
        grid-cols-1 
        sm:grid-cols-1
        md:grid-cols-1
        lg:grid-cols-3
        2xl-grid-clos-6
        gap-4"
      >
        {filter.map((item: any, i: any) => (
          <div key={i}>
            <Link href={`/${activeFilter}s/${item?.id}`}>
              <PostCard data={item} currentUser={currentUser} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
