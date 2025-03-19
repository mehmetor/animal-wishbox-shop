"use client";

import ReactMarkdown from "react-markdown";
import MarkdownComponentStyles from "./markdown-component-styles";
import { useLegalDocument } from "./use-legal-document";

export const TermsOfSale = () => {
  const { content, isLoading, error } = useLegalDocument(
    "/api/legal-documents/satis-sartlari",
    "satis-sartlari"
  );

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ReactMarkdown components={MarkdownComponentStyles}>
      {content}
    </ReactMarkdown>
  );
};
