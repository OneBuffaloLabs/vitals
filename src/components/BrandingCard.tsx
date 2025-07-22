import { BrandingResult, IconResult } from '@/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

const IconCheck = ({ icon, label }: { icon: IconResult | null; label: string }) => {
  const getStatusIcon = (status: IconResult['status']) => {
    switch (status) {
      case 'pass':
        return <FontAwesomeIcon icon={faCheckCircle} className='text-vitals-success' />;
      case 'fail':
        return <FontAwesomeIcon icon={faTimesCircle} className='text-vitals-error' />;
      case 'cors-error':
        return <FontAwesomeIcon icon={faExclamationTriangle} className='text-vitals-warning' />;
    }
  };

  const isSquare = icon?.dimensions && icon.dimensions.width === icon.dimensions.height;

  return (
    <div className='flex items-center justify-between py-2 border-b'>
      <p className='text-sm text-muted-foreground'>{label}</p>
      {icon ? (
        <div className='flex items-center gap-2'>
          <span className='text-xs font-mono'>{icon.href}</span>
          {icon.dimensions && (
            <span
              className={`text-xs font-mono ${
                isSquare ? 'text-vitals-success' : 'text-vitals-error'
              }`}>
              ({icon.dimensions.width}x{icon.dimensions.height})
            </span>
          )}
          {getStatusIcon(icon.status)}
        </div>
      ) : (
        <FontAwesomeIcon icon={faTimesCircle} className='text-vitals-error' />
      )}
    </div>
  );
};

const BrandingCard = ({ result }: { result: BrandingResult }) => {
  return (
    <div className='p-4 rounded-lg border bg-vitals-primary/5'>
      <h3 className='font-bold text-lg text-vitals-primary mb-4'>Branding & Icons</h3>
      <div className='space-y-2'>
        {result.favicons.map((favicon, index) => (
          <IconCheck key={index} icon={favicon} label={`Favicon (${favicon.type || 'N/A'})`} />
        ))}
        <IconCheck icon={result.appleTouchIcon} label='Apple Touch Icon' />
        <div className='flex items-center justify-between py-2 border-b'>
          <p className='text-sm text-muted-foreground'>Apple Web App Title</p>
          {result.appleMobileWebAppTitle ? (
            <div className='flex items-center gap-2'>
              <span className='text-xs font-mono'>{result.appleMobileWebAppTitle}</span>
              <FontAwesomeIcon icon={faCheckCircle} className='text-vitals-success' />
            </div>
          ) : (
            <FontAwesomeIcon icon={faTimesCircle} className='text-vitals-error' />
          )}
        </div>
        <div className='flex items-center justify-between py-2'>
          <p className='text-sm text-muted-foreground'>Web App Manifest</p>
          <FontAwesomeIcon
            icon={result.manifest.found ? faCheckCircle : faTimesCircle}
            className={result.manifest.found ? 'text-vitals-success' : 'text-vitals-error'}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandingCard;
