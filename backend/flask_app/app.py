from flask import Flask,jsonify
from routes import routes
from flask_cors import CORS
from sptoken import sptoken
from pymongo import MongoClient


app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({"message": "Flask backend çalışıyor!"})

client = MongoClient('mongodb://localhost:27017/')  # Yerel MongoDB bağlantısı
db = client['music_app']  # Veritabanı adı
collection = db['liked_songs']  # Koleksiyon adı

#CORS yapılandırması oluştur  "http://localhost:3000" ile sınırlandırılabilir.
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# Blueprint'i kaydet
app.register_blueprint(sptoken, url_prefix='/spotify')
app.register_blueprint(routes)


if __name__ == '__main__':
    app.run(debug=True)
