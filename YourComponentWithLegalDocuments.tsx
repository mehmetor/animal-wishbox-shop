"use client";

import LegalDocuments from "@/modules/content/legal-documents/templates";

export default function YourComponentWithLegalDocuments() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <span>Kullanım şartlarını kabul ediyorum:</span>
        <LegalDocuments variant="inline" />
      </div>
      
      {/* Footer versiyonu */}
      <div className="mt-8 border-t pt-4">
        <LegalDocuments variant="footer" />
      </div>
    </div>
  );
} 