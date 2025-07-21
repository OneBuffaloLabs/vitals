import Image from 'next/image';

const Header = () => {
  return (
    <header className='absolute top-0 left-0 w-full p-4 sm:p-6'>
      <div className='flex items-center gap-3'>
        <Image
          src='/icons/heart.svg'
          alt='Vitals Logo'
          width={32}
          height={32}
          className='text-vitals-accent'
        />
        <span className='text-2xl font-bold text-vitals-primary'>Vitals</span>
      </div>
    </header>
  );
};

export default Header;
