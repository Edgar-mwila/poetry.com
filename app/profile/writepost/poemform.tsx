"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@/utils/supabase/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const PoemForm = () => {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setloading] = useState(false);

   const Post = z.object({
    title: z.string().min(2).max(50),
    content: z.string().min(20),
    author: z.string().min(2).max(70),
    tags: z.array(z.string()).nonempty()
  });

  type Poem = z.infer<typeof Post>;

const { register, handleSubmit, watch, getValues, setValue, formState: { errors } } = useForm<Poem>({ resolver: zodResolver(Post) });

  useEffect(() => {
    const getUser = async () => {
      const {data: {user}} = await supabase.auth.getUser();
      if(user) {setValue('author', user?.email ?? ''); console.log('Setting author value:', watch('author'));}
      else alert("an authentication error ocured");
    }
    getUser();
  }, [watch])

 
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentTags = getValues('tags') || [];
    // Update the tags array based on the checkbox change
  const updatedTags: [string, ...string[]] = checked
    ? [...currentTags, value]
    : currentTags.filter((tag) => tag !== value) as [string, ...string[]];

  // Set the updated tags value using react-hook-form's setValue function
  setValue('tags', updatedTags);
  console.log(errors)
  };
  
  const submit = async (data: Poem) => {
    try {
      setloading(true);

    console.log('submitting data', data)
    await supabase.from('poems').insert({ title: data.title, author: data.author, content: data.content, tags: data.tags });
    console.log('Form submitted successfully');
    router.push('/profile');
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    setloading(false);
  }
  }

  return (
      <form onSubmit={handleSubmit(submit)} className='flex-1 flex h-full max-h-80 flex-col gap-4 items-center justify-center'>
      <label>
        Title:
        <input
          className='text-black'
          type="text"
          {...register('title', {required: true})}
        />
      </label>{errors.title && <span>This field is required</span>}

        <textarea
          className='h-full min-h-64 max-h-full text-black'
          placeholder='Your Poetry'
          {...register('content', {required: true})}
        />
        {errors.content && <span>This field is required</span>}
  
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
    </div>{errors.tags && <span>Must have atlease one tag</span>}
      <button type="submit" disabled={loading} className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>Add Poem</button>    
    </form>
  );
}

export default PoemForm;
