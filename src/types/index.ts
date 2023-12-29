export interface RootState {
  player: {
    player: any;
    isPlaying: any;
  };
  user: {
    currentUser: any;
    token: any;
  };
  tracks: {
    items: any;
    favorits: any;
  };
  playlists: {
    items: any;
    playlisDetails: any;
  };
  artists: {
    items: any;
    artistDetails: any;
  };
  volume: {
    volume: any;
  };
  albums: {
    items: any;
  };
  search: {
    searchQuery: any;
    searchResults: any;
  };
}
