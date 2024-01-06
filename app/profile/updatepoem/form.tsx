"use client"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@/utils/supabase/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const UpdatePoemForm = ({ poemId }: { poemId: number }) => {
  const supabase = createClient();
  const router= useRouter();

  // Define the validation schema
  const Post = z.object({
    title: z.string().min(2).max(50),
    content: z.string().min(20),
  });

  type Poem = z.infer<typeof Post>;

  // Initialize form state
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Poem>({ resolver: zodResolver(Post) });
  const [loading, setLoading] = useState(false);

  // Fetch existing poem data and set initial form values
  useEffect(() => {
    const fetchPoemData = async () => {
      try {
         if (!poemId) {
        console.error('Poem ID is undefined');
        return;
      }
        const { data, error } = await supabase.from('poems').select('*').eq('id', poemId).single();
        if (error) {
          console.error('Error fetching poem data:', error.message);
          // Handle error
          return;
        }

        // Set initial form values
        setValue('title', data.title);
        setValue('content', data.content);
      } catch (error) {
        console.error('Error setting initial form values:');
      }
    };

    fetchPoemData();
  }, [poemId, setValue]);

  // Handle form submission
  const submit = async (data: Poem) => {
    try {
      setLoading(true);

      // Perform update in the database
      await supabase.from('poems').update({ title: data.title, content: data.content}).eq('id', poemId);

      console.log('Poem updated successfully!');
      window.location.reload();
      // Handle success, e.g., redirect to profile or display a success message
    } catch (error) {
      console.error('Error updating poem:');
      // Handle error, e.g., display an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className='flex-1 flex h-full max-h-80 flex-col gap-4 items-center justify-center'>
      {/* Form inputs go here */}
      <label>
        Title:
        <input
          className='text-black'
          type="text"
          {...register('title', { required: true })}
        />
      </label>
      {errors.title && <span>This field is required</span>}

      <label>
        Content:
        <textarea
          className='text-black'
          placeholder="Your Poetry"
          {...register('content', { required: true })}
        />
      </label>
      {errors.content && <span>This field is required</span>}

      <button type="submit" disabled={loading} className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>Update Poem</button>
    </form>
  );
};

export default UpdatePoemForm;
