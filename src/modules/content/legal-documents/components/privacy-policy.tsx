"use client";

import ReactMarkdown from "react-markdown";
import MarkdownComponentStyles from "./markdown-component-styles";
import { useLegalDocument } from "../hooks/use-legal-document";
import { SkeletonTypography } from "@/components/ui/skeleton";

export const PrivacyPolicy = () => {
  const { content, isLoading, error } = useLegalDocument(
    "/api/legal-documents/gizlilik-politikasi",
    "gizlilik-politikasi",
  );

  if (isLoading) {
    return <SkeletonTypography />;
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
