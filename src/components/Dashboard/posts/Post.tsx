import { none } from "@/assets";
import { Album } from "@/features/albums";
import { Artist } from "@/features/artists";
import { Playlist } from "@/features/playlists";
import { Track } from "@/features/trackes";
import { Image } from "@chakra-ui/react";
import React from "react";
import { IoPlayCircle } from "react-icons/io5";

interface PostCardProps {
  rounded?: boolean;
  data: Playlist[] | Track[] | Artist[] | Album[] | null;
  disabled?: boolean;
  actionLabel?: string;
  backgroundColor?: boolean;
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
  creator?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  rounded,
  data,
  currentUser,
  backgroundColor,
}) => {
  const getImageUrl = (
    data: Playlist[] | Track[] | Artist[] | Album[] | null
  ): string => {
    if (!data || data.length === 0) {
      return none;
    }

    const item = data;

    if ("images" in item) {
      return (item as { images?: { url: string }[] }).images?.[0]?.url || none;
    }

    return none;
  };

  const imageUrl = getImageUrl(data);

  const getName = (
    data: Playlist[] | Track[] | Artist[] | Album[] | null
  ): string => {
    if (!data || data?.length === 0) {
      return "Unknown";
    }

    const item = data;

    if ("name" in item) {
      return (item as { name?: string }).name || "Unknown";
    }

    return "Unknown";
  };
  const getType = (
    data: Playlist[] | Track[] | Artist[] | Album[] | null
  ): string => {
    if (!data || data?.length === 0) {
      return "Unknown";
    }

    const item = data;

    if ("type" in item) {
      return (item as { type?: string })?.type || "Unknown";
    }

    return "Unknown";
  };
  const getAdded_at = (
    data: Playlist[] | Track[] | Artist[] | Album[] | null
  ): string => {
    if (!data || data?.length === 0) {
      return "Unknown";
    }

    const item = data;

    if ("added_at" in item) {
      return (item as { added_at?: string })?.added_at || "Unknown";
    }

    return "Unknown";
  };

  return (
    <div
      className={`
      col-span-1 
      cursor-pointer 
      group 
      ${
        backgroundColor &&
        "bg-[rgba(38,34,34,0.4)] group-hover:scale-130  transition ease-in-out duration-900 hover:bg-[rgba(39,35,35,0.70)]"
      }

      ${backgroundColor && "rounded-[10px]"}
      ${backgroundColor && "p-4"}

      `}
    >
      <div className="flex flex-col gap-2 w-full ">
        <div
          className={`
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            ${rounded ? "rounded-full" : "rounded-[5px]"}
            `}
        >
          <Image
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={imageUrl}
            alt="Listing"
          />
          <div
            className="            
            overflow-hidden 
            absolute
            right-0 
            bottom-0 
            
            text-30px"
          >
            <div
              className="none group-hover:scale-110 
              transition"
            >
              <IoPlayCircle style={{ fontSize: "35px" }} />
            </div>
          </div>
        </div>
        <div>
          <div className="font-[600] text-[11px] 2xl:text-[15px] xl:text-[15px] md:text-[14px] sm:text-[11px] no-underline">
            {getName(data)}
          </div>

          <div className="no-underline  text-[11px] 2xl:text-[15px] xl:text-[15px] md:text-[14px] sm:text-[11px] capitalize text-neutral-500 font-[600] mt-1">
            <div>{getType(data)}</div>
            <div>{getAdded_at(data)}</div>
          </div>
          <div
            className="flex flex-row items-center gap-1 font-light 
          text-md text-neutral-500"
          >
            <div className="font-light text-[13px] no-underline ">
              {currentUser?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
