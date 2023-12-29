import Sidebar from "../Sidebar/Sidebar";
import { getCurrentUser } from "@/actions/getCurrectUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { token } from "@/token";
import { fetchPlaylists } from "@/actions/getAllPlaylists";
import { setPlayListData } from "@/features/playlists";
import { useEffect } from "react";
import Artists from "./UserDetails";
import { Footer } from "..";

const UserPage = () => {
  const gradientStyle = {
    background: `linear-gradient(transparent, rgba(0, 0, 0, 1))`,
    backgroundColor: `rgb(162, 9, 9)`,
  };
  const { user } = getCurrentUser();
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

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
  const playlists = useSelector((state: RootState) => state?.playlists?.items);

  return (
    <div style={gradientStyle} className="w-full relative mx-auto">
      <div className="">
        <div className="bg-[#000]  grid grid-cols-7 ">
          <div className="col-span-2 bg-[#000]  p-2 overflow-y-auto">
            <Sidebar currentUser={user} playlists={playlists} />
          </div>
          <div className="col-span-5 overflow-y-auto">
            <div className="pt-2 text-white">
              <Artists currentUser={user} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserPage;

// import Sidebar from "../Sidebar/Sidebar";
// import { getPlaylists } from "@/actions/getAllPlaylists";
// import { getArtists } from "@/actions/getArtists";
// import { getAllAlbums } from "@/actions/getAlbums";
// import { getCurrentUser } from "@/actions/getCurrectUser";
// import PlaylistDetails from "./PlaylistDetails";
// import { useState } from "react";

// const PlaylistsPage = () => {
//   const [sidebarWidth, setSidebarWidth] = useState(200);
//   const gradientStyle = {
//     background: `linear-gradient(transparent, rgba(0, 0, 0, 1))`,
//     backgroundColor: `rgb(162, 9, 9)`,
//   };
//   const { playlists } = getPlaylists();
//   const { user } = getCurrentUser();
//   const { artists } = getArtists();
//   const { albums } = getAllAlbums();

//   const handleResize = (e) => {
//     setSidebarWidth(e.clientX);
//   };

//   return (
//     <div
//       style={gradientStyle}
//       className="w-full relative mx-auto min-h-[100vh]"
//     >
//       <div className="font-circular">
//         <div className="bg-[#000] ">
//           <div className="grid grid-cols-7">
//           <div
//               className="col-span-2 bg-[#000] p-2"
//               style={{ width: `${sidebarWidth}px` }}
//             >
//               <div
//                 className="min-h-screen"
//                 onMouseDown={(e) => {
//                   document.addEventListener('mousemove', handleResize);
//                   document.addEventListener('mouseup', () => {
//                     document.removeEventListener('mousemove', handleResize);
//                   });
//                 }}
//               >              <Sidebar
//                 currentUser={user}
//                 albums={albums}
//                 artists={artists}
//                 playlists={playlists}
//               />
//               </div>
//             </div>
//             <div className="col-span-5 ">
//               <div className=" pt-2 text-white">
//                 <PlaylistDetails currentUser={user} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaylistsPage;
