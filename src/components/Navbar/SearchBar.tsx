import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { RootState } from "@/types";
import { useEffect } from "react";
import { searchTracks } from "@/actions/search";
import { setSearchQuery } from "@/features/search";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { token } from "@/token";

const SearchBar = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const searchQuery = useSelector(
    (state: RootState) => state?.search?.searchQuery
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearchClick = async () => {
    try {
      if (token && token.access_token && searchQuery) {
        const resultAction = await dispatch(searchTracks(searchQuery));

        if (searchTracks.fulfilled.match(resultAction)) {
        } else {
          console.error(
            "Error fetching tracks in search method:",
            resultAction.error
          );
        }
      }
    } catch (error) {
      console.error("Error fetching tracks in search method:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      // Optionally, you can trigger search when the component mounts or when `searchQuery` changes
      handleSearchClick();
    }
  }, [dispatch, token?.access_token, searchQuery]);

  return (
    <div className="w-full max-w-[500px] min-w-[100px]">
      <Input
        className="rounded-[20px] 2xl:w-[500px] xl:w-[400px] md:w-[300px] sm:w-[200px] w-[250px]"
        placeholder="What do you want to listen to?"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
