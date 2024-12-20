import React from 'react';

const RightSection = () => {
    return (
        <div className="right-section">
            {/* Profil Bölümü */}
            <div className="profile">
                <i className="bx bxs-bell"></i>
                <i className="bx bxs-cog"></i>
                <div className="user">
                    <div className="left">
                        <img src="/images/profile.png" alt="Profile" />
                    </div>
                    <div className="right">
                        <h5>Rana Türkyılmaz</h5>
                    </div>
                </div>
            </div>

            {/* Müzik Oynatıcı Bölümü */}
            <div className="music-player">
                <div className="top-section">
                    <div className="header">
                        <h5>Player</h5>
                        <i className="bx bxs-playlist"></i>
                    </div>
                    <div className="song-info">
                        <img src="/images/cover6.webp" alt="Current Song" />
                        <div className="description">
                            <h3>En Güzel Günüm Gecem</h3>
                            <h5>Duman</h5>
                            <p>Moduma En Uygun Parçalar</p>
                        </div>
                        <div className="progress">
                            <p>02:45</p>
                            <div className="active-line"></div>
                            <div className="deactive-line"></div>
                            <p>01:02</p>
                        </div>
                    </div>
                </div>

                {/* Oynatıcı Kontrolleri */}
                <div className="player-actions">
                    <div className="buttons">
                        <i className="bx bx-repeat"></i>
                        <i className="bx bxs-caret-up-circle"></i>
                        <i className="bx bx-first-page"></i>
                        <i className="bx bxs-right-arrow play-button"></i>
                        <i className="bx bx-last-page"></i>
                        <i className="bx bxs-caret-down-circle"></i>
                        <i className="bx bx-transfer-alt"></i>
                    </div>
                    <div className="lyrics">
                        <i className="bx bx-chevron-up"></i>
                        <h5>LYRICS</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSection;
