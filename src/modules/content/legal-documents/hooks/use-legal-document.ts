import { useEffect, useState } from "react";

// Genel önbellek
const contentCache: Record<string, string> = {};

/**
 * Yasal dökümanlar için içerik getirme ve önbellekleme hook'u
 */
export const useLegalDocument = (documentPath: string, cacheKey: string) => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);

      // Önbellekte varsa, önbellekten al
      if (contentCache[cacheKey]) {
        setContent(contentCache[cacheKey]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(documentPath);
        if (response.ok) {
          const text = await response.text();
          // Önbelleğe kaydet
          contentCache[cacheKey] = text;
          setContent(text);
        } else {
          console.error(`${documentPath} yüklenemedi`);
          setError("Doküman yüklenemedi");
        }
      } catch (error) {
        console.error(`${documentPath} yüklenirken hata oluştu:`, error);
        setError("Doküman yüklenirken bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [documentPath, cacheKey]);

  return { content, isLoading, error };
}; 