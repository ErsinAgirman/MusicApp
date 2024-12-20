import React from 'react';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="logo">
                <i className="bx bx-music"></i>
                <a href="#">MusicTone</a>
            </div>

            {/* Menu Bölümü */}
            <div className="menu">
                <h5>Menu</h5>
                <ul>
                    <li>
                        <i className="bx bxs-bolt-circle"></i>
                        <a href="#">Explore</a>
                    </li>
                    <li>
                        <i className="bx bxs-volume-full"></i>
                        <a href="#">Genres</a>
                    </li>
                    <li>
                        <i className="bx bxs-album"></i>
                        <a href="#">Albums</a>
                    </li>
                    <li>
                        <i className="bx bxs-microphone"></i>
                        <a href="#">Artist</a>
                    </li>
                    <li>
                        <i className="bx bxs-radio"></i>
                        <a href="#">Podcasts</a>
                    </li>
                </ul>
            </div>

            {/* Library Bölümü */}
            <div className="menu">
                <h5>Library</h5>
                <ul>
                    <li>
                        <i className="bx bx-subdirectory-left"></i>
                        <a href="#">Recent</a>
                    </li>
                    <li>
                        <i className="bx bxs-photo-album"></i>
                        <a href="#">Albums</a>
                    </li>
                    <li>
                        <i className="bx bxs-heart"></i>
                        <a href="#">Favourites</a>
                    </li>
                    <li>
                        <i className="bx bxs-folder"></i>
                        <a href="#">Local</a>
                    </li>
                </ul>
            </div>

            {/* Playlist Bölümü */}
            <div className="menu">
                <h5>Playlist</h5>
                <ul>
                    <li>
                        <i className="bx bxs-folder-plus"></i>
                        <a href="#">Yeni Playlist Oluştur</a>
                    </li>
                    <li>
                        <i className="bx bxs-balloon"></i>
                        <a href="#">Dinleyebileceğim Parçalar</a>
                    </li>
                    <li>
                        <i className="bx bxs-upside-down"></i>
                        <a href="#">Şuan Hissettiğime Göre</a>
                    </li>
                    <li>
                        <i className="bx bxs-tennis-ball"></i>
                        <a href="#">Spor Rutinim</a>
                    </li>
                </ul>
            </div>

            {/* Web Player Bölümü */}
            <div className="playing">
                <div className="top">
                    <img src="/images/web.png" alt="Web Player" />
                    <h4>
                        Web <br /> Player
                    </h4>
                </div>
                <div className="bottom">
                    <i className="bx bx-podcast"></i>
                    <p>Playing On Device</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
