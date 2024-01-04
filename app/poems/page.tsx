'use client'
import React, { Suspense, useEffect, useState } from 'react';
import Layout from '../layout';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { Poem } from './fetchpoems';

const Home: React.FC = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // Fetch data from Supabase
    const fetchPoems = async () => {
      const { data: poems } = await supabase.from('poems').select('*');
      if (poems) {
        
        setPoems(poems);
        console.log(poems);
      } 
      else {
        console.error('Error fetching poems:');
      }
    };

    fetchPoems();
  }, []);

  return (
   <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <h1 className='text-5xl text-cursive text-blod '>Welcome to POETRY.COM</h1>
      <div className="flex z-10 flex-col max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"> 
      <Suspense fallback = "loading...">
      {poems.map((poem) => (
          <Link
          key={poem.id}
          href={'/poems/' + poem.id}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
          >
          <p>{poem.title} </p><br/>By <p className='text-gray'>{poem.author}</p>
          </Link>
      ))}
      </Suspense>
    </div>
    </div>
  );
};

export default Home;
