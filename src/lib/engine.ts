/**
 * @file The core client-side SEO analysis engine for Vitals.
 */

import { load } from 'cheerio';
import {
  PageVitals,
  AnalysisResult,
  HeaderInfo,
  ImageAnalysisResult,
  FileCheckResult,
  BrandingResult,
  IconResult,
  ManifestResult,
} from './types';

// SEO Best Practices Thresholds
const TITLE_MIN_LENGTH = 10;
const TITLE_MAX_LENGTH = 60;
const DESCRIPTION_MIN_LENGTH = 50;
const DESCRIPTION_MAX_LENGTH = 160;

// List of CORS proxies to rotate through for better reliability
const PROXIES = ['https://api.allorigins.win/get?url=', 'https://proxy.cors.sh/'];

/**
 * Fetches and analyzes the on-page SEO vitals of a given URL.
 * @param url The URL to analyze.
 * @returns A promise that resolves to a PageVitals object.
 */
export async function analyzeUrl(url: string): Promise<PageVitals> {
  // Use the raw endpoint for the initial HTML fetch, as it's generally more reliable.
  const initialProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

  const response = await fetch(initialProxyUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch the URL. Status: ${response.status}`);
  }
  const html = await response.text();
  const $ = load(html);
  const baseUrl = new URL(url).origin;

  // 1. Analyze Title Tag
  const titleText = $('title').text().trim() || null;
  const titleLength = titleText?.length || 0;
  let titleStatus: AnalysisResult['status'] = 'pass';
  let titleRecommendation = 'The title length is within the recommended range.';
  if (!titleText) {
    titleStatus = 'fail';
    titleRecommendation = 'The page is missing a title tag.';
  } else if (titleLength < TITLE_MIN_LENGTH || titleLength > TITLE_MAX_LENGTH) {
    titleStatus = 'warning';
    titleRecommendation = `The title should be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} characters long.`;
  }

  const titleResult: AnalysisResult = {
    title: 'Title Tag',
    text: titleText,
    length: titleLength,
    status: titleStatus,
    recommendation: titleRecommendation,
  };

  // 2. Analyze Meta Description
  const descriptionText = $('meta[name="description"]').attr('content')?.trim() || null;
  const descriptionLength = descriptionText?.length || 0;
  let descriptionStatus: AnalysisResult['status'] = 'pass';
  let descriptionRecommendation = 'The meta description length is within the recommended range.';
  if (!descriptionText) {
    descriptionStatus = 'fail';
    descriptionRecommendation = 'The page is missing a meta description.';
  } else if (
    descriptionLength < DESCRIPTION_MIN_LENGTH ||
    descriptionLength > DESCRIPTION_MAX_LENGTH
  ) {
    descriptionStatus = 'warning';
    descriptionRecommendation = `The meta description should be between ${DESCRIPTION_MIN_LENGTH} and ${DESCRIPTION_MAX_LENGTH} characters long.`;
  }

  const descriptionResult: AnalysisResult = {
    title: 'Meta Description',
    text: descriptionText,
    length: descriptionLength,
    status: descriptionStatus,
    recommendation: descriptionRecommendation,
  };

  // 3. Analyze H1 Tags
  const h1Elements = $('h1');
  const h1Texts = h1Elements
    .map((i, el) => $(el).text().trim())
    .get()
    .join(' | ');
  const h1Count = h1Elements.length;
  let h1Status: AnalysisResult['status'] = 'pass';
  let h1Recommendation = 'The page has exactly one H1 tag, which is ideal.';
  if (h1Count === 0) {
    h1Status = 'fail';
    h1Recommendation = 'The page is missing an H1 tag. Every page should have one primary heading.';
  } else if (h1Count > 1) {
    h1Status = 'warning';
    h1Recommendation = `The page has ${h1Count} H1 tags. It's recommended to use only one H1 tag per page.`;
  }

  const h1sResult: AnalysisResult = {
    title: 'H1 Tag(s)',
    text: h1Texts || null,
    length: h1Count, // Using length property to store the count for H1s
    status: h1Status,
    recommendation: h1Recommendation,
  };

  // 4. Analyze Header Hierarchy (H2-H6)
  const headers: HeaderInfo[] = [];
  for (let i = 2; i <= 6; i++) {
    const selector = `h${i}`;
    const elements = $(selector);
    const texts = elements.map((_, el) => $(el).text().trim()).get();
    if (texts.length > 0) {
      headers.push({
        level: i,
        text: texts,
        count: texts.length,
      });
    }
  }

  // 5. Analyze Image Alt Text
  const images = $('img');
  const totalImages = images.length;
  let altTextCount = 0;
  const missingAltTextImages: string[] = [];

  images.each((_, el) => {
    const alt = $(el).attr('alt');
    if (alt && alt.trim() !== '') {
      altTextCount++;
    } else {
      missingAltTextImages.push($(el).attr('src') || '');
    }
  });

  const altTextPercentage = totalImages > 0 ? (altTextCount / totalImages) * 100 : 100;

  let imageStatus: AnalysisResult['status'] = 'pass';
  let imageRecommendation = 'All images have alt text.';
  if (altTextPercentage < 100) {
    imageStatus = 'warning';
    imageRecommendation = 'Some images are missing alt text.';
  }
  if (totalImages > 0 && altTextCount === 0) {
    imageStatus = 'fail';
    imageRecommendation = 'All images are missing alt text.';
  }

  const imageResult: ImageAnalysisResult = {
    title: 'Image Alt Text',
    totalImages,
    altTextCount,
    altTextPercentage,
    missingAltTextImages,
    status: imageStatus,
    recommendation: imageRecommendation,
  };

  // 6. Check for robots.txt and sitemap.xml
  const robotsTxtUrl = `${baseUrl}/robots.txt`;
  const sitemapXmlUrl = `${baseUrl}/sitemap.xml`;

  const fetchFileContent = async (
    fileUrl: string
  ): Promise<{ ok: boolean; content: string | null; status: number }> => {
    for (const proxy of PROXIES) {
      try {
        const requestUrl = proxy.includes('?')
          ? `${proxy}${encodeURIComponent(fileUrl)}`
          : `${proxy}${fileUrl}`;
        const res = await fetch(requestUrl);

        if (!res.ok) continue;

        if (proxy.includes('allorigins.win')) {
          const data = await res.json();
          return { ok: true, content: data.contents, status: data.status.http_code };
        } else {
          const content = await res.text();
          return { ok: true, content, status: res.status };
        }
      } catch (error) {
        console.warn(`Proxy ${proxy} failed for ${fileUrl}`, error);
        continue;
      }
    }
    return { ok: false, content: null, status: 0 };
  };

  const checkFile = async (fileUrl: string, title: string): Promise<FileCheckResult> => {
    const { content, status } = await fetchFileContent(fileUrl);
    const found = status === 200;
    return {
      title,
      found,
      content: found ? content : null,
      status: found ? 'pass' : 'fail',
    };
  };

  const robotsTxtResult = await checkFile(robotsTxtUrl, 'robots.txt');
  const sitemapXmlResult = await checkFile(sitemapXmlUrl, 'sitemap.xml');

  // 7. Branding and Icon Analysis
  const checkIcon = async (href: string): Promise<IconResult['status']> => {
    try {
      const { status } = await fetchFileContent(new URL(href, baseUrl).toString());
      return status === 200 ? 'pass' : 'fail';
    } catch (error) {
      return 'cors-error';
    }
  };

  const favicons: IconResult[] = [];
  const declaredIcons = $('link[rel="icon"], link[rel="shortcut icon"]');
  const declaredIconHrefs = new Set<string>();

  for (const el of declaredIcons.get()) {
    const href = $(el).attr('href');
    if (!href) continue;
    declaredIconHrefs.add(href);
    const status = await checkIcon(href);
    favicons.push({
      href,
      rel: $(el).attr('rel') || '',
      type: $(el).attr('type'),
      sizes: $(el).attr('sizes'),
      status,
    });
  }

  // Check for conventional, undeclared favicons
  const conventionalIcons = ['/favicon.ico', '/icon.svg'];
  for (const iconPath of conventionalIcons) {
    if (!declaredIconHrefs.has(iconPath)) {
      const status = await checkIcon(iconPath);
      if (status === 'pass') {
        favicons.push({
          href: iconPath,
          rel: 'icon (conventional)',
          type: iconPath.endsWith('.svg') ? 'image/svg+xml' : 'image/x-icon',
          status,
        });
      }
    }
  }

  const appleTouchIconEl = $('link[rel="apple-touch-icon"]');
  let appleTouchIcon: IconResult | null = null;
  if (appleTouchIconEl.length > 0) {
    const href = appleTouchIconEl.attr('href');
    if (href) {
      const status = await checkIcon(href);
      appleTouchIcon = {
        href,
        rel: 'apple-touch-icon',
        sizes: appleTouchIconEl.attr('sizes'),
        status,
      };
    }
  }

  const manifestEl = $('link[rel="manifest"]');
  let manifest: ManifestResult = {
    found: false,
    status: 'fail',
    recommendation: 'No web app manifest found.',
  };
  if (manifestEl.length > 0) {
    const href = manifestEl.attr('href');
    if (href) {
      const { content, status } = await fetchFileContent(new URL(href, baseUrl).toString());
      if (status === 200 && content) {
        try {
          const manifestJson = JSON.parse(content);
          manifest = {
            found: true,
            content: manifestJson,
            status: 'pass',
            recommendation: 'Web app manifest found and is valid JSON.',
          };
        } catch (e) {
          manifest.recommendation = 'Web app manifest found but is not valid JSON.';
        }
      }
    }
  }

  const brandingResult: BrandingResult = {
    favicons,
    appleTouchIcon,
    manifest,
  };

  return {
    title: titleResult,
    description: descriptionResult,
    h1s: h1sResult,
    headers,
    images: imageResult,
    robotsTxt: robotsTxtResult,
    sitemapXml: sitemapXmlResult,
    branding: brandingResult,
  };
}
