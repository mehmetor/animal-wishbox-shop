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
- [x] `src/modules/content/` ana modül klasörünü oluştur
- [x] `src/modules/content/legal-documents/` alt modül klasörünü oluştur
- [x] Alt klasörleri oluştur:
  - [x] `src/modules/content/legal-documents/components/` - Bileşenler için
  - [x] `src/modules/content/legal-documents/templates/` - Şablonlar için
  - [x] `src/modules/content/legal-documents/hooks/` - Custom hook'lar için
  - [x] `src/modules/content/legal-documents/documents/` - Markdown dosyaları için

### 2. Dosya Taşıma İşlemleri
- [x] Hook dosyasını taşı: 
  - `src/modules/checkout/templates/legal-documents/use-legal-document.ts` → `src/modules/content/legal-documents/hooks/use-legal-document.ts`
- [x] Stil dosyasını taşı: 
  - `src/modules/checkout/templates/legal-documents/markdown-component-styles.tsx` → `src/modules/content/legal-documents/components/markdown-component-styles.tsx`
- [x] Markdown dosyalarını taşı:
  - [x] `gizlilik-politikasi.md` → `src/modules/content/legal-documents/documents/`
  - [x] `satis-sartlari.md` → `src/modules/content/legal-documents/documents/`
  - [x] `kullanim-sartlari.md` → `src/modules/content/legal-documents/documents/`
  - [x] `iade-politikasi.md` → `src/modules/content/legal-documents/documents/`
- [x] Komponent dosyalarını taşı:
  - [x] `privacy-policy.tsx` → `src/modules/content/legal-documents/components/`
  - [x] `terms-of-sale.tsx` → `src/modules/content/legal-documents/components/`
  - [x] `terms-of-use.tsx` → `src/modules/content/legal-documents/components/`
  - [x] `refund-policy.tsx` → `src/modules/content/legal-documents/components/`

### 3. Popup/Modal Bileşeni Oluşturma
- [x] `src/modules/content/legal-documents/components/legal-document-modal.tsx` dosyasını oluştur
- [x] Modal/Dialog yapısını implement et
- [x] Markdown içeriğini modal içinde gösterme mantığını ekle
- [x] Modalın açılıp kapanmasını kontrol eden state ve fonksiyonları ekle

### 4. Template Dosyasını Güncelleme
- [x] `index.tsx` dosyasını `src/modules/content/legal-documents/templates/` altına taşı
- [x] Modal/popup yapısını entegre et
- [x] URL parametrelerine göre ilgili dokümanın gösterilmesini sağla
- [x] Import pathlerini güncelle

### 5. Sayfa Rotaları Oluşturma
- [x] `src/app/[countryCode]/(main)/legal/` klasörünü oluştur
- [x] Her yasal doküman türü için ayrı sayfa oluştur:
  - [x] `privacy-policy/page.tsx`
  - [x] `terms-of-use/page.tsx`
  - [x] `terms-of-sale/page.tsx`
  - [x] `refund-policy/page.tsx`
- [x] Sayfa metadata tanımlarını ekle

### 6. Navigasyon Bağlantılarını Ekleme
- [x] Footer'a bağlantılar ekleme:
  - [x] `src/modules/layout/templates/footer/index.tsx` dosyasını güncelle
  - [x] Yasal dokümanlar için bağlantılar ekle
  - [x] Popup açma fonksiyonalitesini ekle
- [x] Side menu'ye bağlantılar ekleme:
  - [x] `src/modules/layout/components/side-menu/index.tsx` dosyasını güncelle
  - [x] Yasal dokümanlar için bağlantılar ekle
  - [x] Popup açma fonksiyonalitesini ekle

### 7. Import Yollarını Güncelleme
- [x] Tüm dosyalarda import pathlerini yeni yapıya göre düzenle
- [x] API çağrılarını kontrol et ve gerekirse güncelle
- [x] Hook içindeki endpoint pathlerini güncelle

### 8. Test ve Hata Düzeltme
- [x] Tüm sayfaları ve bağlantıları test et
- [x] Modal açılma/kapanma işlemlerini kontrol et
- [x] Markdown içeriğinin doğru görüntülendiğini doğrula
- [ ] Responsive tasarımı kontrol et
- [x] Klavye navigasyonunu (ESC tuşu ile kapatma vb.) test et

## Tespit Edilen Sorunlar ve Ek Görevler

### 1. Modal Entegrasyonu Sorunları
- [x] Side menu'deki modal state'i ile LegalDocuments bileşeni arasında bağlantı oluştur
- [x] Footer ve side menu'de tutarlı modal açma mantığı sağla
- [x] LegalDocuments bileşenine harici modal state kontrolü ekle

### 2. API Endpoint Yolları
- [x] Hook dosyasındaki (`use-legal-document.ts`) API endpoint yollarını güncelle
- [x] API çağrılarında yeni klasör yapısına uygun URL'ler kullan
- [x] Markdown dosyalarına erişim için endpoint'lerin doğru çalıştığını kontrol et

### 3. Çeviri ve Metin Tutarlılığı
- [ ] Sayfa başlıkları için çeviri desteği ekle
- [ ] Statik olarak tanımlanmış Türkçe metinleri çeviri sistemine entegre et
- [ ] Tüm dil dosyalarında eksik çeviri tanımlarını ekle

### 4. Tasarım ve Stil Tutarlılığı
- [ ] Modal ve sayfa içeriklerinin stil tutarlılığını sağla
- [ ] "prose" sınıfının projede doğru yapılandırıldığını kontrol et
- [ ] Modal'ın responsive davranışını tüm ekran boyutlarında test et
- [ ] Mobil görünüm için özel stil ayarlamaları ekle

### 5. SEO ve Erişilebilirlik
- [ ] Sayfa metadatalarının SEO açısından optimize edildiğini kontrol et
- [ ] Modalların erişilebilirlik standartlarına uygun çalıştığını test et (klavye navigasyonu)
- [ ] Screen reader uyumluluğunu kontrol et

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