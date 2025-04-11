import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title?: {
    en: string;
    fr: string;
  };
  description?: {
    en: string;
    fr: string;
  };
  canonical?: string;
  keywords?: {
    en: string;
    fr: string;
  };
  ogImage?: string;
  ogType?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = {
    en: 'Livestream Calculator',
    fr: 'Livestream Calculator'
  },
  description = {
    en: 'Position sizing calculator for traders. Calculate the maximum number of contracts and potential loss for various trading platforms.',
    fr: 'Calculateur de taille de position pour traders. Calculez le nombre maximum de contrats et les pertes potentielles pour différentes plateformes.'
  },
  canonical = 'https://livestream-calculator.web.app',
  keywords = {
    en: 'trading calculator, position sizing, risk management, futures contracts, CFD trading, topstep, FTMO, drawdown management',
    fr: 'calculateur de trading, taille de position, gestion des risques, contrats à terme, trading CFD, topstep, FTMO, gestion du drawdown'
  },
  ogImage = '/og-image.svg',
  ogType = 'website'
}) => {
  const { language } = useLanguage();
  
  // Language-specific content
  const localizedTitle = title[language] || title.en;
  const localizedDescription = description[language] || description.en;
  const localizedKeywords = keywords[language] || keywords.en;
  
  return (
    <Helmet htmlAttributes={{ lang: language }}>
      {/* Primary Meta Tags */}
      <title>{localizedTitle}</title>
      <meta name="description" content={localizedDescription} />
      <meta name="keywords" content={localizedKeywords} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={canonical} />
      
      {/* hreflang Tags */}
      <link rel="alternate" href={`${canonical}`} hrefLang="x-default" />
      <link rel="alternate" href={`${canonical}`} hrefLang="en" />
      <link rel="alternate" href={`${canonical}?lang=fr`} hrefLang="fr" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={localizedTitle} />
      <meta property="og:description" content={localizedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'fr' ? 'en_US' : 'fr_FR'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={localizedTitle} />
      <meta property="twitter:description" content={localizedDescription} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  );
}; 