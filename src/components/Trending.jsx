import React from 'react';

const Trending = () => {
    return (
        <div className="trending">
            {/* Sol Bilgi Bölümü */}
            <div className="left">
                <h5>Trending New Song</h5>
                <div className="info">
                    <h2>Bir Sevmek Bin Defa Ölmek Demekmiş</h2>
                    <h4>Barış Akarsu</h4>
                    <h5>20 Million Plays</h5>
                    <div className="buttons">
                        <button>Listen Now</button>
                        <i className="bx bxs-heart"></i>
                    </div>
                </div>
            </div>
            {/* Şarkı Resmi */}
            <img src="/images/cover.jfif" alt="Trending Song" />
        </div>
    );
};

export default Trending;
