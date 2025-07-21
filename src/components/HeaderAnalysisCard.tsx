import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { HeaderInfo } from '@/lib/types';

const HeaderAnalysisCard = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='p-4 rounded-lg border bg-vitals-primary/5'>
      <div
        className='flex items-center justify-between cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}>
        <h3 className='font-bold text-lg text-vitals-primary'>H{headerInfo.level} Tags</h3>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-mono text-muted-foreground'>Count: {headerInfo.count}</span>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className='h-5 w-5 text-vitals-primary'
          />
        </div>
      </div>
      {isOpen && (
        <ul className='mt-3 space-y-2'>
          {headerInfo.text.map((text, index) => (
            <li
              key={index}
              className='p-2 bg-white rounded text-left text-sm font-mono text-vitals-primary break-words'>
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeaderAnalysisCard;
