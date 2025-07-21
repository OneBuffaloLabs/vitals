'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      // In a real app, you might show a more elegant toast or message.
      alert('Please enter a URL to analyze.');
      return;
    }
    console.log(`Analyzing URL: ${url}`);
    // Future analysis logic will be triggered here.
  };

  return (
    <div className='w-full max-w-2xl text-center'>
      <h1 className='text-4xl sm:text-5xl font-bold text-vitals-primary'>
        Check your website&apos;s core SEO vitals.
      </h1>
      <p className='mt-4 text-lg text-muted-foreground'>
        A fast, modern, and client-side analysis tool.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-8 flex flex-col sm:flex-row items-center gap-4 w-full'>
        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Enter a URL to analyze...'
          className='w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:border-vitals-accent transition-colors'
        />
        <button
          type='submit'
          className='btn btn-accent w-full sm:w-auto px-6 py-3 text-lg flex items-center justify-center gap-2 whitespace-nowrap'>
          <FontAwesomeIcon icon={faSearch} className='h-5 w-5' />
          <span>Analyze</span>
        </button>
      </form>
    </div>
  );
}
