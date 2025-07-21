import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faTimesCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AnalysisResult } from '@/lib/types';

// Configuration for styling based on the result status
const statusConfig = {
  pass: {
    icon: faCheckCircle,
    color: 'text-vitals-success',
    bgColor: 'bg-vitals-success/10',
  },
  warning: {
    icon: faExclamationCircle,
    color: 'text-vitals-warning',
    bgColor: 'bg-vitals-warning/10',
  },
  fail: {
    icon: faTimesCircle,
    color: 'text-vitals-error',
    bgColor: 'bg-vitals-error/10',
  },
  info: {
    icon: faInfoCircle,
    color: 'text-vitals-primary',
    bgColor: 'bg-vitals-primary/10',
  },
};

const ResultCard = ({ result }: { result: AnalysisResult }) => {
  const config = statusConfig[result.status];

  return (
    <div className={`p-4 rounded-lg border ${config.bgColor}`}>
      <div className='flex items-center justify-between'>
        <h3 className='font-bold text-lg text-vitals-primary'>{result.title}</h3>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-mono text-muted-foreground'>
            {result.title.startsWith('H1') ? `Count: ${result.length}` : `Length: ${result.length}`}
          </span>
          <FontAwesomeIcon icon={config.icon} className={`${config.color} h-5 w-5`} />
        </div>
      </div>
      {result.text && (
        <p className='mt-2 p-3 bg-white rounded text-left text-sm font-mono text-vitals-primary break-words'>
          {result.text}
        </p>
      )}
      <p className={`mt-2 text-sm ${config.color}`}>{result.recommendation}</p>
    </div>
  );
};

export default ResultCard;
