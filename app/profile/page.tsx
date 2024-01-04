'use client'
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { Poem } from "../poems/fetchpoems";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function Profile() {
    const supabase = createClient();
    const [poems, setPoems] = useState<Poem[]>([]);
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
     async function fetchPoems() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase.from('poems').select('*').eq('author', user?.email );
      if (data&&user) setPoems(data), setCurrentUser(user) 
      else console.log('error', error);
    }
      fetchPoems();
    }, [])


    return (
       <div>
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <h1 className="text-3xl">USER: {currentUser?.email}</h1><button onClick={async () => {
          await supabase.auth.signOut();
          return redirect('/login');
        }} className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Log Out</button>
        </div>
        <hr/>
          <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"><Link href={'/profile/writepost'}>Write Poem</Link></button>
      <h2>Poems</h2>
      <ul>
        {poems.map((poem) => (
          <li key={poem.id}><Link href={"/poems/"+poem.id} className="hover:text-blue-hover">{poem.title}</Link>
          <button onClick={async () => {
              await supabase.from('poems').delete().eq('id', ''+poem.id); revalidatePath('/profile', 'page')
          }} className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Delete</button></li>
        ))}
      </ul>
       </div> 
    )
}