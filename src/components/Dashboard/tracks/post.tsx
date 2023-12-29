import { Track } from "@/features/trackes";
import { Image, Link } from "@chakra-ui/react";

interface SongPostProps {
  track: Track | null;
  backgroundColor?: boolean;
  name?: boolean;
}

const SongPost = ({ track, backgroundColor, name }: SongPostProps) => {
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
              src={
                track.images?.[0]?.url ||
                "https://img.freepik.com/premium-vector/simple-music-logo-design-concept-vector_9850-3776.jpg"
              }
              h="100%"
              w="100%"
              objectFit="cover"
            />
          </div>
          <div className="w-full ml-3">
            {track?.artists?.map((artist) => (
              <Link
                className="text-[12px] font-[500] text-[#fff] w-full"
                key={artist.id}
                href={`/artists/artist/${artist.id}`}
              >
                <div className="text-[12px] font-[500] text-[#fff]">
                  {artist.name}
                </div>
              </Link>
            ))}
            {name && (
              <div className="text-[11px] font-bold text-[#a7a7a7]">
                {track.name}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongPost;
