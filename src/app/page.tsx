'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { analyzeUrl } from '../lib/engine';
import { PageVitals } from '../lib/types';
import ResultCard from '@/components/ResultCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeaderAnalysisCard from '@/components/HeaderAnalysisCard';
import ImageAnalysisCard from '@/components/ImageAnalysisCard';
import FileCheckCard from '@/components/FileCheckCard';
import Tabs from '@/components/Tabs';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PageVitals | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL to analyze.');
      return;
    }

    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      // Basic URL validation/cleanup to ensure it has a protocol
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = `https://${formattedUrl}`;
      }

      const analysisResults = await analyzeUrl(formattedUrl);
      setResults(analysisResults);
    } catch (err) {
      console.error(err);
      setError(
        'Failed to analyze the URL. Please check the URL and try again. The server may be blocking requests.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = results
    ? [
        {
          label: 'On-Page',
          content: (
            <div className='space-y-4'>
              <ResultCard result={results.title} />
              <ResultCard result={results.description} />
              <ResultCard result={results.h1s} />
              {results.headers.map((headerInfo) => (
                <HeaderAnalysisCard key={headerInfo.level} headerInfo={headerInfo} />
              ))}
              {results.images.totalImages > 0 && <ImageAnalysisCard result={results.images} />}
            </div>
          ),
        },
        {
          label: 'Technical',
          content: (
            <div className='space-y-4'>
              <FileCheckCard result={results.robotsTxt} />
              <FileCheckCard result={results.sitemapXml} />
            </div>
          ),
        },
        {
          label: 'Speed',
          content: <p>Speed analysis coming soon!</p>,
        },
      ]
    : [];

  return (
    <div className='w-full max-w-4xl text-center transition-all duration-300'>
      <div className='w-full max-w-2xl mx-auto'>
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
            disabled={isLoading}
          />
          <button
            type='submit'
            className='btn btn-accent w-full sm:w-auto px-6 py-3 text-lg flex items-center justify-center gap-2 whitespace-nowrap'
            disabled={isLoading}>
            <FontAwesomeIcon icon={faSearch} className='h-5 w-5' />
            <span>{isLoading ? 'Analyzing...' : 'Analyze'}</span>
          </button>
        </form>
      </div>

      <div className='mt-12 text-left'>
        {isLoading && <LoadingSpinner />}
        {error && (
          <div className='p-4 rounded-lg border bg-vitals-error/10 text-vitals-error'>
            <p className='font-bold'>Analysis Error</p>
            <p>{error}</p>
          </div>
        )}
        {results && <Tabs tabs={tabs} />}
      </div>
    </div>
  );
}
