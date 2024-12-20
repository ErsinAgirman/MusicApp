import React from 'react';
import Header from './Header';
import Trending from './Trending';
import Genres from './Genres';
import TopSongs from './TopSongs';

const MainContent = () => {
    return (
        <main>
            <Header />
            <Trending />
            <Genres />
            <TopSongs />
        </main>
    );
};

export default MainContent;
