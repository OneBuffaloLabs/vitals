/**
 * @file Defines the TypeScript types for the SEO analysis results.
 */

// Defines the possible status states for an analysis check.
export type AnalysisStatus = 'pass' | 'warning' | 'fail' | 'info';

// Represents the result of a single SEO check (e.g., Title Tag).
export interface AnalysisResult {
  title: string;
  text: string | null;
  length: number;
  status: AnalysisStatus;
  recommendation: string;
}

// A collection of all the vital SEO checks for a page.
export interface PageVitals {
  title: AnalysisResult;
  description: AnalysisResult;
  h1s: AnalysisResult;
}
