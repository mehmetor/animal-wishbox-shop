# Müşteri Test Raporu - 26.07.2024

Bu doküman, müşteri tarafından yapılan testler sonucunda iletilen geri bildirimleri içermektedir.

---

## Mobil Ekran Test Sonuçları

1.  [x] **Sepete Ekle Gecikmesi:** Ürün sepete eklenirken bekleme yaşanabiliyor, işlem gecikmeli gerçekleşiyor.
2.  [x] **Sepet/Ödeme Buton Akışı:** "Sepete Git" butonuna basıldıktan sonra buton kaybolmuyor ve altta "Ödemeye Geç" butonu beliriyor. İstenen akış: "Sepete Git" tıklandığında bu butonun kaybolup yerine "Ödemeye Geç" butonunun gelmesi.
3.  [x] **Teslimat Adresi Formu UI Hatası:** "Soyad", "Posta Kodu", "Şehir" ve "Şirket" alanları grid yapısının dışına taşıyor ve arka planla karışıyor.
4.  [x] **Ülke Seçim Alanı:** Ülke seçimi alanında aşağı ok ikonu bulunmasına rağmen seçenekler açılmıyor ve manuel giriş yapılamıyor. Zorunlu alan (`*`) olarak görünmesi kafa karışıklığına yol açıyor.
5.  [x] **Teslimat Adresi Kaydetme Hatası:** Adres bilgileri doldurulduktan sonra ilk denemede hata alınıp ana sayfaya yönlendiriliyor. Tekrar denendiğinde (önceden girilen bilgiler dolu geliyor) işlem başarılı oluyor.
6.  [x] **Ödeme Bilgisi Eksikliği:** Ödeme sayfasında "aşağıdaki banka adresine transfer ediniz" ifadesi yer alıyor ancak banka bilgileri (IBAN vb.) görünmüyor.
7.  [x] **Sipariş Tamamlama Akışı:** "Devam Et" butonundan sonra "Siparişi Tamamla" adımında ya IBAN bilgisi görüntüleniyor ya da "Server Components render error" hatası alınıyor.

---

## Masaüstü Ekran Test Sonuçları

1.  [x] **Sepete Ekle Gecikmesi:** Mobil ile aynı şekilde, ürün sepete eklenirken gecikme yaşanabiliyor.
2.  [x] **Ülke Seçim Alanı:** Mobildeki gibi seçenekler açılmıyor ve manuel giriş yapılamıyor. **Öneri:** Türkiye'nin varsayılan olarak seçili gelmesi.
3.  **Telefon Bilgisi Zorunluluğu:** Teslimat adresinde telefon bilgisinin zorunlu alan olması gerekiyor.
4.  [x] **Teslimat Adresi Kaydetme Hatası:** Mobildekiyle aynı şekilde, ilk denemede hata alınıp ana sayfaya yönlendiriliyor.
5.  **Sipariş Akışı UI/UX:** Teslimat adresi sonrası adımlar (Ödeme, Onay) ayrı sayfalar gibi sunulabilir. Kullanıcının "Sipariş Tamamlandı" yazısını en sonda görmesi daha iyi bir deneyim olabilir.
    - **Cevap:** Sipariş Tamamlandı yazısı zaten en son görünüyor, daha sonra yine de gerekirse yeni ekran konusunu programa alırız.

---

## Genel Geri Bildirimler ve İstekler

1.  **Ödeme Yöntemleri:** "Havale" seçeneğinin yanında, henüz aktif olmasa bile "Sanal POS" gibi bir seçeneğin görsel olarak eklenmesi.
2.  [x] **Kargo Bilgisi:** Kargo bölümünde "Aras Kargo" gibi spesifik bir firma adının belirtilmesi.
    - **Cevap** Sadece Yurtiçi Kargo seçili
4.  [x] **Yasal Metin Onayları:** Sipariş tamamlama aşamasında "Gizlilik Politikası", "İade ve Cayma Hakkı Koşulları", "Mesafeli Satış Sözleşmesi" ve "Açık Rıza (KVKK)" metinlerinin ayrı ayrı sunularak kullanıcı tarafından "okudum, kabul ettim" şeklinde aktif olarak işaretlenmesi gereken bir checkbox ile onaylatılması.
    - **Cevap:** Düzeltildi ama buradaki doküman adları ve sayısı ile bize daha önce gelenler arasında fark var.
5.  [x] **Ana Sayfa Metni:** Ana sayfadaki "Kataloğu Keşfet" ifadesinin "Tüm Ürünleri Keşfet" olarak değiştirilmesi.
6.  [x] **Server Component Hatası:** Zaman zaman "An error occurred in the Server Components render..." hatası alınıyor.
7.  [x] **Katalog Sayfası Ürün Görselleri:** Katalog sayfasındaki ürün görsellerinin çerçeve boyutlarının eşitlenmesi.
8.  [x] **Fiyat Gösterimi:** Ürün listeleme (katalog) sayfasında fiyatların görünmemesi, sadece ürün detayına tıklandığında gösterilmesi.
9.  **Ürün Gramaj Bilgisi:** Katalog sayfasında, fiyatlar kaldırılırsa onların yerine ürün gramajlarının yazılması.
10. [x] **İade Politikası Mail Adresi:** İade politikasındaki `iletişim@animalwishbox.com` adresinin `destek@animalwishbox.com` olarak güncellenmesi.
11. **Çerez Onayı:** `stripe_mid` ve `stripe_sid` çerezleri için siteye girişte bir çerez onay mekanizması eklenmesi. (Ayrıca "Çerezlere İlişkin Aydınlatma Metni" hazırlanacak).
12. **Footer Linkleri:** Websitesi en altındaki "Portal" ve "Dokümantasyon" linklerinin gerekliliğinin değerlendirilmesi.
13. [x] **Sipariş Numarası Oluşturma:** Sipariş numaralarının sıralı artan olmak yerine rastgele (random) bir kod olarak oluşturulması.
    - **Cevap:** 152123'den başlayacak (W00152123). Bu sayede numaralar artık tahmin edilebilir ve düşük olmayacak, yönetim panelinde de ek bir geliştirme gerekmeyecektir. 
14. [x] **Stok Yönetimi:** Stokta son 1 kalan ürünün birden fazla kullanıcı tarafından aynı anda alınması senaryosunun nasıl yönetildiğinin incelenmesi.
    - **Cevap:** Uygulama varyantın yeterli stok miktarına sahip olup olmadığını kontrol eder. Eğer stokta yeterli miktar yoksa (örneğin stokta sadece 1 adet varsa ve iki kullanıcı aynı anda eklemeye çalışıyorsa), stok yetersizliği hata fırlatılır ve ürün sepete eklenmez. Bu kontrol, sepete ekleme işlemi sırasında gerçekleşir ve stok miktarı gerçek zamanlı olarak güncellenir. Böylece, stokta kalan son ürünün birden fazla kullanıcıya satılması engellenir.

---

## Yapılacak Metin Düzenlemeleri (Detaylar Sonra İletilecek)

- [x] Kedi kumlarındaki "%100 doğal" gibi ifadelerin kaldırılması.
- [x] İade ve kargo metinlerindeki "basit değişim" gibi ifadelerin düzenlenmesi.
- [x] **İletişim Bilgileri:** Dubai telefon numarası ve `info@wishfulgeneraltrading` mail adresinin kaldırılması. 