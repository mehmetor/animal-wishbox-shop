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

---

## Genel Geri Bildirimler ve İstekler

1.  **Ödeme Yöntemleri:** "Havale" seçeneğinin yanında, henüz aktif olmasa bile "Sanal POS" gibi bir seçeneğin görsel olarak eklenmesi.
2.  **Kargo Bilgisi:** Kargo bölümünde "Aras Kargo" gibi spesifik bir firma adının belirtilmesi.
3.  **Yasal Metin Onayları:** Sipariş tamamlama aşamasında "Gizlilik Politikası", "İade ve Cayma Hakkı Koşulları", "Mesafeli Satış Sözleşmesi" ve "Açık Rıza (KVKK)" metinlerinin ayrı ayrı sunularak kullanıcı tarafından "okudum, kabul ettim" şeklinde aktif olarak işaretlenmesi gereken bir checkbox ile onaylatılması.
4.  **Ana Sayfa Metni:** Ana sayfadaki "Kataloğu Keşfet" ifadesinin "Tüm Ürünleri Keşfet" olarak değiştirilmesi.
5.  **Server Component Hatası:** Zaman zaman "An error occurred in the Server Components render..." hatası alınıyor.
6.  **Katalog Sayfası Ürün Görselleri:** Katalog sayfasındaki ürün görsellerinin çerçeve boyutlarının eşitlenmesi.
7.  **Fiyat Gösterimi:** Ürün listeleme (katalog) sayfasında fiyatların görünmemesi, sadece ürün detayına tıklandığında gösterilmesi.
8.  **Ürün Gramaj Bilgisi:** Katalog sayfasında, fiyatlar kaldırılırsa onların yerine ürün gramajlarının yazılması.
9.  **İade Politikası Mail Adresi:** İade politikasındaki `iletişim@animalwishbox.com` adresinin `destek@animalwishbox.com` olarak güncellenmesi.
10. **Çerez Onayı:** `stripe_mid` ve `stripe_sid` çerezleri için siteye girişte bir çerez onay mekanizması eklenmesi. (Ayrıca "Çerezlere İlişkin Aydınlatma Metni" hazırlanacak).
11. **Footer Linkleri:** Websitesi en altındaki "Portal" ve "Dokümantasyon" linklerinin gerekliliğinin değerlendirilmesi.
12. **Sipariş Numarası Oluşturma:** Sipariş numaralarının sıralı artan olmak yerine rastgele (random) bir kod olarak oluşturulması.
13. **Stok Yönetimi:** Stokta son 1 kalan ürünün birden fazla kullanıcı tarafından aynı anda alınması senaryosunun nasıl yönetildiğinin incelenmesi.

---

## Yapılacak Metin Düzenlemeleri (Detaylar Sonra İletilecek)

-   Kedi kumlarındaki "%100 doğal" gibi ifadelerin kaldırılması.
-   İade ve kargo metinlerindeki "basit değişim" gibi ifadelerin düzenlenmesi.
-   **İletişim Bilgileri:** Dubai telefon numarası ve `info@wishfulgeneraltrading` mail adresinin kaldırılması. 