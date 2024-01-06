'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import PoemForm from "./poemform";

export default function page() {
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      // Check if the user is logged in
      if (!user) {
        router.push('/login'); // Redirect to the login page if not logged in
      }
    };

    fetchUser();
  }, [router, supabase.auth]);

  return (
    <div>
        <h1>Write poem</h1>
        <PoemForm/>
    </div>
  )
}
