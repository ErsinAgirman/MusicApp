from flask import Blueprint, jsonify
from spotify.api_connector import connect_to_api

# Blueprint oluştur
sptoken = Blueprint('sptoken', __name__)

# Spotify API'ye bağlan
sp = connect_to_api("spotify/spotify_credentials.json")

# Token endpoint'i
@sptoken.route('/get-spotify-token', methods=['GET'])
def get_spotify_token():
    try:
        # Spotipy'den mevcut token'ı al
        token = sp.auth_manager.get_access_token(as_dict=False)
        return jsonify({"access_token": token}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
