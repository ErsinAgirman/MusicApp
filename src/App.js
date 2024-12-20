import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Trending from './components/Trending';
import Genres from './components/Genres';
import TopSongs from './components/TopSongs';
import RightSection from './components/RightSection';
import './App.css';  // App.css dosyanızı import edin


function App() {
  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar />

      {/* Ana İçerik */}
      <main>
        <Header />
        <Trending />
        <div className="playlist">
          <Genres />
          <TopSongs />
        </div>
      </main>

      {/* Sağ Bölüm */}
      <RightSection />
    </div>
  );
}

export default App;
