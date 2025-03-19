from flask import Blueprint, request, jsonify
from models import kmeans, scaler, cluster_names, myDataset
from utils import find_similar_songs
import numpy as np
from spotify.api_connector import connect_to_api, get_currently_playing, get_track_details

routes = Blueprint('routes', __name__)

# Spotify bağlantısını oluştur
sp = connect_to_api("spotify/spotify_credentials.json")

def recommend_by_track_id(track_id, is_turkish_only):
    try:
        song = myDataset[myDataset['track_id'] == track_id]
        if song.empty:
            return {"error": f"Track ID {track_id} not found."}
        song_features = song[['danceability', 'energy', 'valence', 'acousticness', 'instrumentalness']].values
        cluster = kmeans.predict(scaler.transform(song_features))[0]  # Şarkının kümesini bul
        cluster_songs = myDataset[myDataset['cluster'] == cluster]

        if is_turkish_only:
            cluster_songs = cluster_songs[cluster_songs['track_genre'] == 'turkish']

        if cluster_songs.empty:
            return {"error": "No songs found in the cluster for the given criteria."}

        similar_songs = cluster_songs.sample(n=min(5, len(cluster_songs)))

        def fetch_album_cover(track_id):
            try:
                details = get_track_details(sp, track_id)
                return details.get('album_cover')  
            except Exception:
                return None  
            
        similar_songs['album_cover'] = similar_songs['track_id'].apply(fetch_album_cover)

        similar_songs['uri'] = similar_songs['track_id'].apply(lambda x: f"spotify:track:{x}")

        similar_songs['duration'] = similar_songs['duration_ms'].apply(
            lambda x: f"{x // 60000}:{(x % 60000) // 1000:02}"
        )

        similar_songs['cluster_name'] = similar_songs['cluster'].map(cluster_names)

        return similar_songs.to_dict(orient='records')

    except Exception as e:
        return {"error": str(e)}
    
@routes.route('/recommend-by-genre', methods=['POST'])
def recommend_by_genre_endpoint():
    try:
        data = request.get_json()
        if 'genre' not in data:
            return jsonify({"error": "Missing required key: 'genre'"}), 400

        genre = int(data['genre']) 
        if 'cluster' not in myDataset.columns:
            return jsonify({"error": "Dataset does not have 'cluster' column."}), 500

        genre_songs = myDataset[myDataset['cluster'] == genre]

        if genre_songs.empty:
            return jsonify({"error": f"No songs found for cluster: {genre}"}), 404

        similar_songs = genre_songs.sample(n=min(5, len(genre_songs)))

        def fetch_album_cover(track_id):
            try:
                details = get_track_details(sp, track_id)
                return details.get('album_cover')  
            except Exception as e:
                print(f"Failed to fetch album cover for track ID {track_id}: {e}")
                return None

        similar_songs['album_cover'] = similar_songs['track_id'].apply(fetch_album_cover)
        similar_songs['uri'] = similar_songs['track_id'].apply(lambda x: f"spotify:track:{x}")
        similar_songs['duration'] = similar_songs['duration_ms'].apply(
            lambda x: f"{x // 60000}:{(x % 60000) // 1000:02}"
        )
        return jsonify({"similar_songs": similar_songs.to_dict(orient='records')}), 200

    except Exception as e:
        print(f"Error in /recommend-by-genre: {e}")
        return jsonify({"error": str(e)}), 500


@routes.route('/recommend', methods=['POST'])
def recommend():
    try:
       
        data = request.get_json()

        if 'track_id' in data: 
            track_id = data['track_id']
            is_turkish_only = data.get('is_turkish_only', 0) == 1
            similar_songs = recommend_by_track_id(track_id, is_turkish_only)
            return jsonify({"similar_songs": similar_songs}), 200

        required_keys = ['danceability', 'energy', 'valence', 'acousticness', 'instrumentalness', 'is_turkish_only']
        if not all(key in data for key in required_keys):
            return jsonify({"error": "Missing one or more required keys: danceability, energy, valence, acousticness, instrumentalness, is_turkish_only"}), 400

        
        song_features = np.array([data['danceability'], data['energy'], data['valence'], 
                                  data['acousticness'], data['instrumentalness']]).reshape(1, -1)

        
        is_turkish_only = data['is_turkish_only'] == 1

        
        scaled_features = scaler.transform(song_features)

        
        features = ['danceability', 'energy', 'valence', 'acousticness', 'instrumentalness']
        similar_songs = find_similar_songs(scaled_features, myDataset, features, is_turkish_only)

       
        def fetch_album_cover(track_id):
            try:
                details = get_track_details(sp, track_id)
                return details.get('album_cover') 
            except Exception:
                return None 

        similar_songs['album_cover'] = similar_songs['track_id'].apply(fetch_album_cover)

        
        similar_songs['uri'] = similar_songs['track_id'].apply(lambda x: f"spotify:track:{x}")

        
        similar_songs['duration'] = similar_songs['duration_ms'].apply(
            lambda x: f"{x // 60000}:{(x % 60000) // 1000:02}"
        )

        similar_songs['cluster_name'] = similar_songs['cluster'].map(cluster_names)

        return jsonify({
            "similar_songs": similar_songs[['track_name', 'artists', 'album_name', 'popularity', 
                                            'track_genre', 'similarity', 'cluster_name', 'duration', 'album_cover', 'uri']].to_dict(orient='records')
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@routes.route("/search", methods=["POST"])
def search():
    try:
        data = request.get_json()
        query = data.get("query", "").strip().lower()

        if not query:
            return jsonify({"error": "Query is required"}), 400

        filtered = myDataset[
            myDataset["track_name"].str.contains(query, case=False, na=False) |
            myDataset["artists"].str.contains(query, case=False, na=False) |
            myDataset["album_name"].str.contains(query, case=False, na=False)
        ]

        if filtered.empty:
            return jsonify({"results": []}), 200

        results = filtered.head(10).to_dict(orient="records")
        for result in results:
            result["album_cover"] = f"/images/album_{result['track_id']}.jpg" 

        return jsonify({"results": results}), 200

    except Exception as e:
        print(f"Hata: {e}")
        return jsonify({"error": str(e)}), 500
    
