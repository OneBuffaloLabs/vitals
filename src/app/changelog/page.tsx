import { Metadata } from 'next';
// --- Utils ---
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Changelog',
  description: 'View the history of changes and new features for the Vitals SEO analysis tool.',
  urlPath: '/changelog',
});

export default function ChangelogPage() {
  return (
    <div className='w-full max-w-3xl text-left'>
      <h1 className='text-4xl font-bold text-vitals-primary mb-6'>Changelog</h1>
      <div className='space-y-8 text-muted-foreground'>
        <p>All notable changes to this project will be documented in this file.</p>

        {/* Version 1.2.0 Section */}
        <section>
          <h2 className='text-3xl font-semibold text-vitals-primary border-b pb-2 mb-4'>
            <span className='mr-2'>[1.2.0]</span> - 2025-08-18
          </h2>
          <div className='space-y-3'>
            <div>
              <h3 className='text-xl font-bold text-vitals-success'>Added</h3>
              <ul className='list-disc list-inside space-y-2 pl-4 mt-2'>
                <li>Official public launch of the Vitals SEO Analysis Tool!</li>
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-bold text-vitals-primary'>Changed</h3>
              <ul className='list-disc list-inside space-y-2 pl-4 mt-2'>
                <li>Performance optimizations for faster analysis and rendering.</li>
                <li>Minor UI tweaks and finishing touches for a more polished user experience.</li>
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-bold text-vitals-accent'>Fixed</h3>
              <ul className='list-disc list-inside space-y-2 pl-4 mt-2'>
                <li>Corrected minor styling inconsistencies on smaller devices.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Version 1.0.0 Section */}
        <section>
          <h2 className='text-3xl font-semibold text-vitals-primary border-b pb-2 mb-4'>
            <span className='mr-2'>[1.0.0]</span> - 2025-07-21
          </h2>
          <div className='space-y-3'>
            <div>
              <h3 className='text-xl font-bold text-vitals-success'>Added</h3>
              <ul className='list-disc list-inside space-y-2 pl-4 mt-2'>
                <li>Initial project setup with Next.js 15 and Tailwind CSS 4.</li>
                <li>Core UI including Header, Footer, and URL input form.</li>
                <li>Client-side analysis engine (`analyzeUrl`) to fetch and parse pages.</li>
                <li>
                  On-page analysis for `&lt;title&gt;`, `&lt;meta name=&quot;description&quot;&gt;`,
                  and `&lt;h1&gt;` tags.
                </li>
                <li>`ResultCard` component to display analysis with pass/warning/fail status.</li>
                <li>Loading and error states for the analysis process.</li>
                <li>File-based metadata for favicons (`.ico`, `.svg`, `apple-icon.png`).</li>
                <li>Advanced metadata for SEO and social sharing (Open Graph, Twitter Cards).</li>
                <li>Privacy Policy and Terms of Service pages.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
