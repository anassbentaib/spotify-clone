// HeartButton.jsx
import {
  addTrackToFavorites,
  removeTrackFromFavorites,
} from "@/actions/getAllTracks";
import { addToFavorites, removeFromFavorites } from "@/features/trackes";
import { hasFavoritedSelector } from "@/providers/FavoritesProvider";
import { RootState } from "@/types";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const HeartButton = ({ trackId }: { trackId: string }) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const hasFavorited = useSelector((state: RootState) =>
    hasFavoritedSelector(state, trackId)
  );

  const handleAddToFavorites = async (id: string) => {
    try {
      if (id) {
        const isCurrentlyFavorited = hasFavorited;
        if (isCurrentlyFavorited) {
          const resultAction = await dispatch(removeTrackFromFavorites({ id }));

          if (removeTrackFromFavorites.fulfilled.match(resultAction)) {
            const removedFavorite = resultAction.payload;
            await dispatch(removeFromFavorites(removedFavorite));
            toast.success("Track removed");
          } else {
            console.error(
              "Error removing from Spotify favorites:",
              resultAction.error
            );
            toast.error("Somthing went wrong");
          }
        } else {
          // Add to favorites
          const resultAction = await dispatch(addTrackToFavorites({ id }));

          if (addTrackToFavorites.fulfilled.match(resultAction)) {
            const addedFavorite = resultAction.payload;
            await dispatch(addToFavorites(addedFavorite));
            toast.success("Track added");
          } else {
            console.error(
              "Error adding to Spotify favorites:",
              resultAction.error
            );
            toast.error("Somthing went wrong");
          }
        }
      }
    } catch (error) {
      console.error("Error adding/removing from Spotify favorites:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      onClick={() => handleAddToFavorites(trackId)}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={21}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={19}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
