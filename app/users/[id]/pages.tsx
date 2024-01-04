import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default async function profile( {params} : {params: {id: string} } ) {
      "use server"
const supabaseUrl = 'https://yozefwelvouqziianuxl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvemVmd2Vsdm91cXppaWFudXhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzg3MTIzMywiZXhwIjoyMDE5NDQ3MjMzfQ.8VKmWhYOt-8cNinMouVo_reeZmthMPhF25-raSFQJbY'

const supabase = createClient(supabaseUrl, supabaseKey);

const {data: user} = (await supabase.auth.admin.getUserById(params.id));
const { data, error } = await supabase.from('poems').select('*').eq('author', user.user?.email );
  return user ? (
    <div>
      <p>{user.user?.email}</p>
      <ul>
      {data?.map((poem) => (
        <li key={poem.id}><Link href={'/poems/'+poem.id}>{poem.title}</Link></li>
      ))}
      </ul>
    </div>
  ) : (<p>an error occured</p>)
}
