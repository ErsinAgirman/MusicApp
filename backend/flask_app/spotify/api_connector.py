import spotipy
from spotipy.oauth2 import SpotifyOAuth
import json

def connect_to_api(spotify_credentials_json):
    """
    Spotify API'ye bağlanmak için bir bağlantı nesnesi döndürür.
    """
    try:
        # Kimlik bilgilerini JSON dosyasından yükle
        with open(spotify_credentials_json, 'r') as file:
            credentials = json.load(file)

        # Spotify API bağlantısını oluştur
        sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=credentials["client_id"],
    client_secret=credentials["client_secret"],
    redirect_uri=credentials["redirect_uri"],
    scope = "user-read-playback-state user-modify-playback-state streaming app-remote-control"

))

        return sp
    except Exception as e:
        print(f"Hata: Spotify API bağlantısı kurulamadı. {str(e)}")
        raise

def get_currently_playing(sp):
    """
    Kullanıcının şu an dinlediği şarkıyı döndürür.
    """
    try:
        current_track = sp.current_user_playing_track()
        if current_track is None or current_track['item'] is None:
            return None

        return {
            "track_name": current_track['item']['name'],
            "artist_name": current_track['item']['artists'][0]['name'],
            "track_id": current_track['item']['id']
        }
    except Exception as e:
        print(f"Hata: Şu an dinlenen şarkı alınamadı. {str(e)}")
        raise

def get_audio_features(sp, track_id):
    """
    Şarkının özelliklerini Spotify'dan alır.
    """
    try:
        endpoint = f"https://api.spotify.com/v1/audio-features/{track_id}"
        headers = sp._auth_headers()
        response = sp._session.get(endpoint, headers=headers)
        response.raise_for_status()

        features = response.json()
        return {
            "danceability": features.get("danceability"),
            "energy": features.get("energy"),
            "valence": features.get("valence"),
            "acousticness": features.get("acousticness"),
            "instrumentalness": features.get("instrumentalness"),
        }
    except Exception as e:
        print(f"Hata: Şarkı özellikleri alınamadı. {str(e)}")
        raise

def get_track_details(sp, track_id):
    try:
        # Spotify API'den detayları al
        endpoint = f"https://api.spotify.com/v1/tracks/{track_id}"
        headers = sp._auth_headers()
        response = sp._session.get(endpoint, headers=headers)
        response.raise_for_status()
        track_details = response.json()

        # Albüm kapağı URL'sini al
        album_cover = None
        if 'album' in track_details and track_details['album']['images']:
            album_cover = track_details['album']['images'][0]['url']  # Büyük boyutlu albüm kapağı

        return {
            "track_name": track_details['name'],
            "artists": ", ".join([artist['name'] for artist in track_details['artists']]),
            "album_name": track_details['album']['name'],
            "album_cover": album_cover,  # Albüm kapağını buradan döndürüyoruz
        }
    except Exception as e:
        print(f"Error fetching track details: {e}")
        raise
