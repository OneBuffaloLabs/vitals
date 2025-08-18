import { useState } from 'react';
import { ImageAnalysisResult } from '@/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

const statusConfig = {
  pass: {
    icon: faCheckCircle,
    color: 'text-vitals-success',
    bgColor: 'bg-vitals-success/10',
    progressColor: 'bg-vitals-success',
  },
  warning: {
    icon: faExclamationCircle,
    color: 'text-vitals-warning',
    bgColor: 'bg-vitals-warning/10',
    progressColor: 'bg-vitals-warning',
  },
  fail: {
    icon: faTimesCircle,
    color: 'text-vitals-error',
    bgColor: 'bg-vitals-error/10',
    progressColor: 'bg-vitals-error',
  },
  info: {
    // Fallback, not used in this component
    icon: faCheckCircle,
    color: 'text-vitals-primary',
    bgColor: 'bg-vitals-primary/10',
    progressColor: 'bg-vitals-primary',
  },
};

const ImageAnalysisCard = ({ result }: { result: ImageAnalysisResult }) => {
  const [isOpen, setIsOpen] = useState(false);
  const config = statusConfig[result.status];

  return (
    <div className={`p-4 rounded-lg border ${config.bgColor}`}>
      <div className='flex items-center justify-between'>
        <h3 className='font-bold text-lg text-vitals-primary'>{result.title}</h3>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-mono text-muted-foreground'>
            {result.altTextCount} / {result.totalImages}
          </span>
          <FontAwesomeIcon icon={config.icon} className={`${config.color} h-5 w-5`} />
        </div>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-2.5 mt-2'>
        <div
          className={`${config.progressColor} h-2.5 rounded-full`}
          style={{ width: `${result.altTextPercentage}%` }}></div>
      </div>
      <p className={`mt-2 text-sm ${config.color}`}>{result.recommendation}</p>
      {result.missingAltTextImages.length > 0 && (
        <div className='mt-3'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-sm font-semibold text-vitals-accent cursor-pointer'>
            {isOpen ? 'Hide' : 'Show'} Missing ({result.missingAltTextImages.length})
            <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className='ml-2 h-4 w-4' />
          </button>
          {isOpen && (
            <ul className='mt-2 space-y-2'>
              {result.missingAltTextImages.map((src, index) => (
                <li
                  key={index}
                  className='p-2 bg-white rounded text-left text-xs font-mono text-vitals-primary break-all'>
                  {src}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageAnalysisCard;
