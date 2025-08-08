import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = request.nextUrl.searchParams.get("secret");
  const secretFromEnv = process.env.REVALIDATE_SECRET;

  console.log(`🔄 [REVALIDATE-FRONTEND] Request received`);
  console.log(`🔑 [REVALIDATE-FRONTEND] Secret check: ${secret === secretFromEnv ? 'MATCH' : 'MISMATCH'}`);

  if (secret !== secretFromEnv) {
    console.log(`❌ [REVALIDATE-FRONTEND] Invalid secret provided`);
    return NextResponse.json({ status: 401, message: "Invalid secret" });
  }

  const body = await request.json();
  const { event, revalidationData } = body;

  console.log(`📥 [REVALIDATE-FRONTEND] Event: ${event}`, { revalidationData });

  if (!event || !revalidationData) {
    console.log(`❌ [REVALIDATE-FRONTEND] Bad request: missing event or revalidationData`);
    return NextResponse.json({
      status: 400,
      message: "Bad request: missing event or revalidationData",
    });
  }

  try {
    let revalidated = false;
    let message = "No action taken";
    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];

    if (revalidationData.path) {
      console.log(`📄 [REVALIDATE-FRONTEND] Revalidating path: ${revalidationData.path}`);
      revalidatePath(revalidationData.path);
      revalidated = true;
      revalidatedPaths.push(revalidationData.path);
      message = `Revalidated path: ${revalidationData.path}`;
    }

    if (revalidationData.tag) {
      const tag = revalidationData.tag;
      console.log(`🏷️ [REVALIDATE-FRONTEND] Processing tag: ${tag}`);

      // Always revalidate the base tag so server-side caches are cleared
      revalidateTag(tag);
      revalidatedTags.push(tag);

      // If we can read a cacheId from cookies, also revalidate the user/session-specific tag
      try {
        const cookieStore = await cookies();
        const cacheId = cookieStore.get("_medusa_cache_id")?.value;
        console.log(`🍪 [REVALIDATE-FRONTEND] Cache ID from cookies: ${cacheId || 'NOT_FOUND'}`);
        if (cacheId) {
          const cacheTag = `${tag}-${cacheId}`;
          console.log(`🔄 [REVALIDATE-FRONTEND] Also revalidating cache tag: ${cacheTag}`);
          revalidateTag(cacheTag);
          revalidatedTags.push(cacheTag);
        }
      } catch (error: any) {
        console.warn(`⚠️ [REVALIDATE-FRONTEND] Failed to read cookies: ${error.message}`);
      }

      revalidated = true;
      message = revalidationData.path
        ? `${message} and tag: ${revalidationData.tag}`
        : `Revalidated tag: ${revalidationData.tag}`;
    }

    if (!revalidated) {
      console.log(`⏭️ [REVALIDATE-FRONTEND] No revalidation needed for event: ${event}`);
    } else {
      console.log(`✅ [REVALIDATE-FRONTEND] Revalidation completed successfully`);
      console.log(`📊 [REVALIDATE-FRONTEND] Summary:`, {
        event,
        revalidatedPaths,
        revalidatedTags,
        message,
      });
    }

    return NextResponse.json({
      status: 200,
      revalidated,
      now: Date.now(),
      message,
      details: {
        revalidatedPaths,
        revalidatedTags,
      },
    });
  } catch (error: any) {
    console.error(`❌ [REVALIDATE-FRONTEND] Error during revalidation:`, error.message);
    return NextResponse.json({
      status: 500,
      message: `Error revalidating: ${error.message}`,
    });
  }
}
