# Yasal Dokümanlar Yeniden Yapılandırma Planı

## Mevcut Durum
Şu anda yasal dokümanlar şu konumda bulunmaktadır:
- `src/modules/checkout/templates/legal-documents/`

Mevcut klasör yapısı:
- Markdown dosyaları (.md) ve bunları gösteren komponentler aynı dizinde
- Her yasal doküman için ayrı bileşen dosyaları mevcut (privacy-policy.tsx, terms-of-sale.tsx, vb.)
- `use-legal-document.ts` hook'u API çağrıları için kullanılmakta
- `markdown-component-styles.tsx` markdown stillemesi için kullanılmakta
- `index.tsx` ana template dosyası olarak kullanılmakta

## Yeniden Yapılandırma Hedefleri
1. Yasal dokümanları proje standartlarına uygun modül yapısına taşımak
2. Footer ve side-menu'dan bağlantılar eklemek
3. Dokümanların popup/modal içinde görüntülenmesini sağlamak
4. Sayfa rotalarını düzenlemek

## Yapılacak İşler

### 1. Yeni Modül Yapısı Oluşturma
- [ ] `src/modules/content/` ana modül klasörünü oluştur
- [ ] `src/modules/content/legal-documents/` alt modül klasörünü oluştur
- [ ] Alt klasörleri oluştur:
  - [ ] `src/modules/content/legal-documents/components/` - Bileşenler için
  - [ ] `src/modules/content/legal-documents/templates/` - Şablonlar için
  - [ ] `src/modules/content/legal-documents/hooks/` - Custom hook'lar için
  - [ ] `src/modules/content/legal-documents/documents/` - Markdown dosyaları için

### 2. Dosya Taşıma İşlemleri
- [ ] Hook dosyasını taşı: 
  - `src/modules/checkout/templates/legal-documents/use-legal-document.ts` → `src/modules/content/legal-documents/hooks/use-legal-document.ts`
- [ ] Stil dosyasını taşı: 
  - `src/modules/checkout/templates/legal-documents/markdown-component-styles.tsx` → `src/modules/content/legal-documents/components/markdown-component-styles.tsx`
- [ ] Markdown dosyalarını taşı:
  - [ ] `gizlilik-politikasi.md` → `src/modules/content/legal-documents/documents/`
  - [ ] `satis-sartlari.md` → `src/modules/content/legal-documents/documents/`
  - [ ] `kullanim-sartlari.md` → `src/modules/content/legal-documents/documents/`
  - [ ] `iade-politikasi.md` → `src/modules/content/legal-documents/documents/`
- [ ] Komponent dosyalarını taşı:
  - [ ] `privacy-policy.tsx` → `src/modules/content/legal-documents/components/`
  - [ ] `terms-of-sale.tsx` → `src/modules/content/legal-documents/components/`
  - [ ] `terms-of-use.tsx` → `src/modules/content/legal-documents/components/`
  - [ ] `refund-policy.tsx` → `src/modules/content/legal-documents/components/`

### 3. Popup/Modal Bileşeni Oluşturma
- [ ] `src/modules/content/legal-documents/components/legal-document-modal.tsx` dosyasını oluştur
- [ ] Modal/Dialog yapısını implement et
- [ ] Markdown içeriğini modal içinde gösterme mantığını ekle
- [ ] Modalın açılıp kapanmasını kontrol eden state ve fonksiyonları ekle

### 4. Template Dosyasını Güncelleme
- [ ] `index.tsx` dosyasını `src/modules/content/legal-documents/templates/` altına taşı
- [ ] Modal/popup yapısını entegre et
- [ ] URL parametrelerine göre ilgili dokümanın gösterilmesini sağla
- [ ] Import pathlerini güncelle

### 5. Sayfa Rotaları Oluşturma
- [ ] `src/app/[countryCode]/(main)/legal/` klasörünü oluştur
- [ ] Her yasal doküman türü için ayrı sayfa oluştur:
  - [ ] `privacy-policy/page.tsx`
  - [ ] `terms-of-use/page.tsx`
  - [ ] `terms-of-sale/page.tsx`
  - [ ] `refund-policy/page.tsx`
- [ ] Sayfa metadata tanımlarını ekle

### 6. Navigasyon Bağlantılarını Ekleme
- [ ] Footer'a bağlantılar ekleme:
  - [ ] `src/modules/layout/templates/footer/index.tsx` dosyasını güncelle
  - [ ] Yasal dokümanlar için bağlantılar ekle
  - [ ] Popup açma fonksiyonalitesini ekle
- [ ] Side menu'ye bağlantılar ekleme:
  - [ ] `src/modules/layout/components/side-menu/index.tsx` dosyasını güncelle
  - [ ] Yasal dokümanlar için bağlantılar ekle
  - [ ] Popup açma fonksiyonalitesini ekle

### 7. Import Yollarını Güncelleme
- [ ] Tüm dosyalarda import pathlerini yeni yapıya göre düzenle
- [ ] API çağrılarını kontrol et ve gerekirse güncelle
- [ ] Hook içindeki endpoint pathlerini güncelle

### 8. Test ve Hata Düzeltme
- [ ] Tüm sayfaları ve bağlantıları test et
- [ ] Modal açılma/kapanma işlemlerini kontrol et
- [ ] Markdown içeriğinin doğru görüntülendiğini doğrula
- [ ] Responsive tasarımı kontrol et
- [ ] Klavye navigasyonunu (ESC tuşu ile kapatma vb.) test et

## Teknik Detaylar

### Modal Yapısı
Modal bileşeni şu özelliklere sahip olmalıdır:
- Açılma/kapanma state'i
- Doküman içeriğini dinamik olarak yükleme
- Responsive tasarım
- Keyboard navigation desteği (ESC ile kapatma, vb.)

### Bağlantı Yapısı
- Footer ve side-menu'daki bağlantılar:
  - Direkt sayfa navigasyonu yerine modal açmalı
  - URL parametresi ile hangi dokümanın açılacağı belirlenebilmeli

### API Çağrıları
- `useLegalDocument` hook'u güncellenerek yeni yapıya uyumlu hale getirilmeli
- API endpoint'leri yeni dosya konumlarına göre güncellenecek

## Dikkat Edilmesi Gerekenler
- Tüm bileşenler ve sayfalar proje standartlarına uygun olmalı
- Client komponentlerde "use client" direktifi kullanılmalı
- TypeScript tiplerinin doğru tanımlanması sağlanmalı
- Tailwind CSS stil tanımlarına uyulmalı
- Responsive tasarım prensipleri gözetilmeli

## Gelecek Geliştirmeler
Bu yapılandırma, ileride eklenebilecek içerik türleri için temel oluşturacaktır:
- `src/modules/content/blog/` - Blog yazıları için (gelecekte)
- `src/modules/content/help/` - Yardım dokümanları için (gelecekte) 