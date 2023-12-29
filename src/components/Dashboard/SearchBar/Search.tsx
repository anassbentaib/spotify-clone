import { searchTracks } from "@/actions/search";
import Navbar from "@/components/Navbar/page";
import { setSearchResults } from "@/features/search";
import { token } from "@/token";
import { RootState } from "@/types";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SearchPageProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
}
const Search: React.FC<SearchPageProps> = ({ currentUser }) => {
  const searchResults = useSelector(
    (state: RootState) => state?.search?.searchResults
  );
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const searchQuery = useSelector(
    (state: RootState) => state?.search?.searchQuery
  );

  const handleSearch = async () => {
    try {
      if (token && token.access_token && searchQuery) {
        const resultAction = await dispatch(searchTracks(searchQuery));

        if (searchTracks.fulfilled.match(resultAction)) {

          const playlistDetails = resultAction.payload;
          dispatch(setSearchResults(playlistDetails));
        } else {
          console.error(
            "Error fetching  tracks in search method :",
            resultAction.error
          );
        }
      }
    } catch (error) {
      console.error("Error fetching  tracks in search method :", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [dispatch, token.access_token]);

  return (
    <div
      className={`relative w-full mx-auto flex flex-col bg-gradient-to-b from-blue-900 rounded-[5px]`}
    >
      <div className="w-full pt-1 px-4 overflow-auto flex-grow max-h-[85vh] pb-10 ">
        <div className="min-h-[100vh]">
          <Navbar currentUser={currentUser} searchBar hidden/>
          <div>
            <div className="pb-10">
              {searchResults?.length > 0 && (
                <ul>
                  {searchResults?.map((track: any) => (
                    <li key={track.id}>{track.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
