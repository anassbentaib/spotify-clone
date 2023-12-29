import Sidebar from "../Sidebar/Sidebar";
import { getCurrentUser } from "@/actions/getCurrectUser";
import PlaylistDetails from "./PlaylistDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { token } from "@/token";
import { fetchPlaylists } from "@/actions/getAllPlaylists";
import { setPlayListData } from "@/features/playlists";
import { useEffect } from "react";
import { Footer } from "..";

const PlaylistsPage = () => {
  const gradientStyle = {
    background: `linear-gradient(transparent, rgba(0, 0, 0, 1))`,
    backgroundColor: `rgb(162, 9, 9)`,
  };
  const { user } = getCurrentUser();
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

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
  useEffect(() => {
    getPlaylists();
  }, [dispatch, token?.access_token]);
  const playlists = useSelector((state: RootState) => state?.playlists?.items);

  return (
    <div
      style={gradientStyle}
      className="w-full relative mx-auto min-h-[100vh]"
    >
      <div className="">
        <div className="bg-[#000]  grid grid-cols-7 ">
          <div className="col-span-2 bg-[#000]  p-2 overflow-y-auto">
            <Sidebar currentUser={user} playlists={playlists} />
          </div>
          <div className="col-span-5 overflow-y-auto">
            <div className="pt-2 text-white">
              <PlaylistDetails currentUser={user} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PlaylistsPage;
