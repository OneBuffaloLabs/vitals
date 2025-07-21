import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full p-4 sm:p-6'>
      <div className='text-center text-sm text-muted-foreground'>
        <span>© {currentYear} One Buffalo Labs</span>
        <span className='mx-2'>|</span>
        <a
          href='https://github.com/OneBuffaloLabs/vitals'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-1 hover:text-vitals-accent'>
          <FontAwesomeIcon icon={faGithub} className='h-4 w-4' />
          <span>View on GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
