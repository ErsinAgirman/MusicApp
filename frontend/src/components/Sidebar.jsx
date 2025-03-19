import React, { useState } from 'react';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true); // Sidebar açık/kapalı durumunu tutar

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Durumu tersine çevirerek aç/kapa işlemi
    };

    return (
        <div className="layout">
            <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                {/* Logo */}
                <div className="logo" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
                    <i className="bx bx-music"></i>
                    <a href="#">MusicTone</a>
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

            {/* Main Content */}
            <main className={`content ${isOpen ? '' : 'expanded'}`}>{children}</main>
        </div>
    );
};

export default Sidebar;
