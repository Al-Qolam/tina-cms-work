'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icon';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryButton?: {
    label: string;
    href: string;
  };
  secondaryButton?: {
    label: string;
    href: string;
  };
}

interface HeroSliderProps {
  slides?: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Selamat Datang di Sekolah Kami",
    subtitle: "Membangun Generasi Unggul dan Berkarakter",
    description: "Pendidikan berkualitas dengan fasilitas modern dan tenaga pengajar profesional untuk masa depan yang cerah.",
    image: "/uploads/hero-slide-1.jpg",
    primaryButton: { label: "Profil Sekolah", href: "/profil-sekolah" },
    secondaryButton: { label: "Daftar Sekarang", href: "/pendaftaran" }
  },
  {
    id: 2,
    title: "Fasilitas Lengkap dan Modern",
    subtitle: "Mendukung Proses Pembelajaran Optimal",
    description: "Laboratorium, perpustakaan digital, lapangan olahraga, dan fasilitas pendukung lainnya yang lengkap.",
    image: "/uploads/hero-slide-2.jpg",
    primaryButton: { label: "Lihat Fasilitas", href: "/fasilitas" },
    secondaryButton: { label: "Kunjungi Sekolah", href: "/galeri-kontak" }
  },
  {
    id: 3,
    title: "Program Pendidikan Unggulan",
    subtitle: "Kurikulum Terkini dan Beragam Ekstrakurikuler",
    description: "Program pendidikan yang disesuaikan dengan perkembangan zaman dan kebutuhan masa depan siswa.",
    image: "/uploads/hero-slide-3.jpg",
    primaryButton: { label: "Program Pendidikan", href: "/program-pendidikan" },
    secondaryButton: { label: "Info PPDB", href: "/pendaftaran" }
  }
];

export default function HeroSlider({ 
  slides = defaultSlides, 
  autoPlay = true,
  autoPlayInterval = 5000
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center text-white">
                <h2 className="text-lg md:text-xl font-medium mb-4 text-blue-200">
                  {slide.subtitle}
                </h2>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
                  {slide.description}
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {slide.primaryButton && (
                    <Link
                      href={slide.primaryButton.href}
                      className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                    >
                      <span>{slide.primaryButton.label}</span>
                      <Icon data={{ name: 'BiChevronRight', size: 'small' }} />
                    </Link>
                  )}
                  {slide.secondaryButton && (
                    <Link
                      href={slide.secondaryButton.href}
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-blue-900 transition-colors"
                    >
                      {slide.secondaryButton.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-all z-20"
      >
        <Icon data={{ name: 'BiChevronLeft', size: 'medium' }} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-all z-20"
      >
        <Icon data={{ name: 'BiChevronRight', size: 'medium' }} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="text-white text-center">
          <p className="text-sm mb-2">Scroll Down</p>
          <div className="animate-bounce">
            <Icon data={{ name: 'BiChevronDown', size: 'medium' }} />
          </div>
        </div>
      </div>
    </div>
  );
}