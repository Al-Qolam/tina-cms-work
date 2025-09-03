import React from 'react';
import { EnhancedLayout } from '@/components/layout';
import {
  HeroSlider,
  AboutSection,
  StatisticsSection,
  ProgramSection,
  CTABanner,
  NewsSection
} from '@/components/layout';

interface LandingPageProps {
  // Optional props untuk customization
  rawPageData?: any;
  heroProps?: any;
  aboutProps?: any;
  statsProps?: any;
  programProps?: any;
  ctaProps?: any;
  newsProps?: any;
}

export default async function LandingPage({
  rawPageData,
  heroProps = {},
  aboutProps = {},
  statsProps = {},
  programProps = {},
  ctaProps = {},
  newsProps = {}
}: LandingPageProps) {
  return (
    <EnhancedLayout rawPageData={rawPageData}>
      {/* Hero Slider - Banner utama dengan slider */}
      <HeroSlider {...heroProps} />
      
      {/* About Section - Tentang sekolah */}
      <AboutSection {...aboutProps} />
      
      {/* Statistics Section - Statistik sekolah */}
      <StatisticsSection 
        background="blue" 
        {...statsProps} 
      />
      
      {/* Program Section - Program pendidikan */}
      <ProgramSection {...programProps} />
      
      {/* CTA Banner - Call to action untuk pendaftaran */}
      <CTABanner {...ctaProps} />
      
      {/* News Section - Berita dan kegiatan terbaru */}
      <NewsSection {...newsProps} />
    </EnhancedLayout>
  );
}