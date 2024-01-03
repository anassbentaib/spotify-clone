import Heading from "@/components/ui/Heading";
import { token } from "@/token";
import { RootState } from "@/types";
import { Link } from "@chakra-ui/react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../posts/Post";
import NoDataFound from "@/components/EmptyState/NoDataFound";
import { fetchAllAlbums } from "@/actions/getAlbums";
import { setItems } from "@/features/albums";

const AlbumsPage = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const [loading, setLoading] = useState(false);
  const albums = useSelector((state: RootState) => state?.albums?.items);

  const getAlbums = () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAlbums();
  }, [dispatch, token?.access_token]);

  if (loading) {
    return <NoDataFound />;
  }
  return (
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
  );
};

export default AlbumsPage;
