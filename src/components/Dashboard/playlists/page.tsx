import Heading from "@/components/ui/Heading";
import { token } from "@/token";
import { RootState } from "@/types";
import { Link } from "@chakra-ui/react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../posts/Post";
import NoDataFound from "@/components/EmptyState/NoDataFound";
import { fetchPlaylists } from "@/actions/getAllPlaylists";
import { setPlayListData } from "@/features/playlists";

const PlaylistsPage = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
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

  useEffect(() => {
    getPlaylists();
  }, [dispatch, token?.access_token]);

  if (!playlists) {
    return <NoDataFound />;
  }
  return (
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
              <Link href={`/playlists/${playlist?.id}`} textDecor="none">
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
  );
};

export default PlaylistsPage;
