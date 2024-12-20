import React from 'react';

const Genres = () => {
    return (
        <div className="genres">
            {/* Başlık */}
            <div className="header">
                <h5>Genres</h5>
                <a href="#">See All</a>
            </div>
            {/* Türler */}
            <div className="items">
                <div className="item">
                    <p>Electro <br /> Pop</p>
                </div>
                <div className="item">
                    <p>Dance <br /> Beat</p>
                </div>
                <div className="item">
                    <p>ClubHouse <br /> Remix</p>
                </div>
                <div className="item">
                    <p>Hip Hop <br /> Rap</p>
                </div>
                <div className="item">
                    <p>Alternative <br /> Indie</p>
                </div>
                <div className="item">
                    <p>Classical <br /> Period</p>
                </div>
            </div>
        </div>
    );
};

export default Genres;
