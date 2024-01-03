import React from "react";
import Navbar from "../Navbar/page";

import TracksPage from "./tracks/post";
import ArtistsPage from "./Artists/page";
import AlbumsPage from "./Albums/page";
import PlaylistsPage from "./playlists/page";
import { token } from "@/token";
import EmptyState from "../EmptyState/page";

interface MainPageProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
}
if (token === null || !token.access_token === null) {
  <EmptyState
    title="Unauthenticated"
    subTitle="Unauthenticated, Please login"
  />;
}
const MainPage: React.FC<MainPageProps> = ({ currentUser }) => {
  return (
    <div
      className={`relative w-full mx-auto bg-gradient-to-b 
      from-emerald-800  flex flex-col  rounded-[5px] `}
    >
      <div className="w-full pt-1 px-4 overflow-auto flex-grow max-h-[85vh] pb-10 ">
        <div className="min-h-[100vh]">
          <Navbar currentUser={currentUser} />
          <div>
            <TracksPage />
            <ArtistsPage />
            <AlbumsPage />
            <PlaylistsPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
