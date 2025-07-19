# Vitals by One Buffalo Labs

![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/OneBuffaloLabs/vitals/deploy.yml)

Check your website's core SEO vitals. A fast, modern, and client-side analysis tool built with Next.js and TypeScript.

---

## 🚀 Live Site

**[vitals.onebuffalolabs.com](https://vitals.onebuffalolabs.com)**

## ✨ Features

Vitals is a privacy-focused SEO tool that performs all analysis directly in your browser. Nothing is stored on a server. It provides an instant health check of a website's most critical elements.

### Core Analysis

- **On-Page Basics:** Analyze `Title` tags, `Meta Descriptions`, and `H1` tags for content and length.
- **Content Structure:** Get a full breakdown of the `Header` tag hierarchy (`H1-H6`) to diagnose structural issues.
- **Image SEO:** Scan all images and report on the presence of `alt` text for accessibility and SEO.
- **Link Profile:** Count internal, external, and nofollow links on the page.

### Technical & Advanced SEO

- **File Access:** Check for the presence and accessibility of `robots.txt` and `sitemap.xml`.
- **Core Web Vitals:** Integrate with the PageSpeed Insights API to pull real-world LCP, INP, and CLS performance data (requires a user-provided API key).
- **Canonical Tags:** Verify the presence and URL of the `rel="canonical"` tag to prevent duplicate content.

### Branding & Identity

- **Comprehensive Favicon Analysis:** Detailed checks for modern `SVG`, `PNG`, and `ICO` favicon declarations.
- **Web App Manifest:** Parse the `manifest.json` file for PWA properties like `name`, `theme_color`, and icon sizes (192x192, 512x512).
- **Apple Touch Icons:** Verify the declaration and accessibility of Apple-specific touch icons.

### Meta & Security

- **Social Sharing:** Check for Open Graph (`og:`) and Twitter Card (`twitter:`) meta tags to ensure optimal social media previews.
- **Accessibility & Mobile:** Verify the `lang` attribute and the `viewport` meta tag are properly configured.
- **HTTP Headers:** Inspect response headers for security best practices (`Content-Security-Policy`, etc.) and content encoding (`gzip`, `br`).

## 🎨 Color Palette: The Buffalo Blueprint

Vitals uses a custom color scheme designed for clarity and brand identity.

| Role        | Color Name | Hex                                                                       |
| ----------- | ---------- | ------------------------------------------------------------------------- |
| **Primary** | Indigo     | `![#34495E](https://via.placeholder.com/15/34495E/000000?text=+) #34495E` |
| **Accent**  | Red-Orange | `![#D35400](https://via.placeholder.com/15/D35400/000000?text=+) #D35400` |
| **Success** | Green      | `![#27AE60](https://via.placeholder.com/15/27AE60/000000?text=+) #27AE60` |
| **Warning** | Amber      | `![#F39C12](https://via.placeholder.com/15/F39C12/000000?text=+) #F39C12` |
| **Error**   | Red        | `![#C0392B](https://via.placeholder.com/15/C0392B/000000?text=+) #C0392B` |

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Font Awesome
- **Parsing:** Cheerio

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/OneBuffaloLabs/vitals.git](https://github.com/OneBuffaloLabs/vitals.git)
    ```
2.  Navigate to the project directory
    ```sh
    cd vitals
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Run the development server
    ```sh
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## ⚖️ License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License**.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a>

See `LICENSE.txt` for more information. You are free to:

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

Under the following terms:

- **Attribution** — You must give appropriate credit.
- **NonCommercial** — You may not use the material for commercial purposes.
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

---

A project by **One Buffalo Labs**.
