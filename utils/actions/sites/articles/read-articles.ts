"use server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const readAllArticles = async () => {


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
    // const { data, error } = await supabase
    //   .from("blog")
    //   .select("*, category(*), author(*)")
    //   .eq("user_id", userId)

    // if (error?.code) return error;

    return;
  } catch (error: any) {
    return error;
  }
};
