// src/components/FileCheckCard.tsx
import { useState } from 'react';
import { FileCheckResult, SitemapInfo } from '@/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { prettyPrintXml } from '@/lib/formatter';

const SitemapContent = ({ sitemap }: { sitemap: SitemapInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mt-2'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-sm font-semibold text-vitals-accent flex items-center justify-between w-full'>
        <span>{sitemap.loc}</span>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className='h-4 w-4' />
      </button>
      {isOpen && (
        <pre className='mt-2 p-2 bg-white rounded text-left text-xs font-mono text-vitals-primary break-all whitespace-pre-wrap'>
          {sitemap.content ? prettyPrintXml(sitemap.content) : 'Could not fetch content.'}
        </pre>
      )}
    </div>
  );
};

const FileCheckCard = ({ result }: { result: FileCheckResult }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statusConfig = {
    pass: {
      icon: faCheckCircle,
      color: 'text-vitals-success',
      bgColor: 'bg-vitals-success/10',
    },
    fail: {
      icon: faTimesCircle,
      color: 'text-vitals-error',
      bgColor: 'bg-vitals-error/10',
    },
  };

  const config = result.found ? statusConfig.pass : statusConfig.fail;

  return (
    <div className={`p-4 rounded-lg border ${config.bgColor}`}>
      <div className='flex items-center justify-between'>
        <h3 className='font-bold text-lg text-vitals-primary'>{result.title}</h3>
        <div className='flex items-center gap-2'>
          <span className={`text-sm font-mono ${config.color}`}>
            {result.found ? 'Found' : 'Not Found'}
          </span>
          <FontAwesomeIcon icon={config.icon} className={`${config.color} h-5 w-5`} />
        </div>
      </div>

      {result.found && (result.content || (result.sitemaps && result.sitemaps.length > 0)) && (
        <div className='mt-3'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-sm font-semibold text-vitals-accent'>
            {isOpen ? 'Hide' : 'Show'} Content
            <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className='ml-2 h-4 w-4' />
          </button>
          {isOpen && (
            <div className='mt-2'>
              {result.sitemaps ? (
                result.sitemaps.map((sitemap) => (
                  <SitemapContent key={sitemap.loc} sitemap={sitemap} />
                ))
              ) : (
                <pre className='p-2 bg-white rounded text-left text-xs font-mono text-vitals-primary break-all whitespace-pre-wrap'>
                  {result.content ? prettyPrintXml(result.content) : ''}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileCheckCard;
