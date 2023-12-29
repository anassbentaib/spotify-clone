import { RootState } from "@/types";

export const hasFavoritedSelector = (
  state: RootState,
  trackId: string
): boolean => {
  return !!state.tracks.favorits?.some((track: any) => track.id === trackId);
};

