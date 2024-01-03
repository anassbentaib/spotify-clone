import { none } from "@/assets";
import { Track } from "@/features/trackes";
import { Image, Link } from "@chakra-ui/react";
import React from "react";
interface SongPostProps {
  track: Track | null;
  backgroundColor?: boolean;
  name?: boolean;
}
const SongsCard = ({ track, backgroundColor, name }: SongPostProps) => {
  return (
    <div
      className={`flex items-center ${
        backgroundColor && "bg-gray-300"
      } bg-opacity-30 rounded-[3px] shadow-lg min-h-[50px] justify-start w-full`}
    >
      {track && (
        <div key={track.id} className="flex items-center">
          <div className="max-w-[100px] w-[100px] h-[50px]">
            <Image
              src={track.images?.[0]?.url || none}
              h="100%"
              w="100%"
              objectFit="cover"
            />
          </div>
          <div className="w-full ml-3 ">
            {name && (
              <div className="text-[13px] sm:text-[13px] md:text-[13px] xl:text-[14px] 2xl:text-[14px]  text-[#fff]">
                {track.name}
              </div>
            )}
            <div className="">
              <div className="flex items-center text-[12px] sm:text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[12px] text-white">
                {track?.artists?.slice(0, 2).map((artist, index) => (
                  <React.Fragment key={artist?.id}>
                    <Link href={`/artists/artist/${artist?.id}`}>
                      <span>{artist?.name}</span>
                    </Link>

                    {index < 1 && <span>,&nbsp;</span>}
                    {index === 1 &&
                      track?.artists?.length &&
                      track.artists.length > 2 && <span>...</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongsCard;
