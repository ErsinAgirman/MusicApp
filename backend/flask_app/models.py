import pickle
import pandas as pd

# Modelleri yükle
with open('kmeans_model.pkl', 'rb') as model_file:
    kmeans = pickle.load(model_file)

with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

# Küme isimleri
cluster_names = {
    0: "Enerjik ve Dramatik",
    1: "Akustik ve Soft",
    2: "Enstrumental ve Hüzünlü",
    3: "Neşeli ve Dans",
    4: "Hafif Tempolu ve Dramatik",
    5: "Yoğun ve Enstrumental"
}

# Veri setini yükle
myDataset = pd.read_csv("dataset_clustered.csv")
