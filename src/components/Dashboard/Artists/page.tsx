import { fetchAllArtists } from "@/actions/getArtists";
import Heading from "@/components/ui/Heading";
import { setArtists } from "@/features/artists";
import { token } from "@/token";
import { RootState } from "@/types";
import { Link } from "@chakra-ui/react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../posts/Post";
import NoDataFound from "@/components/EmptyState/NoDataFound";

const ArtistsPage = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const artists = useSelector((state: RootState) => state?.artists?.items);

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
  useEffect(() => {
    getArtists();
  }, [dispatch, token?.access_token]);

  if (!artists) {
    return (
      <NoDataFound/>
    );
  }
  return (
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
              <Link href={`/artists/artist/${artist?.id}`} key={artist.id}>
                <PostCard key={artist.id} data={artist} backgroundColor />
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

export default ArtistsPage;
