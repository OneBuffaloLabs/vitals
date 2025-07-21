/**
 * @file The core client-side SEO analysis engine for Vitals.
 */

import { PageVitals, AnalysisResult } from './types';

// SEO Best Practices Thresholds
const TITLE_MIN_LENGTH = 10;
const TITLE_MAX_LENGTH = 60;
const DESCRIPTION_MIN_LENGTH = 50;
const DESCRIPTION_MAX_LENGTH = 160;

/**
 * Fetches and analyzes the on-page SEO vitals of a given URL.
 * @param url The URL to analyze.
 * @returns A promise that resolves to a PageVitals object.
 */
export async function analyzeUrl(url: string): Promise<PageVitals> {
  // We use a CORS proxy to fetch HTML content on the client-side.
  // This is a simple solution for demonstration purposes.
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch the URL. Status: ${response.status}`);
  }
  const html = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // 1. Analyze Title Tag
  const titleElement = doc.querySelector('title');
  // Use nullish coalescing operator (??) to ensure the value is either a string or null
  const titleText = titleElement?.textContent?.trim() ?? null;
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
  const descriptionElement = doc.querySelector('meta[name="description"]');
  const descriptionText = descriptionElement?.getAttribute('content')?.trim() ?? null;
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
  const h1Elements = Array.from(doc.querySelectorAll('h1'));
  const h1Texts = h1Elements.map((h1) => h1.textContent?.trim() || '').join(' | ');
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

  return {
    title: titleResult,
    description: descriptionResult,
    h1s: h1sResult,
  };
}
