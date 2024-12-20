import React from 'react';

const TopSongs = () => {
    return (
        <div className="music-list">
            {/* Başlık */}
            <div className="header">
                <h5>Top Songs</h5>
                <a href="#">See All</a>
            </div>
            {/* Şarkı Listesi */}
            <div className="items">
                <div className="item">
                    <div className="info">
                        <p>01</p>
                        <img src="/images/cover2.jfif" alt="Song Cover" />
                        <div className="details">
                            <h5>Mor ve Ötesi</h5>
                            <p>Daha Mutlu Olamam</p>
                        </div>
                    </div>
                    <div className="actions">
                        <p>03:45</p>
                        <i className="bx bxs-right-arrow"></i>
                        <i className="bx bxs-plus-circle"></i>
                    </div>
                </div>

                <div className="item">
                    <div className="info">
                        <p>02</p>
                        <img src="/images/cover3.jpg" alt="Song Cover" />
                        <div className="details">
                            <h5>Hayko Cepkin</h5>
                            <p>Paranoya</p>
                        </div>
                    </div>
                    <div className="actions">
                        <p>02:52</p>
                        <i className="bx bxs-right-arrow"></i>
                        <i className="bx bxs-plus-circle"></i>
                    </div>
                </div>

                <div className="item">
                    <div className="info">
                        <p>03</p>
                        <img src="/images/cover4.jpg" alt="Song Cover" />
                        <div className="details">
                            <h5>Şebnem Ferah</h5>
                            <p>Bu Aşk Fazla Sana</p>
                        </div>
                    </div>
                    <div className="actions">
                        <p>04:22</p>
                        <i className="bx bxs-right-arrow"></i>
                        <i className="bx bxs-plus-circle"></i>
                    </div>
                </div>

                <div className="item">
                    <div className="info">
                        <p>04</p>
                        <img src="/images/cover5.png" alt="Song Cover" />
                        <div className="details">
                            <h5>Ersin Ağırman</h5>
                            <p>Bitirme Projesi Bitti</p>
                        </div>
                    </div>
                    <div className="actions">
                        <p>04:22</p>
                        <i className="bx bxs-right-arrow"></i>
                        <i className="bx bxs-plus-circle"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopSongs;
