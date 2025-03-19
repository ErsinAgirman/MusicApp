from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

# Cosine Similarity Fonksiyonu
def find_similar_songs(song_features, df, features, is_turkish_only, top_n=5):
    """
    Seçilen şarkıya benzer şarkıları bulur.
    Eğer 'is_turkish_only' True ise sadece 'turkish' türündeki şarkılar dikkate alınır.
    """
    if is_turkish_only:
        df = df[df['track_genre'] == "turkish"]
        if df.empty:
            raise ValueError("Veri kümesinde 'turkish' türünde şarkı bulunamadı.")
    
    feature_matrix = df[features].values
    if feature_matrix.size == 0:
        raise ValueError("Veri kümesinde uygun özelliklere sahip şarkı bulunamadı.")
    
    similarities = cosine_similarity(song_features.reshape(1, -1), feature_matrix)[0]
    df['similarity'] = similarities

    return df.sort_values(by='similarity', ascending=False).head(top_n)
