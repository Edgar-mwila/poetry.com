import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export default async function () {
  "use server"
const supabaseUrl = 'https://yozefwelvouqziianuxl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvemVmd2Vsdm91cXppaWFudXhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzg3MTIzMywiZXhwIjoyMDE5NDQ3MjMzfQ.8VKmWhYOt-8cNinMouVo_reeZmthMPhF25-raSFQJbY'

const supabase = createClient(supabaseUrl, supabaseKey);
        const {data: user, error} = (await supabase.auth.admin.listUsers());
        
 return user ? (
    <div>
      <h1>Our esteemed users are: </h1>
      <ul>
       {user.users.map((user) => {
            return <li key={user.id}>{user.email}</li>
       })} 
      </ul>
    </div>
  ) : (<p>An error occured</p>)

  }
