import React, { useState } from 'react';
import axios from 'axios';

const RecommendSongs = () => {
    const [recommendations, setRecommendations] = useState([]);

    const getRecommendations = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/recommend', {
                danceability: 0.7,
                energy: 0.8,
                valence: 0.8,
                acousticness: 0.1,
                instrumentalness: 0.3,
                is_turkish_only: 1,
            });
            console.log("Recommendations Response:", response.data.similar_songs); // Dönen veriyi kontrol edin
            setRecommendations(response.data.similar_songs || []); // State'e kaydediyoruz
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };


    return (
        <div>
            <button onClick={getRecommendations}>Get Recommendations</button>
            <ul>
                {recommendations.map((song, index) => (
                    <li key={index}>
                        <img
                            src={song.album_cover || "/images/default_cover.jpg"}
                            alt="Song Cover"
                            style={{ width: '30px', height: '30px', borderRadius: '5px', marginRight: '10px' }}
                        />
                        {song.track_name} by {song.artists} - {song.cluster_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendSongs;
