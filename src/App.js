import React from 'react';
import { SpotifyProvider } from './SpotifyContext'; // Adjust path as needed
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Trending from './components/Trending';
import Genres from './components/Genres';
import TopSongs from './components/TopSongs';
import RightSection from './components/RightSection';
import './App.css';

function App() {
  return (
    <SpotifyProvider>
      <div className="container">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main>
          <Header />
          <div className="playlist">
            <Genres />
            <TopSongs />
          </div>
        </main>

        {/* Right Section */}
        <RightSection />
      </div>
    </SpotifyProvider>
  );
}

export default App;
