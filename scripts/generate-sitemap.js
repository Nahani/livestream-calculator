import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

// Base URL for the site
const URL_BASE = 'https://livestream-calculator.web.app';

// Get last commit date for each file
function getLastCommitDate() {
  try {
    const date = execSync('git log -1 --format=%cd').toString().trim();
    return new Date(date).toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

// Create sitemap stream with language support
const sitemapStream = new SitemapStream({ 
  hostname: URL_BASE,
  xmlns: {
    xhtml: true // Enable XHTML namespace for language alternates
  }
});

// Get current date for lastmod
const lastmod = getLastCommitDate();

// Create links with language alternates
const links = [
  { 
    url: '/', 
    changefreq: 'weekly', 
    priority: 1.0, 
    lastmod,
    links: [
      { lang: 'en', url: `${URL_BASE}` },
      { lang: 'fr', url: `${URL_BASE}?lang=fr` },
      { lang: 'x-default', url: `${URL_BASE}` }
    ]
  }
];

// Return a promise that resolves with XML string
const sitemap = streamToPromise(
  Readable.from(links).pipe(sitemapStream)
).then((data) => data.toString());

// Generate sitemap.xml
sitemap.then(xml => {
  const path = resolve('./dist/sitemap.xml');
  writeFileSync(path, xml);
  console.log(`✅ Sitemap generated at ${path}`);
}); 