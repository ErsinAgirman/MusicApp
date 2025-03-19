import React, { createContext, useState, useEffect } from 'react';

export const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null); // Seçili şarkıyı saklayan state
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('http://localhost:5000/spotify/get-spotify-token');
        if (!response.ok) throw new Error('Token alınamadı!');
        const data = await response.json();
        if (data.access_token) {
          console.log('Token alındı:', data.access_token);
          setAccessToken(data.access_token);
        }
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    fetchToken();
  }, []);

  return (
    <SpotifyContext.Provider
      value={{
        accessToken,
        setAccessToken,
        recommendedSongs, // Paylaşılan öneri şarkılar
        setRecommendedSongs,
        setCurrentTrack // Öneri güncelleme fonksiyonu
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};