import React, { useContext, useEffect, useState } from 'react';
import { SpotifyContext } from '../SpotifyContext';

const RightSection = () => {
    //const [accessToken, setAccessToken] = useState(null);
    const { accessToken, setRecommendedSongs } = useContext(SpotifyContext);
    const [currentTrack, setCurrentTrack] = useState(null); // Çalan şarkının bilgileri
    const [isPlaying, setIsPlaying] = useState(false); // Çalma durumu
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState('off');
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);


    // useEffect(() => {
    //     // Token'ı Flask'tan al
    //     const fetchToken = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/spotify/get-spotify-token');
    //             if (!response.ok) throw new Error('Token alınamadı!');
    //             const data = await response.json();
    //             if (data.access_token) {
    //                 console.log('Token alındı:', data.access_token);
    //                 setAccessToken(data.access_token);
    //             } else {
    //                 console.error('Token bulunamadı!');
    //             }
    //         } catch (error) {
    //             console.error('Hata:', error);
    //         }
    //     };

    //     fetchToken();
    // }, []);

    useEffect(() => {
        if (!accessToken) return;

        // Çalan şarkının bilgilerini al
        const fetchCurrentTrack = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCurrentTrack(data);
                    setIsPlaying(data.is_playing); // Çalma durumunu güncelle
                } else {
                    console.error('Şu an çalan şarkı bilgisi alınamadı.');
                }
            } catch (error) {
                console.error('Hata:', error);
            }
        };

        fetchCurrentTrack();

        // Şarkı bilgisini düzenli olarak kontrol etmek için interval
        const interval = setInterval(fetchCurrentTrack, 5000);

        return () => clearInterval(interval);
    }, [accessToken]);


    const handlePlayPause = async () => {
        if (!accessToken) {
            console.error('Token bulunamadı!');
            return;
        }

        const endpoint = isPlaying
            ? 'https://api.spotify.com/v1/me/player/pause' // Duraklatma endpoint'i
            : 'https://api.spotify.com/v1/me/player/play'; // Çalma endpoint'i

        const bodyData = !isPlaying && !currentTrack // Eğer çalan şarkı yoksa URI ekle
            ? {
                uris: ["spotify:track:3GXcF8i4agXLn1GrXIpZlw"] // Çalınacak şarkının URI'si
            }
            : null;

        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: bodyData ? JSON.stringify(bodyData) : null, // Sadece ilk kez URI gönder
            });

            if (response.ok) {
                setIsPlaying(!isPlaying); // Çalma durumunu tersine çevir
                console.log(isPlaying ? 'Şarkı duraklatıldı.' : 'Şarkı çalıyor.');
            } else {
                console.error('İşlem başarısız:', response.statusText);
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    };
    const handleSkipPrevious = async () => {
        if (!accessToken) return;
        try {
            await fetch('https://api.spotify.com/v1/me/player/previous', {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}` },
            });
        } catch (error) {
            console.error('Hata:', error);
        }
    };


    const handleSkipNext = async () => {
        if (!accessToken) return;
        try {
            await fetch('https://api.spotify.com/v1/me/player/next', {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}` },
            });
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    const handleToggleShuffle = async () => {
        if (!accessToken) return;
        try {
            await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${!isShuffle}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setIsShuffle(!isShuffle);
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    const handleToggleRepeat = async () => {
        if (!accessToken) return;
        const nextMode = repeatMode === 'off' ? 'context' : repeatMode === 'context' ? 'track' : 'off';
        try {
            await fetch(`https://api.spotify.com/v1/me/player/repeat?state=${nextMode}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setRepeatMode(nextMode);
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    const handleToggleLike = async () => {
        if (!currentTrack?.item?.id) {
            console.error('Şarkı ID alınamadı!');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    track_id: currentTrack.item.id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Benzer şarkılar:', data.similar_songs);

                // Yeni önerileri güncelle
                setRecommendedSongs(data.similar_songs);
            } else {
                console.error('Flask isteği başarısız:', response.statusText);
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    };



    const handleToggleDislike = () => {
        setIsDisliked(!isDisliked);
        if (isLiked) setIsLiked(false); // Like aktifse kaldır
    };




    return (
        <div className="right-section">
            {/* Profil Bölümü */}
            <div className="profile">
                <div className="user">
                    <div className="left">
                        <img src="/images/profile.png" alt="Profile" />
                    </div>
                    <div className="right">
                        <h5>Kullanıcı</h5>
                    </div>
                </div>
            </div>

            {/* Müzik Oynatıcı Bölümü */}
            <div className="music-player">
                <div className="top-section">
                    <div className="header">
                        <h5>Oynatıcı</h5>
                    </div>
                    <div className="song-info">
                        {/* Çalan şarkının resmi */}
                        <img
                            src={currentTrack?.item?.album?.images[0]?.url || '/images/default_cover.jpg'}
                            alt="Current Song"
                        />
                        <div className="description">
                            {/* Şarkı Adı */}
                            <h3>{currentTrack?.item?.name || 'Şarkı Yok'}</h3>
                            {/* Sanatçı Adı */}
                            <h5>{currentTrack?.item?.artists?.map(artist => artist.name).join(', ') || ''}</h5>
                            {/* Albüm Adı */}
                            <p>{currentTrack?.item?.album?.name || ''}</p>
                        </div>
                        <div className="progress">
                            {isPlaying ? (
                                <img
                                    src="/images/loading.gif" // Çalma animasyonu için GIF
                                    alt="Playing animation"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '20%', // Yuvarlak şekil
                                    }}
                                />
                            ) : (
                                <p>Şarkı Çalmıyor</p> // Şarkı çalmıyorsa alternatif mesaj
                            )}
                        </div>

                    </div>
                </div>

                <div className="player-actions">
                    <div className="buttons">
                        <i
                            className={`bx bx-repeat ${repeatMode !== 'off' ? 'active-button' : ''}`}
                            onClick={handleToggleRepeat}
                        ></i>
                        <i
                            className={`bx bx-like ${isLiked ? 'like-active' : ''}`}
                            onClick={handleToggleLike}
                        ></i>
                        <i className="bx bx-first-page" onClick={handleSkipPrevious}></i>
                        {/* Play/Pause Button */}
                        <i
                            className={`bx ${isPlaying ? 'bx bx-pause' : 'bx bx-play'} play-button always-blue`}
                            onClick={handlePlayPause}
                        ></i>
                        <i className="bx bx-last-page" onClick={handleSkipNext}></i>
                        <i
                            className={`bx bx-dislike ${isDisliked ? 'dislike-active' : ''}`}
                            onClick={handleToggleDislike}
                        ></i>
                        <i
                            className={`bx bx-transfer-alt ${isShuffle ? 'active-button' : ''}`}
                            onClick={handleToggleShuffle}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSection;
