import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SpotifyContext } from '../SpotifyContext';

const TopSongs = () => {
    const [songs, setSongs] = useState([]); // Şarkı listesi
    const { recommendedSongs, setCurrentTrack, accessToken } = useContext(SpotifyContext); // Spotify context verileri

    // Önerilen şarkıları almak için useEffect
    useEffect(() => {
        // Eğer context'ten bir öneri listesi varsa, doğrudan bu listeyi kullan
        if (recommendedSongs.length > 0) {
            setSongs(recommendedSongs); // SpotifyContext'teki şarkıları state'e kaydet
        } else {
            // Eğer öneri listesi boşsa, API çağrısı yap
            const fetchSongs = async () => {
                try {
                    const response = await axios.post('http://127.0.0.1:5000/recommend', {
                        danceability: 0.486,
                        energy: 0.628,
                        valence: 0.5,
                        acousticness: 0.666,
                        instrumentalness: 3.13e-5,
                        is_turkish_only: 1,
                    });
                    console.log('API Response:', response.data.similar_songs);
                    setSongs(response.data.similar_songs || []); // Gelen şarkıları state'e kaydet
                } catch (error) {
                    console.error('Error fetching songs:', error);
                }
            };

            fetchSongs();
        }
    }, [recommendedSongs]); // recommendedSongs değiştiğinde tetiklenir

    // Şarkıyı oynatmak için işlev
    const handlePlay = async (song) => {
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
                    uris: [song.uri],
                }),
            });

            if (response.ok) {
                console.log(`Şarkı oynatılıyor: ${song.track_name}`);
                setCurrentTrack(song); // Çalan şarkıyı güncelle
            } else {
                const errorText = await response.text();
                console.error(`Şarkı oynatılamadı: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    // Şarkı listesini render eden bileşen
    return (
        <div className="music-list">
            {/* Başlık */}
            <div className="header">
                <h5>Önerilen Şarkılar</h5>
            </div>
            {/* Şarkı Listesi */}
            <div className="items">
                {songs.map((song, index) => (
                    <div
                        className="item"
                        key={index}
                        onClick={() => handlePlay(song)} // Şarkıya tıklanınca oynat
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="info">
                            {/* Sıra numarası */}
                            <p>{index + 1}</p>
                            {/* Albüm kapağı */}
                            <img
                                src={song.album_cover || '/images/default_cover.jpg'}
                                alt="Album Cover"
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '5px',
                                }}
                            />
                            {/* Şarkı detayları */}
                            <div className="details">
                                <h5>{song.track_name}</h5> {/* Şarkı Adı */}
                                <p>{song.artists}</p> {/* Sanatçı Adı */}
                            </div>
                        </div>
                        {/* Şarkı aksiyonları */}
                        <div className="actions">
                            <p>{song.duration}</p> {/* Süre */}
                            <i className="bx bxs-right-arrow" title="Çal"></i> {/* Çalma simgesi */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopSongs;
