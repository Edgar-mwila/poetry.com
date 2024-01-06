import { createClient } from "@/utils/supabase/client"

export default async function page({ params }: { params: { id: number } }) {
  const supabase = createClient();
  const { data: poem, error} = await supabase.from('poems').select('*').eq('id', params.id);
   if(poem){
  return (
    <div>
      <h1 className="text-2xl text-underline">{poem[0].title}</h1>
      <p>By {poem[0].author}</p>
      <br/>
      <p>{poem[0].content}</p>
      <hr/>
      <p className="text-1xl text-gray">Posted at {poem[0].created_at}</p>
    </div>
  )}
 return <h1>an error occured: {error.message}</h1>

}