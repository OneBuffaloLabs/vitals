import { Metadata } from 'next';
import Link from 'next/link';
// --- Utils ---
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'Learn about how Vitals handles your data and respects your privacy.',
  urlPath: '/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className='w-full max-w-3xl text-left'>
      <h1 className='text-4xl font-bold text-vitals-primary mb-6'>Privacy Policy</h1>
      <div className='space-y-6 text-muted-foreground'>
        <p>
          <strong>Last Updated:</strong> July 21, 2025
        </p>
        <p>
          Welcome to Vitals by One Buffalo Labs (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;). We are committed to protecting your privacy. This Privacy Policy
          explains how we handle information when you use our client-side SEO analysis tool (the
          &quot;Service&quot;).
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>1. Data We Do Not Collect</h2>
        <p>
          Vitals is a client-side application, which means all analysis happens directly in your web
          browser. We want to be crystal clear:
        </p>
        <ul className='list-disc list-inside space-y-2 pl-4'>
          <li>We **do not** collect, store, or track the URLs you analyze.</li>
          <li>We **do not** save or log the results of any SEO analysis you perform.</li>
          <li>
            We **do not** require you to create an account or provide any personal information to
            use the Service.
          </li>
        </ul>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>
          2. Third-Party Services (CORS Proxy)
        </h2>
        <p>
          To fetch and analyze the content of the URLs you provide, Vitals uses a public,
          third-party CORS (Cross-Origin Resource Sharing) proxy service:{' '}
          <a
            href='https://allorigins.win/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-vitals-accent hover:underline'>
            allorigins.win
          </a>
          .
        </p>
        <p>
          When you submit a URL for analysis, that URL is sent to the proxy service to retrieve the
          website&apos;s HTML content. This is a necessary step to bypass browser security
          restrictions that would otherwise prevent the tool from working. We do not control this
          third-party service, and its use of your submitted URL is governed by its own privacy
          policy.
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>
          3. Cookies and Tracking Technologies
        </h2>
        <p>
          Our Service does not use cookies or any other tracking technologies for analytics,
          advertising, or user identification.
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>
          4. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page. You are advised to review this Privacy Policy
          periodically for any changes.
        </p>

        <h2 className='text-2xl font-bold text-vitals-primary pt-4'>5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please feel free to open an issue on
          our{' '}
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
