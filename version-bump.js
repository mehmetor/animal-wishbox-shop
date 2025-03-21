#!/usr/bin/env node

/**
 * Animal Wishbox projesi için versiyon arttırma script dosyası
 * Bu script, package.json dosyasındaki versiyon numarasını belirtilen şekilde arttırır.
 * Ayrıca footer dosyasındaki versiyon numarasını da günceller.
 * 
 * Kullanım:
 * node version-bump.js [patch|minor|major]
 * 
 * Örnek:
 * node version-bump.js patch  # 1.0.0 -> 1.0.1
 * node version-bump.js minor  # 1.0.0 -> 1.1.0
 * node version-bump.js major  # 1.0.0 -> 2.0.0
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Versiyon arttırma türü
const bumpType = process.argv[2] || 'patch';

if (!['patch', 'minor', 'major'].includes(bumpType)) {
  console.error('Hata: Versiyon arttırma türü "patch", "minor" veya "major" olmalıdır.');
  process.exit(1);
}

// Mevcut versiyonu package.json'dan alıyoruz
const packageJsonPath = path.join(process.cwd(), 'package.json');

try {
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonContent);
  const currentVersion = packageJson.version;

  console.log(`Mevcut versiyon: ${currentVersion}`);
  console.log(`Versiyon arttırma türü: ${bumpType}`);

  // Versiyon numarasını ayrıştırma
  const [major, minor, patch] = currentVersion.split('.').map(Number);

  // Versiyon numarasını arttırma
  let newVersion;
  if (bumpType === 'major') {
    newVersion = `${major + 1}.0.0`;
  } else if (bumpType === 'minor') {
    newVersion = `${major}.${minor + 1}.0`;
  } else {
    newVersion = `${major}.${minor}.${patch + 1}`;
  }

  // Package.json'u güncelleme
  packageJson.version = newVersion;

  // Değişiklikleri dosyaya yazma
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  console.log(`Yeni versiyon: ${newVersion}`);
  console.log('Versiyon başarıyla güncellendi!');

  // Footer dosyasını güncelleme
  const footerPath = path.join(process.cwd(), 'src', 'modules', 'layout', 'templates', 'footer', 'index.tsx');
  
  if (fs.existsSync(footerPath)) {
    let footerContent = fs.readFileSync(footerPath, 'utf8');
    
    // Regex ile versiyon satırını bul ve değiştir
    const versionRegex = /<p>v[0-9]+\.[0-9]+\.[0-9]+<\/p>/;
    const newVersionText = `<p>v${newVersion}</p>`;
    
    if (versionRegex.test(footerContent)) {
      footerContent = footerContent.replace(versionRegex, newVersionText);
      fs.writeFileSync(footerPath, footerContent);
      console.log('Footer dosyasındaki versiyon güncellendi!');
    } else {
      console.warn('Footer dosyasında versiyon satırı bulunamadı.');
    }
  } else {
    console.warn('Footer dosyası bulunamadı.');
  }

  // İsteğe bağlı olarak git commit ve push işlemleri
  const shouldCommit = process.argv.includes('--commit');
  
  if (shouldCommit) {
    console.log('Değişiklikler commit ediliyor...');
    
    exec('git add package.json src/modules/layout/templates/footer/index.tsx', (error) => {
      if (error) {
        console.error(`Git add hatası: ${error.message}`);
        return;
      }
      
      exec(`git commit -m "Versiyon arttırıldı: v${newVersion}"`, (error) => {
        if (error) {
          console.error(`Git commit hatası: ${error.message}`);
          return;
        }
        
        console.log('Değişiklikler commit edildi.');
        
        const shouldPush = process.argv.includes('--push');
        
        if (shouldPush) {
          console.log('Değişiklikler push ediliyor...');
          
          exec('git push', (error) => {
            if (error) {
              console.error(`Git push hatası: ${error.message}`);
              return;
            }
            
            console.log('Değişiklikler push edildi.');
          });
        }
      });
    });
  }
} catch (error) {
  console.error(`Hata oluştu: ${error.message}`);
} 