import { ThemeToggle } from '@/components/theme-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background p-4'>
      {/* Header section with Theme Toggle */}
      <header className='absolute top-4 right-4'>
        <ThemeToggle />
      </header>

      <main className='flex flex-col items-center text-center gap-8'>
        {/* Main Heading */}
        <h1 className='text-5xl font-bold text-foreground'>Vitals</h1>
        <p className='text-lg text-muted-foreground max-w-md'>
          Welcome to the Buffalo Blueprint. Use the toggle in the corner to switch between light and
          dark modes.
        </p>

        {/* Example Buttons */}
        <div className='flex gap-4 mt-4'>
          <button className='bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-semibold transition-colors'>
            Primary Button
          </button>
          <button className='bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-md font-semibold transition-colors flex items-center gap-2'>
            <FontAwesomeIcon icon={faRocket} className='h-4 w-4' />
            Accent Button
          </button>
        </div>

        {/* Example Cards */}
        <div className='grid md:grid-cols-3 gap-4 mt-8 text-left w-full max-w-4xl'>
          <div className='bg-card text-card-foreground p-6 rounded-lg border'>
            <h3 className='font-bold text-brand-success mb-2'>Success</h3>
            <p className='text-sm text-muted-foreground'>
              This card uses the &apos;Success&apos; color from the brand palette.
            </p>
          </div>
          <div className='bg-card text-card-foreground p-6 rounded-lg border'>
            <h3 className='font-bold text-brand-warning mb-2'>Warning</h3>
            <p className='text-sm text-muted-foreground'>
              This card uses the &apos;Warning&apos; color.
            </p>
          </div>
          <div className='bg-card text-card-foreground p-6 rounded-lg border'>
            <h3 className='font-bold text-brand-error mb-2'>Error</h3>
            <p className='text-sm text-muted-foreground'>
              This card uses the &apos;Error&apos; color.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
