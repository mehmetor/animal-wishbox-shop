import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/modules/checkout/templates/legal-documents",
      "kullanim-sartlari.md"
    );
    const content = await readFile(filePath, "utf8");
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Kullanım şartları dosyası okunamadı:", error);
    return new NextResponse("Dosya bulunamadı", { status: 404 });
  }
} 