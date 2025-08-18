import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Footer = () => {
  const startYear = 2025;
  const currentYear = new Date().getFullYear();
  const copyrightDate = startYear === currentYear ? startYear : `${startYear} - ${currentYear}`;

  return (
    <footer className='w-full p-4 sm:p-6 border-t border-gray-200'>
      <div className='flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto text-sm text-muted-foreground'>
        {/* Copyright Info */}
        <div className='mb-4 sm:mb-0'>
          <span>
            © {copyrightDate}{' '}
            <a
              href='https://onebuffalolabs.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-vitals-accent transition-colors'>
              One Buffalo Labs
            </a>
          </span>
        </div>

        {/* Navigation Links */}
        <div className='flex items-center gap-4'>
          <Link href='/about' className='hover:text-vitals-accent transition-colors'>
            About
          </Link>
          <Link href='/privacy' className='hover:text-vitals-accent transition-colors'>
            Privacy
          </Link>
          {/* Placeholder for Terms page */}
          <Link href='/terms' className='hover:text-vitals-accent transition-colors'>
            Terms
          </Link>
          {/* Placeholder for Changelog page */}
          <Link href='/changelog' className='hover:text-vitals-accent transition-colors'>
            Changelog
          </Link>
          <a
            href='https://github.com/OneBuffaloLabs/vitals'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 hover:text-vitals-accent transition-colors'
            aria-label='View on GitHub'>
            <FontAwesomeIcon icon={faGithub} className='h-4 w-4' />
            <span className='hidden sm:inline'>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
