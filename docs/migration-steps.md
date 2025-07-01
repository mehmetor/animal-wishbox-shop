# Supabase'den Railway'e PostgreSQL Taşıma Adımları (Güvenli ve İyileştirilmiş Yöntem)

Bu doküman, Supabase veritabanınızı Railway'e **iki aşamalı (şema + veri)** olarak, daha güvenilir ve hataya dayanıklı bir yöntemle taşımak için gereken adımları içerir. Bu yöntem, sadece `public` şemasına odaklanarak sağlayıcılar arası yetki ve eklenti uyuşmazlıklarından kaynaklanan hataları ortadan kaldırır.

**Bağlantı Bilgileri:**
- **Supabase (Doğrudan Bağlantı):** `postgresql://postgres.mscrosugxoblkqhymkux:nt8Owvf67Aem@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
- **Hedef (Railway):** `postgresql://postgres:BQvCtLgsgsyveDaUhmVlnQnwCpqhamRv@crossover.proxy.rlwy.net:29330/railway`

---

### Ön Gereksinimler

- Bilgisayarınızda **PostgreSQL Client Araçları** (`pg_dump`, `psql`) kurulu olmalıdır.
- Önceki denemeden kalan yedek dosyalarını (`schema.sql`, `data.sql` vb.) silin.

---

### Adım 1: Railway Veritabanını Temizleme

Önceki denemelerden kalan artık verileri temizlemek için Railway veritabanındaki `public` şemasını tamamen silip yeniden oluşturalım. Bu işlem için pgAdmin veya aşağıdaki komutu kullanabilirsiniz.

**Dikkat: Bu komut, hedef veritabanındaki `public` şemasını ve içindeki tüm verileri kalıcı olarak siler.**

```bash
psql "postgresql://postgres:BQvCtLgsgsyveDaUhmVlnQnwCpqhamRv@crossover.proxy.rlwy.net:29330/railway" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

---

### Adım 2: Sadece `public` Şemasını Yedekleme

Supabase'den sadece `public` şemasının yapılarını (tablolar, fonksiyonlar vb. - veri hariç) `schema.sql` adında bir dosyaya kaydedeceğiz.

- `--schema=public`: Sadece `public` şemasını alır.
- `--no-owner`: Sahiplik bilgilerini (`OWNER TO`) dışa aktarmaz, böylece yetki hataları önlenir.

```bash
pg_dump "postgresql://postgres.mscrosugxoblkqhymkux:nt8Owvf67Aem@aws-0-eu-central-1.pooler.supabase.com:6543/postgres" --schema-only --no-owner --schema=public -f schema.sql
```

---

### Adım 3: Sadece `public` Verisini Yedekleme

Şimdi sadece `public` şemasındaki verinin kendisini `data.sql` adında bir dosyaya kaydedeceğiz.

- `--inserts`: Veriyi standart `INSERT` komutları olarak yazar.
- `--on-conflict-do-nothing`: Eğer bir kayıt (aynı ID ile) hedef veritabanında zaten varsa, hata vermek yerine işlemi atlar. Bu, veri yüklemeyi güvenli ve tekrarlanabilir hale getirir.

```bash
pg_dump "postgresql://postgres.mscrosugxoblkqhymkux:nt8Owvf67Aem@aws-0-eu-central-1.pooler.supabase.com:6543/postgres" --data-only --inserts --schema=public --on-conflict-do-nothing -f data.sql
```

---

### Adım 4: Şemayı Railway'e Geri Yükleme

Temiz `schema.sql` dosyasını Railway veritabanınıza uygulayın. Sadece `public` şemasına odaklandığımız için bu adımın sorunsuz çalışması beklenir.

```bash
psql "postgresql://postgres:BQvCtLgsgsyveDaUhmVlnQnwCpqhamRv@crossover.proxy.rlwy.net:29330/railway" -f schema.sql
```

---

### Adım 5: Veriyi Railway'e Geri Yükleme

Veriyi yüklerken referans (foreign key) ve trigger hatalarını önlemek için `session_replication_role` ayarını kullanacağız. Bu, yükleme sırasında kısıtlamaları geçici olarak devre dışı bırakır.

```bash
psql "postgresql://postgres:BQvCtLgsgsyveDaUhmVlnQnwCpqhamRv@crossover.proxy.rlwy.net:29330/railway" -c "SET session_replication_role = 'replica';" -f data.sql -c "SET session_replication_role = 'origin';"
```

Bu komut tamamlandığında tüm verileriniz Railway veritabanına aktarılmış olacaktır.

---

### Adım 6: Medusa Konfigürasyonunu Güncelleme

Bu adım değişmedi. Railway projenizde, Medusa servisinizin `DATABASE_URL` ortam değişkenini Railway PostgreSQL bağlantı adresinizle güncelleyin.

`DATABASE_URL`: `postgresql://postgres:BQvCtLgsgsyveDaUhmVlnQnwCpqhamRv@crossover.proxy.rlwy.net:29330/railway`

---

### Adım 7: Temizlik

Taşıma işlemi başarıyla tamamlandıktan sonra güvenliğiniz için:
- Yerel makinenizde oluşturduğunuz `schema.sql` ve `data.sql` dosyalarını silin.
- Bu `migration-steps.md` dokümanını projenizden silin. 