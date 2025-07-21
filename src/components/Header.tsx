import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='absolute top-0 left-0 w-full p-4 sm:p-6'>
      <Link href='/' className='inline-flex items-center gap-3 group no-underline'>
        <Image
          src='/icons/heart.svg'
          alt='Vitals Logo'
          width={50}
          height={50}
          className='text-vitals-accent group-hover:scale-110 transition-transform'
        />
        <span className='text-3xl font-bold text-vitals-primary uppercase'>Vitals</span>
      </Link>
    </header>
  );
};

export default Header;
