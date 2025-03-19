import React, { useContext } from 'react';
import { SpotifyContext } from '../SpotifyContext';

const Trending = ({ song }) => {
    const { accessToken } = useContext(SpotifyContext); // SpotifyContext'ten accessToken al

    // Eğer şarkı bilgisi yoksa default değerlere düş
    const defaultSong = {
        track_name: 'Bir Sevmek Bin Defa Ölmek Demekmiş',
        artists: 'Barış Akarsu',
        popularity: '20 Milyon Dinlenme',
        track_id: 'default_track_id', // Örnek bir track_id
    };

    const currentSong = song || defaultSong;

    // Şarkıyı oynatmak için Spotify API çağrısı
    const handlePlaySong = async () => {
        if (!accessToken) {
            console.error('Access token bulunamadı!');
            return;
        }

        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/play', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: [`spotify:track:${currentSong.track_id}`], // Şarkı URI'sini gönder
                }),
            });

            if (response.ok) {
                console.log(`Şarkı oynatılıyor: ${currentSong.track_name}`);
            } else {
                const errorText = await response.text();
                console.error(`Şarkı oynatılamadı: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    return (
        <div className="trending">
            {/* Sol Bilgi Bölümü */}
            <div className="left">
                <h5>Aratılan Şarkı</h5>
                <div className="info">
                    <h2>{currentSong.track_name}</h2>
                    <h4>{currentSong.artists}</h4>
                    <h5>{currentSong.popularity}</h5>
                    <div className="buttons">
                        <button onClick={handlePlaySong}>Şimdi Dinle</button>
                        <i className="bx bxs-heart"></i>
                    </div>
                </div>
            </div>
            {/* Şarkı Resmi - Her zaman default görsel */}
            <img src="/images/defaultmusic.jpg" alt="Trending Song" />
        </div>
    );
};

export default Trending;
