import React from 'react';
import {
  TopBar,
  NavBar,
  HeroSlider,
  AboutSection,
  StatisticsSection,
  ProgramSection,
  CTABanner,
  NewsSection,
  Footer
} from '@/components/layout';

interface LandingPageProps {
  // Optional props untuk customization
  topBarProps?: any;
  navBarProps?: any;
  heroProps?: any;
  aboutProps?: any;
  statsProps?: any;
  programProps?: any;
  ctaProps?: any;
  newsProps?: any;
  footerProps?: any;
}

export default function LandingPage({
  topBarProps = {},
  navBarProps = {},
  heroProps = {},
  aboutProps = {},
  statsProps = {},
  programProps = {},
  ctaProps = {},
  newsProps = {},
  footerProps = {}
}: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Top Bar - Informasi kontak dan social media */}
      <TopBar {...topBarProps} />
      
      {/* Navigation Bar - Menu utama */}
      <NavBar {...navBarProps} />
      
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
      
      {/* Footer - Informasi lengkap sekolah */}
      <Footer {...footerProps} />
    </div>
  );
}