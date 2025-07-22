import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  return (
    <div className='w-full max-w-3xl text-center'>
      <h1 className='text-9xl font-bold text-vitals-accent'>404</h1>
      <h2 className='mt-4 text-4xl font-bold text-vitals-primary'>Page Not Found</h2>
      <p className='mt-4 text-lg text-muted-foreground'>
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link href='/' className='btn btn-primary mt-8 inline-flex items-center gap-2 no-underline'>
        <FontAwesomeIcon icon={faHome} className='h-5 w-5' />
        <span>Go back home</span>
      </Link>
    </div>
  );
}
