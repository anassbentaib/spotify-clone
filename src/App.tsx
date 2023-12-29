import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Authentification,
  Dashboard,
  DashboardDetails,
  PlaylistsPage,
  SearchPage,
  UserPage,
} from "@/components/index";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Authentification />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playlists/:id" element={<PlaylistsPage />} />
          <Route path="/artists/artist/:id" element={<UserPage />} />
          <Route path="/section/:type" element={<DashboardDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
