import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tailwind Test",
  description: "Test sayfası - Tailwind yapılandırmasını kontrol etmek için",
}

export default function TestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Tailwind Yapılandırma Testi</h1>
      
      <div style={{backgroundColor: 'var(--color-test)'}} className="text-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">CSS Değişkeni</h2>
        <p>Bu kutu, CSS değişkeni olan --color-test'i kullanıyor.</p>
        <p className="mt-2">Eğer bu kutu <strong>mavi</strong> ise, globals.css içindeki @theme direktifi çalışıyor demektir.</p>
      </div>
      
      <div className="bg-test text-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Test Rengi (Tailwind - Özel)</h2>
        <p>Bu kutu, Tailwind'in özel bg-test sınıfını kullanıyor.</p>
      </div>
      
      {/* CSS'de tanımlanan sınıfları kullanma */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="using-apply p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-white">@apply Kullanımı</h3>
          <p className="text-white">Bu element, CSS'de @apply direktifi ile tanımlanan sınıfı kullanıyor.</p>
        </div>
        
        <div className="using-css-var p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-white">CSS Değişkeni Kullanımı</h3>
          <p className="text-white">Bu element, doğrudan CSS değişkeni (var(--color-test)) kullanıyor.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-test p-4 rounded-lg">
          <h3 className="text-test font-medium mb-2">Kenarlık ve Metin Rengi</h3>
          <p>Bu element, kenarlık ve metin rengi olarak test rengini kullanıyor.</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-2">Normal Element</h3>
          <p>Bu normal bir element, özel renk kullanmıyor.</p>
          <button className="mt-4 bg-test text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
            Test Butonu
          </button>
        </div>
      </div>
    </div>
  )
} 