# Music Recommendation App (Müzik Öneri Uygulaması)

MusicApp, kullanıcıların müzik tercihlerini analiz ederek onlara en uygun şarkıları öneren bir uygulamadır. 🎵

🚀 Teknolojiler:

Frontend: React.js
Backend: Flask (Python)

## 🛠 Kurulum ve Çalıştırma
Projeyi Klonla
```sh
 git clone https://github.com/ErsinAgirman/MusicApp.git
```
```sh
 cd MusicApp
``` 

##Frontend Kurulumu ve Çalıştırma
```sh
cd frontend
```
```sh
npm install
```

## Frontend'i başlat
```sh
npm start
```

## 🛠 Backend (Flask) Kurulumu ve Çalıştırma
```sh
cd ../backend
```
```sh
pip install -r requirements.txt
```
```sh
python app.py
```

1️⃣ Veri Setinin Hazırlanması

Kullanılan veri seti: Şarkılar hakkında çeşitli bilgileri içeren bir CSV dosyası kullanıldı.

Öznitelik seçimi: Modelin eğitiminde kullanılan temel öznitelikler şunlardır:

danceability, energy, valence, tempo, acousticness, instrumentalness, liveness, speechiness

Eksik veya hatalı veriler temizlendi.

2️⃣ Veri Ön İşleme

Tüm sayısal öznitelikler Min-Max Normalizasyonu ile [0,1] aralığına ölçeklendirildi.

Kategorik değişkenler (örn. müzik türleri) One-Hot Encoding yöntemiyle sayısal hale getirildi.

3️⃣ Modelin Eğitilmesi

K-Means Kümeleme Algoritması kullanılarak benzer şarkılar gruplara ayrıldı.

En uygun küme sayısını belirlemek için Elbow Method kullanıldı.

Belirlenen küme sayısına göre model eğitildi ve her şarkının bir kümeye ait olması sağlandı.

Eğitilen model, daha sonra kullanılmak üzere model.pkl dosyası olarak kaydedildi.

4️⃣ Modelin Test Edilmesi ve Değerlendirilmesi

Model, belirlenen metrikler kullanılarak test edildi.

Şarkı kümeleri analiz edilerek öneri sisteminin doğruluğu değerlendirildi.

Kullanıcı girdileri ile testler yapılarak şarkı önerilerinin mantıklı olup olmadığı gözlemlendi.

5️⃣ Öneri Sistemi Mekanizması

Kullanıcı belirli bir şarkıyı seçtiğinde, o şarkının bulunduğu kümedeki diğer şarkılar öneri olarak sunulur.

Şarkı özellikleri birbirine yakın olan parçalar, öneri sisteminde öncelikli olarak listelenir.

![Ekran görüntüsü 2025-03-19 110640](https://github.com/user-attachments/assets/544dee08-140d-4907-8a2a-4a6fa4a99a8b)
![Ekran görüntüsü 2025-03-19 110607](https://github.com/user-attachments/assets/5e34c3ce-effe-4263-b640-ff513d66adc1)
