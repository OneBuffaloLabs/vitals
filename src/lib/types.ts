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

// Represents the analysis of a specific header level (e.g., H2).
export interface HeaderInfo {
  level: number;
  text: string[];
  count: number;
}

// Represents the result of the image SEO analysis.
export interface ImageAnalysisResult {
  title: string;
  totalImages: number;
  altTextCount: number;
  altTextPercentage: number;
  missingAltTextImages: string[];
  status: AnalysisStatus;
  recommendation: string;
}

// Represents the result of a file check (robots.txt or sitemap.xml).
export interface FileCheckResult {
  title: string;
  found: boolean;
  content?: string | null;
  status: AnalysisStatus;
}

// Represents the analysis of a single icon.
export interface IconResult {
  href: string;
  rel: string;
  type?: string;
  sizes?: string;
  dimensions?: { width: number; height: number };
  status: 'pass' | 'fail' | 'cors-error';
}

// Represents the structure of a Web App Manifest icon.
export interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
  accessible?: boolean;
}

// Represents the structure of the Web App Manifest content.
export interface ManifestContent {
  name?: string;
  short_name?: string;
  theme_color?: string;
  background_color?: string;
  display?: string;
  start_url?: string;
  icons?: ManifestIcon[];
}

// Represents the analysis of the Web App Manifest.
export interface ManifestResult {
  found: boolean;
  content?: ManifestContent;
  hasRequiredProperties: boolean;
  hasRequiredIcons: boolean;
  status: AnalysisStatus;
  recommendation: string;
}

// Represents the comprehensive branding analysis.
export interface BrandingResult {
  favicons: IconResult[];
  appleTouchIcon: IconResult | null;
  appleMobileWebAppTitle: string | null;
  manifest: ManifestResult;
}

// A collection of all the vital SEO checks for a page.
export interface PageVitals {
  title: AnalysisResult;
  description: AnalysisResult;
  h1s: AnalysisResult;
  headers: HeaderInfo[];
  images: ImageAnalysisResult;
  robotsTxt: FileCheckResult;
  sitemapXml: FileCheckResult;
  branding: BrandingResult;
}
