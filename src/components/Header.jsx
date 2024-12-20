import React from 'react';

const Header = () => {
    return (
        <header className="header">
            {/* Navigasyon Bağlantıları */}
            <div className="nav-links">
                <a href="#">Music</a>
                <a href="#">Live</a>
                <a href="#">Podcast</a>
            </div>

            {/* Arama Çubuğu */}
            <div className="search">
                <i className="bx bx-search"></i>
                <input type="text" placeholder="Type here to search" />
            </div>
        </header>
    );
};

export default Header;
