import React, { useContext } from 'react';
import { SpotifyContext } from '../SpotifyContext';

const Genres = () => {
    const { setRecommendedSongs } = useContext(SpotifyContext); // SpotifyContext'ten setRecommendedSongs çekiliyor

    // Tıklanan türe göre öneri şarkıları getiren işlev
    const handleGenreClick = async (genre) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/recommend-by-genre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ genre }),
            });

            if (!response.ok) {
                throw new Error(`Server Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`Cluster ${genre} için öneriler:`, data.similar_songs);
            setRecommendedSongs(data.similar_songs || []); // Önerilen şarkıları state'e kaydet
        } catch (error) {
            console.error('Hata:', error.message);
        }
    };



    return (
        <div className="genres">
            {/* Başlık */}
            <div className="header">
                <h5>Türlerim</h5>
            </div>
            {/* Türler */}
            <div className="items">
                <div className="item" onClick={() => handleGenreClick(0)}>
                    <p>Enerjik ve<br /> Dramatik</p>
                </div>
                <div className="item" onClick={() => handleGenreClick(1)}>
                    <p>Akustik ve<br /> Soft</p>
                </div>
                <div className="item" onClick={() => handleGenreClick(2)}>
                    <p>Hüzünlü ve<br /> Enstrumental</p>
                </div>
                <div className="item" onClick={() => handleGenreClick(3)}>
                    <p>Neşeli ve<br /> Dans</p>
                </div>
                <div className="item" onClick={() => handleGenreClick(4)}>
                    <p>Hafif Tempolu<br /> ve Dramatik</p>
                </div>
                <div className="item" onClick={() => handleGenreClick(5)}>
                    <p>Yoğun ve<br /> Enstrumental</p>
                </div>
            </div>
        </div>
    );
};

export default Genres;
