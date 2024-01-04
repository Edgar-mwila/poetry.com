'use client'
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Poem } from '@/app/poems/fetchpoems';
import { User } from '@supabase/supabase-js';

 const AddPoemForm = () => {
  const supabase = createClient();
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>();
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [poems, setPoems] = useState<Poem[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  
  useEffect(() => {
    // Fetch data from Supabase
    const fetchPoems = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: poems, error } = await supabase.from('poems').select('*');
      if (poems) setPoems(poems); 
      else console.error('Error fetching poems:', error); 
      if(user) setCurrentUser(user); setAuthor(user?.email);
    };

    fetchPoems();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.from('poems').insert([
      { title, author, content, tags},
    ]);

    if (data) {
      setPoems([...poems, data[0]]);
      alert('Poem submitted successfully');
      e.currentTarget.reset();
    } else {console.log('Error adding poem:', error); } 
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setTags((prevTags) => [...prevTags, value]);
    } else {
      setTags((prevTags) => prevTags.filter((tag) => tag !== value));
    }
  };


  return (
    <form onSubmit={handleSubmit} className='flex-1 flex h-full max-h-80 flex-col gap-4 items-center justify-center'>
      <label>
        Title:
        <input
          className='text-black'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

        <textarea
          className='h-full min-h-64 max-h-full text-black'
          value={content}
          placeholder='Your Poetry'
          onChange={(e) => setContent(e.target.value)}
        />
  
     <p>select tags:</p>
    <div className="flex flex-row gap-4 items-center">
    <label>Sad
      <input 
        type="checkbox"
        id="Sad" 
        name="Sad" 
        value="Sad"
        onChange={handleCheckboxChange}
      />
    </label>
    <p>|</p>
    <label>Happy
      <input 
        type="checkbox" 
        id="Happy" 
        name="Happy" 
        value="Happy"
        onChange={handleCheckboxChange}
      />
    </label>
    <p>|</p>
    <label>Nature
      <input 
        type="checkbox"
        id="Nature" 
        name="Nature" 
        value="Nature"
        onChange={handleCheckboxChange}
      />
    </label>
    <p>|</p>
    <label>Life
      <input 
        type="checkbox"
        id="Life" 
        name="Life" 
        value="Life"
        onChange={handleCheckboxChange}
      />
    </label>
    <p>|</p>
    <label>Nature
      <input 
        type="checkbox"
        id="Death" 
        name="Death" 
        value="Death"
        onChange={handleCheckboxChange}
      />
    </label>
    <p>|</p>
    <label>Other
      <input 
        type="checkbox"
        id="Other" 
        name="Other" 
        value="Other"
        onChange={handleCheckboxChange}
      />
    </label>
    </div>
      <button type="submit" className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>Add Poem</button>
    </form>
  );
};

export default AddPoemForm;