# Müşteri Test Raporu - 26.07.2024

Bu doküman, müşteri tarafından yapılan testler sonucunda iletilen geri bildirimleri içermektedir.

- "[x]" işaretleri içeren maddeler tamamlanmış. 
- Bazı maddelerin altına "Cevap" notları eklenmiştir.
- "Sanal POS", "Sipariş Akışı UI/UX" ve "Çerez" konuları beklemededir.



## Mobil Ekran Test Sonuçları

- [x] **Sepete Ekle Gecikmesi:** Ürün sepete eklenirken bekleme yaşanabiliyor, işlem gecikmeli gerçekleşiyor.
- [x] **Sepet/Ödeme Buton Akışı:** "Sepete Git" butonuna basıldıktan sonra buton kaybolmuyor ve altta "Ödemeye Geç" butonu beliriyor. İstenen akış: "Sepete Git" tıklandığında bu butonun kaybolup yerine "Ödemeye Geç" butonunun gelmesi.
- [x] **Teslimat Adresi Formu UI Hatası:** "Soyad", "Posta Kodu", "Şehir" ve "Şirket" alanları grid yapısının dışına taşıyor ve arka planla karışıyor.
- [x] **Ülke Seçim Alanı:** Ülke seçimi alanında aşağı ok ikonu bulunmasına rağmen seçenekler açılmıyor ve manuel giriş yapılamıyor. Zorunlu alan (`*`) olarak görünmesi kafa karışıklığına yol açıyor.
- [x] **Teslimat Adresi Kaydetme Hatası:** Adres bilgileri doldurulduktan sonra ilk denemede hata alınıp ana sayfaya yönlendiriliyor. Tekrar denendiğinde (önceden girilen bilgiler dolu geliyor) işlem başarılı oluyor.
- [x] **Ödeme Bilgisi Eksikliği:** Ödeme sayfasında "aşağıdaki banka adresine transfer ediniz" ifadesi yer alıyor ancak banka bilgileri (IBAN vb.) görünmüyor.
- [x] **Sipariş Tamamlama Akışı:** "Devam Et" butonundan sonra "Siparişi Tamamla" adımında ya IBAN bilgisi görüntüleniyor ya da "Server Components render error" hatası alınıyor.



## Masaüstü Ekran Test Sonuçları

- [x] **Sepete Ekle Gecikmesi:** Mobil ile aynı şekilde, ürün sepete eklenirken gecikme yaşanabiliyor.
- [x] **Ülke Seçim Alanı:** Mobildeki gibi seçenekler açılmıyor ve manuel giriş yapılamıyor. **Öneri:** Türkiye'nin varsayılan olarak seçili gelmesi.
- [x] **Telefon Bilgisi Zorunluluğu:** Teslimat adresinde telefon bilgisinin zorunlu alan olması gerekiyor.
- [x] **Teslimat Adresi Kaydetme Hatası:** Mobildekiyle aynı şekilde, ilk denemede hata alınıp ana sayfaya yönlendiriliyor.
- **Sipariş Akışı UI/UX:** Teslimat adresi sonrası adımlar (Ödeme, Onay) ayrı sayfalar gibi sunulabilir. Kullanıcının "Sipariş Tamamlandı" yazısını en sonda görmesi daha iyi bir deneyim olabilir.
  - **Cevap:** Sipariş Tamamlandı yazısı zaten en son görünüyor, daha sonra yine de gerekirse yeni ekran konusunu programa alırız.



## Genel Geri Bildirimler ve İstekler

- [ ] **Ödeme Yöntemleri:** "Havale" seçeneğinin yanında, henüz aktif olmasa bile "Sanal POS" gibi bir seçeneğin görsel olarak eklenmesi.
- [x] **Kargo Bilgisi:** Kargo bölümünde "Aras Kargo" gibi spesifik bir firma adının belirtilmesi.
  - **Cevap** Sadece Yurtiçi Kargo seçili
