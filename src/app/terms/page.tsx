import { Metadata } from 'next';
import Link from 'next/link';
// --- Utils ---
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Terms of Service',
  description: 'Read the Terms of Service for using the Vitals SEO analysis tool.',
  urlPath: '/terms',
});

export default function TermsOfServicePage() {
  return (
    <div className='w-full max-w-3xl text-left'>
      <h1 className='text-4xl font-bold text-vitals-primary mb-6'>Terms of Service</h1>
      <div className='space-y-6 text-muted-foreground'>
        <p>
          <strong>Last Updated:</strong> July 21, 2025
        </p>
        <p>
          Please read these Terms of Service (&quot;Terms&quot;) carefully before using the Vitals
          application (the &quot;Service&quot;) operated by One Buffalo Labs (&quot;us,&quot;
          &quot;we,&quot; or &quot;our&quot;). Your access to and use of the Service is conditioned
          on your acceptance of and compliance with these Terms.
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>1. Agreement to Terms</h2>
        <p>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree
          with any part of the terms, then you may not access the Service.
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>2. Disclaimer of Warranty</h2>
        <p>
          The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The
          Service is provided without warranties of any kind, whether express or implied, including,
          but not limited to, implied warranties of merchantability, fitness for a particular
          purpose, or non-infringement. The analysis and data provided by the Service are for
          informational purposes only, and we do not guarantee their accuracy, completeness, or
          timeliness.
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>3. Limitation of Liability</h2>
        <p>
          In no event shall One Buffalo Labs, nor its directors, employees, partners, agents,
          suppliers, or affiliates, be liable for any indirect, incidental, special, consequential,
          or punitive damages, including without limitation, loss of profits, data, use, goodwill,
          or other intangible losses, resulting from your access to or use of or inability to access
          or use the Service. Any business decisions made based on the data from the Service are at
          your own risk.
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>
          4. Intellectual Property and Licensing
        </h2>
        <p>
          The Vitals application is an open-source project. The source code is licensed under the{' '}
          <a
            href='http://creativecommons.org/licenses/by-nc-sa/4.0/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-vitals-accent hover:underline'>
            Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC
            BY-NC-SA 4.0)
          </a>
          . You are free to share and adapt the material under the terms of that license.
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>5. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the State of
          New York, United States, without regard to its conflict of law provisions.
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>6. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please feel free to open an issue on our{' '}
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
