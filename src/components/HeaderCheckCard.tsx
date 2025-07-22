import { HeaderAnalysisResult } from '@/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const HeaderCheck = ({
  label,
  value,
  recommendation,
}: {
  label: string;
  value: string | null;
  recommendation: string;
}) => (
  <div className='py-2 border-b'>
    <div className='flex items-center justify-between'>
      <p className='text-sm text-muted-foreground'>{label}</p>
      {value ? (
        <div className='flex items-center gap-2'>
          <span className='text-xs font-mono truncate' title={value}>
            {value}
          </span>
          <FontAwesomeIcon icon={faCheckCircle} className='text-vitals-success' />
        </div>
      ) : (
        <FontAwesomeIcon icon={faTimesCircle} className='text-vitals-error' />
      )}
    </div>
    {!value && <p className='mt-1 text-xs text-vitals-error'>{recommendation}</p>}
  </div>
);

const HeaderCheckCard = ({ result }: { result: HeaderAnalysisResult }) => {
  return (
    <div className='p-4 rounded-lg border bg-vitals-primary/5'>
      <h3 className='font-bold text-lg text-vitals-primary mb-4'>HTTP Headers</h3>
      <div className='space-y-2'>
        <HeaderCheck
          label='Content Encoding'
          value={result.contentEncoding}
          recommendation='Using compression like gzip or brotli is recommended for faster page loads.'
        />
        <HeaderCheck
          label='Content Security Policy'
          value={result.contentSecurityPolicy}
          recommendation='A Content Security Policy is recommended to prevent cross-site scripting (XSS) attacks.'
        />
        <HeaderCheck
          label='Strict Transport Security'
          value={result.strictTransportSecurity}
          recommendation='HSTS is recommended to ensure all connections are made over HTTPS.'
        />
      </div>
    </div>
  );
};

export default HeaderCheckCard;
