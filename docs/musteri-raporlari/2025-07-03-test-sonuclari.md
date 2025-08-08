# Müşteri Test Raporu - 03.07.2025

Bu doküman, müşteri tarafından yapılan testler sonucunda iletilen geri bildirimleri ve yeni tespitler içermektedir.

## Önceki Rapordan Devam Eden Maddeler (2025-06-24)

Bir önceki test raporundan (`2025-06-24-test-sonuclari.md`) kalan ve henüz tamamlanmamış maddelerdir.

### Masaüstü Ekran Test Sonuçları

- [ ] **Sipariş Akışı UI/UX:** Teslimat adresi sonrası adımlar (Ödeme, Onay) ayrı sayfalar gibi sunulabilir. Kullanıcının "Sipariş Tamamlandı" yazısını en sonda görmesi daha iyi bir deneyim olabilir.
  - **Cevap:** Sipariş Tamamlandı yazısı zaten en son görünüyor ve sipariş özetine yönleniyor. Yine de gerekirse yeni ekran konusunu daha sonra programa alırız.

### Genel Geri Bildirimler ve İstekler

- [ ] **Ödeme Yöntemleri:** "Havale" seçeneğinin yanında, henüz aktif olmasa bile "Sanal POS" gibi bir seçeneğin görsel olarak eklenmesi.
- [ ] **Ürün Gramaj Bilgisi:** Katalog sayfasında, fiyatlar kaldırılırsa onların yerine ürün gramajlarının yazılması.
  - **Cevap** Ürün adlarının sonunda 100g, 1kg gibi miktar bilgileri mevcut.
  - **Cevap:** Yönetim panelinden gramaj bilgileri ayrıca girildikten sonra ekran gösterimini değerlendiririz.
- [ ] **Çerez Onayı:** `stripe_mid` ve `stripe_sid` çerezleri için siteye girişte bir çerez onay mekanizması eklenmesi. (Ayrıca "Çerezlere İlişkin Aydınlatma Metni" hazırlanacak).
  - **Cevap:** stripe çerezleri geçici, kaldırılacak. Şimdilik başka çerez eklenmeyecek. Sanal POS entegrasyonu bittiğinde yeni çerez olursa çerez politikası ekleyebiliriz.

## 03.07.2025 Bildirimleri

- [x] Sipariş Tamamlama esnasında belirsiz bir hata görünüyor
  - **Cevap:** Her ürün için kargo yöntemi seçilmeli. ("Error setting up the request: The cart items require shipping profiles that are not satisfied by the current shipping methods")

## İlaveler ve Ek Düzeltmeler

- [x] Test sürecinde kullanılan verilerin bellekten kalmasından kaynaklanan sorunlara önlem için ilaveler yapıldı.
- [x] Müşteri kayıt ve giriş süreci iyileştirildi.
- [x] Müşteri "şifremi unuttum" akışı iyileştirildi.
- [ ] Müşteri sipariş tamamlanadan önce, sepette iken müşterinin kayıt olması zorunluluğu (sisteme kayıt olmazsa sipariş takibi yapamaz)
- [ ] "Stok miktar" konusu çözülmeli. Sonsuz stok tanımlanacak mı? Ona göre ekranda ürün için "Stok Yok" uyarısı verilecek
- [x] "Test Kargo" kaldırılacak (test için gösterildi)
- [ ] Sipariş bilgilendirme postasında görsel düzenlemeler.
- [ ] İlk siparişte Teslimat Adresi kayıt edilmiyor, ikinci siparişte tekrar adres girmek zorunda kalıyor 
  - [ ] sepette kayıtlı adreslerimden seçim yapabilirliği kontrol edilecek
  - [ ] ilk siparişte girilen adres kaydedilmeli ve /tr/account/addresses sayfasında listelenebilmeli
- [ ] Canlı ortamda e-postalar boş gönderiliyor.
