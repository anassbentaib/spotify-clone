import { useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Search from "./Search";
import { getCurrentUser } from "@/actions/getCurrectUser";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { token } from "@/token";
import { fetchPlaylists } from "@/actions/getAllPlaylists";
import { setPlayListData } from "@/features/playlists";
import Footer from "../Footer/Footer";

const SearchPage = () => {
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
    <div className="">
      <div className="bg-[#000] grid grid-cols-7 ">
        <div className="col-span-2 bg-[#000]  p-2 overflow-y-auto">
          <Sidebar currentUser={user} playlists={playlists} />
        </div>
        <div className="col-span-5  overflow-y-auto">
          <div className="pt-2 text-white">
            <Search currentUser={user} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
