import { BrandingResult, IconResult } from '@/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

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
    <div className='flex items-center justify-between py-2'>
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

const ManifestDetail = ({ label, value }: { label: string; value: string | undefined }) => (
  <div className='flex items-center justify-between py-1'>
    <p className='text-xs text-muted-foreground'>{label}</p>
    {value ? (
      <div className='flex items-center gap-2'>
        <span className='text-xs font-mono'>{value}</span>
        <FontAwesomeIcon icon={faCheckCircle} className='text-vitals-success' />
      </div>
    ) : (
      <FontAwesomeIcon icon={faTimesCircle} className='text-vitals-error' />
    )}
  </div>
);

const CollapsibleSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='py-2 border-b'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between text-left'>
        <h4 className='font-semibold text-vitals-primary'>{title}</h4>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className='h-4 w-4 text-muted-foreground'
        />
      </button>
      {isOpen && <div className='mt-2 pl-4'>{children}</div>}
    </div>
  );
};

const BrandingCard = ({ result }: { result: BrandingResult }) => {
  return (
    <div className='p-4 rounded-lg border bg-vitals-primary/5'>
      <h3 className='font-bold text-lg text-vitals-primary mb-4'>Branding & Icons</h3>
      <div className='space-y-2'>
        <CollapsibleSection title='Favicons'>
          {result.favicons.map((favicon, index) => (
            <IconCheck key={index} icon={favicon} label={`Favicon (${favicon.type || 'N/A'})`} />
          ))}
        </CollapsibleSection>

        <CollapsibleSection title='Apple'>
          <IconCheck icon={result.appleTouchIcon} label='Apple Touch Icon' />
          <div className='flex items-center justify-between py-2'>
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
        </CollapsibleSection>

        <CollapsibleSection title='Web App Manifest'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-muted-foreground'>Manifest File</p>
            <FontAwesomeIcon
              icon={result.manifest.found ? faCheckCircle : faTimesCircle}
              className={result.manifest.found ? 'text-vitals-success' : 'text-vitals-error'}
            />
          </div>
          {result.manifest.found && result.manifest.content && (
            <div className='pl-4 mt-2'>
              <ManifestDetail label='Name' value={result.manifest.content.name} />
              <ManifestDetail label='Short Name' value={result.manifest.content.short_name} />
              <ManifestDetail label='Theme Color' value={result.manifest.content.theme_color} />
              <ManifestDetail
                label='Background Color'
                value={result.manifest.content.background_color}
              />
              <div className='flex items-center justify-between py-1'>
                <p className='text-xs text-muted-foreground'>Required Icons (192x192, 512x512)</p>
                <FontAwesomeIcon
                  icon={result.manifest.hasRequiredIcons ? faCheckCircle : faTimesCircle}
                  className={
                    result.manifest.hasRequiredIcons ? 'text-vitals-success' : 'text-vitals-error'
                  }
                />
              </div>
            </div>
          )}
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default BrandingCard;
