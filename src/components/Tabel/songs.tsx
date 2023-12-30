import { PlaylistsDetails } from "@/features/playlists";
import {
  Image,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import HeartButton from "../Button/HeartButton";
import { AiFillClockCircle } from "react-icons/ai";
import { ArtistDetails } from "@/features/artists";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/types";
import { token } from "@/token";
import { PlayTrack } from "@/actions/player";
import { setPlayTrack } from "@/features/player";
import { none } from "@/assets";

interface TdRowProps {
  children: React.ReactNode;
}

const TdRow: React.FC<TdRowProps> = ({ children }) => (
  <>
    <Td
      border="none"
      color="#a7a7a7"
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      fontWeight="600"
      fontSize="13px"
    >
      {children}
    </Td>
  </>
);
interface ThRowProps {
  children: React.ReactNode;
}

const ThRow: React.FC<ThRowProps> = ({ children }) => (
  <>
    <Th color="#a7a7a7" fontWeight="bold">
      {children}
    </Th>
  </>
);

interface SongsTableProps {
  playlistsDetails: PlaylistsDetails | null;
  artitsDetails?: ArtistDetails | null;
}
const SongsTable: React.FC<SongsTableProps> = ({
  playlistsDetails,
  artitsDetails,
}) => {
  function formatDuration(durationInMs: number): string {
    const minutes = Math.floor(durationInMs / 60000);
    const seconds = ((durationInMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${(+seconds < 10 ? "0" : "") + seconds}`;
  }
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const handlePlayTrack = async () => {
    if (token?.access_token) {
      try {
        await dispatch(PlayTrack());

        const tracks = playlistsDetails?.tracks || [];
        const track = tracks.map(({ id, name }: any) => ({
          id,
          name,
        }));

        dispatch(setPlayTrack(track));
      } catch (error) {
        console.error("Error play track:", error);
      }
    }
  };

  return (
    <div className="w-full p- mx-auto px-4 pb-10">
      <TableContainer borderRadius="5px">
        <Table>
          <Thead>
            <Tr>
              <ThRow>#</ThRow>
              <ThRow>Title</ThRow>
              <ThRow>Album</ThRow>
              <ThRow>Date added</ThRow>

              <ThRow>
                <div className="flex items-center ">
                  <AiFillClockCircle
                    style={{ fontSize: "20px", marginLeft: "10px" }}
                  />
                </div>
              </ThRow>
              <ThRow>fa</ThRow>
            </Tr>
          </Thead>
          {playlistsDetails?.tracks?.length ? (
            <Tbody>
              {playlistsDetails?.tracks?.map((track, index) => (
                <Tr key={track?.id} onClick={handlePlayTrack} cursor="pointer">
                  <TdRow>{track?.track_number || index + 1}</TdRow>
                  <TdRow>
                    <div className="flex items-center ">
                      <div className="w-[45px] h-[40px] mr-8">
                        <Image
                          src={
                            track?.images?.[0]?.url ||
                            artitsDetails?.tracks?.[index]?.artists?.[0]
                              ?.album?.[0]?.images?.[0]?.url ||
                            none
                          }
                          w={50}
                          h={50}
                          borderRadius="5px"
                        />
                      </div>
                      <div>
                        <div className="text-white text-sm">{track?.name}</div>
                        <div className="flex items-center">
                          {track?.artists?.map((artist, index) => (
                            <React.Fragment key={artist?.id}>
                              <Link href={`/artists/artist/${artist?.id}`}>
                                <span>{artist?.name}</span>
                              </Link>
                              {index < (track.artists?.length || 0) - 1 && (
                                <span>,&nbsp;</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TdRow>
                  <TdRow>{track?.album?.name}</TdRow>
                  <TdRow>
                    {track?.added_at ||
                      artitsDetails?.tracks?.[index]?.album?.release_date}
                  </TdRow>
                  <TdRow>
                    {track?.duration ||
                      (artitsDetails?.tracks?.[index].duration_ms !== undefined
                        ? formatDuration(
                            artitsDetails?.tracks?.[index].duration_ms!
                          )
                        : "Unknown Duration")}
                  </TdRow>

                  <TdRow>
                    <div className="pointer text-19 none flex">
                      <HeartButton trackId={track?.id} />
                    </div>
                  </TdRow>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <div className="flex items-center justify-center mt-3 text-lg">
              Let's find something for your playlist
            </div>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default SongsTable;
