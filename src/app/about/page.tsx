import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'About Us',
  description: 'Learn about Vitals, a privacy-first SEO analysis tool by One Buffalo Labs.',
  urlPath: '/about',
});

export default function AboutPage() {
  return (
    <div className='w-full max-w-3xl text-left'>
      <h1 className='text-4xl font-bold text-vitals-primary mb-6'>About Vitals</h1>
      <div className='space-y-6 text-muted-foreground'>
        <p className='text-lg'>
          Vitals is a fast, modern, and client-side SEO analysis tool from{' '}
          <Link href='https://onebuffalolabs.com' className='text-vitals-accent hover:underline'>
            One Buffalo Labs
          </Link>
          . We built it with a simple but powerful idea: what if you could get a comprehensive SEO
          audit without sending your data to a server?
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>Our Privacy-First Approach</h2>
        <p>
          The "client-side" aspect is what makes Vitals special. It means that when you enter a URL,
          all analysis happens directly in your browser. We do not collect, store, or track the URLs
          you analyze, and we do not save the results. This approach offers two huge benefits:
        </p>
        <ul className='list-disc list-inside space-y-2 pl-4'>
          <li>
            <strong>Privacy</strong>: Your data is yours and yours alone.
          </li>
          <li>
            <strong>Speed</strong>: By cutting out the back-and-forth with a server, the analysis is
            incredibly fast.
          </li>
        </ul>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>Our Tech Stack</h2>
        <p>For those interested in the technical details, Vitals is built with:</p>
        <ul className='list-disc list-inside space-y-2 pl-4'>
          <li>
            <strong>Framework</strong>: Next.js 15 (App Router)
          </li>
          <li>
            <strong>Language</strong>: TypeScript
          </li>
          <li>
            <strong>Styling</strong>: Tailwind CSS
          </li>
          <li>
            <strong>Parsing</strong>: Cheerio
          </li>
        </ul>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>Get Involved</h2>
        <p>
          Vitals is an open-source project, and we welcome contributions! If you have an idea or
          want to help us build the future of private, effective SEO tooling, check out our{' '}
          <Link
            href='https://github.com/OneBuffaloLabs/vitals'
            className='text-vitals-accent hover:underline'>
            GitHub repository
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
