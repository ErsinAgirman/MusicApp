import React, { useState } from 'react';
import Trending from './Trending';

const Header = () => {
    const [query, setQuery] = useState('');
    const [currentSong, setCurrentSong] = useState(null);

    const handleSearch = async () => {
        if (query.trim() === '') return;

        try {
            const response = await fetch('http://127.0.0.1:5000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();

            // En alakalı sonucu currentSong olarak ayarla
            if (data.results && data.results.length > 0) {
                setCurrentSong(data.results[0]);
            } else {
                // Eğer sonuç yoksa currentSong'u null yap
                setCurrentSong(null);
            }
        } catch (error) {
            console.error('Search error:', error.message);
            setCurrentSong(null); // Hata durumunda da default şarkıya dön
        }
    };

    return (
        <div>
            <header className="header">
                {/* Arama Çubuğu */}
                <div className="search">
                    <button onClick={handleSearch} className="bx bx-search"></button>
                    <input
                        type="text"
                        placeholder="Type here to search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </header>

            {/* Aratılan Şarkı Bölümü */}
            <Trending song={currentSong} />
        </div>
    );
};

export default Header;
