"use server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const shareArticle = async (
  slug: string,
  shareable: boolean
) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from("blog")
      .update([
        {
          shareable,
        },
      ])
      .eq("user_id", userId)
      .eq("slug", slug)
      .select();

    if (error?.code) return error;
    console.log("err", error);
    console.log("data", data);

    revalidatePath("/cms");

    return data;
  } catch (error: any) {
    return error;
  }
};
