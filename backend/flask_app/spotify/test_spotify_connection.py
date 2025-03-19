import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from spotify.api_connector import connect_to_api, get_currently_playing, get_track_details, get_audio_features

# Spotify API'ye bağlan
sp = connect_to_api("spotify/spotify_credentials.json")

try:
    # Şu anda dinlenen şarkıyı al
    current_track = get_currently_playing(sp)
    if current_track:
        print(f"Şu an dinlenen şarkı: {current_track['track_name']} - {current_track['artist_name']}")

        # Şarkının detaylarını al
        track_details = get_track_details(sp, current_track["track_id"])
        print("Şarkının Detayları:")
        print(track_details)

        # Şarkının özelliklerini al
        audio_features = get_audio_features(sp, current_track["track_id"])
        print("Şarkının Özellikleri:")
        print(audio_features)
        
    else:
        print("Şu anda bir şarkı dinlenmiyor.")
except Exception as e:
    print(f"Hata: {str(e)}")