- [x] **Yasal Metin Onayları:** Sipariş tamamlama aşamasında "Gizlilik Politikası", "İade ve Cayma Hakkı Koşulları", "Mesafeli Satış Sözleşmesi" ve "Açık Rıza (KVKK)" metinlerinin ayrı ayrı sunularak kullanıcı tarafından "okudum, kabul ettim" şeklinde aktif olarak işaretlenmesi gereken bir checkbox ile onaylatılması.
  - **Cevap:** Düzeltildi ama buradaki doküman adları ve sayısı ile bize daha önce gelenler arasında fark var.
- [x] **Ana Sayfa Metni:** Ana sayfadaki "Kataloğu Keşfet" ifadesinin "Tüm Ürünleri Keşfet" olarak değiştirilmesi.
- [x] **Server Component Hatası:** Zaman zaman "An error occurred in the Server Components render..." hatası alınıyor.
- [x] **Katalog Sayfası Ürün Görselleri:** Katalog sayfasındaki ürün görsellerinin çerçeve boyutlarının eşitlenmesi.
- [x] **Fiyat Gösterimi:** Ürün listeleme (katalog) sayfasında fiyatların görünmemesi, sadece ürün detayına tıklandığında gösterilmesi.
- [ ] **Ürün Gramaj Bilgisi:** Katalog sayfasında, fiyatlar kaldırılırsa onların yerine ürün gramajlarının yazılması.
  - **Cevap:** Yönetim panelinden gramaj bilgileri girildikten sonra ekran gösterimini yapacağız.
- [x] **İade Politikası Mail Adresi:** İade politikasındaki `iletişim@animalwishbox.com` adresinin `destek@animalwishbox.com` olarak güncellenmesi.
- [ ] **Çerez Onayı:** `stripe_mid` ve `stripe_sid` çerezleri için siteye girişte bir çerez onay mekanizması eklenmesi. (Ayrıca "Çerezlere İlişkin Aydınlatma Metni" hazırlanacak).
  - **Cevap:** stripe çerezleri geçici, kaldırılacak. Şimdilik başka çerez eklenmeyecek. Yine de çerez politikası ekleyebiliriz.
- [x] **Footer Linkleri:** Websitesi en altındaki "Portal" ve "Dokümantasyon" linkleri kaldırıldı.
- [x] **Sipariş Numarası Oluşturma:** Sipariş numaralarının sıralı artan olmak yerine rastgele (random) bir kod olarak oluşturulması.
  - **Cevap:** 152123'den başlayacak (W00152123). Bu sayede numaralar artık tahmin edilebilir ve düşük olmayacak, yönetim panelinde de ek bir geliştirme gerekmeyecektir.
- [x] **Stok Yönetimi:** Stokta son 1 kalan ürünün birden fazla kullanıcı tarafından aynı anda alınması senaryosunun nasıl yönetildiğinin incelenmesi.
  - **Cevap:** Uygulama varyantın yeterli stok miktarına sahip olup olmadığını kontrol eder. Eğer stokta yeterli miktar yoksa (örneğin stokta sadece 1 adet varsa ve iki kullanıcı aynı anda eklemeye çalışıyorsa), stok yetersizliği hata fırlatılır ve ürün sepete eklenmez. Bu kontrol, sepete ekleme işlemi sırasında gerçekleşir ve stok miktarı gerçek zamanlı olarak güncellenir. Böylece, stokta kalan son ürünün birden fazla kullanıcıya satılması engellenir.



## Yapılacak Metin Düzenlemeleri (Detaylar Sonra İletilecek)

- [x] Kedi kumlarındaki "%100 doğal" gibi ifadelerin kaldırılması.
- [x] İade ve kargo metinlerindeki "basit değişim" gibi ifadelerin düzenlenmesi.
- [x] **İletişim Bilgileri:** Dubai telefon numarası ve `info@wishfulgeneraltrading` mail adresinin kaldırılması.

## Diğer düzeltme ve geliştirmeler

- [x] E-posta gönderimleri
- [x] Şifre sıfırlama (unutma durumu) akışı
- [x] Görsel düzenlemeler