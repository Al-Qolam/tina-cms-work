'use client';

import React, { useEffect, useState } from 'react';
import { Section, sectionBlockSchemaField } from '../layout/section';

import { Icon } from '../icon';
import Link from 'next/link';
import { Template } from 'tinacms';
import { iconSchema } from '@/tina/fields/icon';
import { tinaField } from 'tinacms/dist/react';

export const HeroSlider = ({ data }: { data: any }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = data.slides || [];

  useEffect(() => {
    if (!data.autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, data.autoPlayInterval || 5000);

    return () => clearInterval(interval);
  }, [data.autoPlay, data.autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides.length) return null;

  return (
    <Section className="relative h-screen overflow-hidden p-0" background={data.background}>
      {/* Slides */}
      {slides.map((slide: any, index: number) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          data-tina-field={tinaField(slide)}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.slideImage}
              alt={slide.slideTitle || 'Hero slide'}
              className="absolute inset-0 w-full h-full img-cover-safe"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h2
                  className="text-sm md:text-base font-medium mb-3 text-accent"
                  data-tina-field={tinaField(slide, 'subtitle')}
                >
                  {slide.subtitle}
                </h2>
                <h1
                  className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
                  data-tina-field={tinaField(slide, 'slideTitle')}
                >
                  {slide.slideTitle}
                </h1>
                <p
                  className="text-base md:text-lg mb-6 text-gray-200 max-w-2xl mx-auto"
                  data-tina-field={tinaField(slide, 'description')}
                >
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  {slide.primaryButton && (
                    <Link
                      href={slide.primaryButton.href}
                      className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-base font-medium hover:bg-primary/90 hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
                      data-tina-field={tinaField(slide, 'primaryButton')}
                    >
                      <span>{slide.primaryButton.label}</span>
                      <Icon data={{ name: 'BiChevronRight', size: 'small' }} />
                    </Link>
                  )}
                  {slide.secondaryButton && (
                    <Link
                      href={slide.secondaryButton.href}
                      className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full text-base font-medium hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300"
                      data-tina-field={tinaField(slide, 'secondaryButton')}
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
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all z-20"
          >
            <Icon data={{ name: 'BiChevronLeft', size: 'medium' }} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all z-20"
          >
            <Icon data={{ name: 'BiChevronRight', size: 'medium' }} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {slides.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                  }`}
              />
            ))}
          </div>
        </>
      )}

    </Section>
  );
};

export const heroSliderBlockSchema: Template = {
  name: 'heroSlider',
  label: 'Hero Slider',
  ui: {
    previewSrc: '/blocks/hero-slider.png',
    defaultItem: {
      slides: [
        {
          slideTitle: 'Selamat Datang di Sekolah Kami',
          subtitle: 'Membangun Generasi Unggul dan Berkarakter',
          description: 'Pendidikan berkualitas dengan fasilitas modern dan tenaga pengajar profesional.',
          slideImage: '/uploads/hero-slide-1.jpg',
          primaryButton: { label: 'Profil Sekolah', href: '/profil-sekolah' },
          secondaryButton: { label: 'Daftar Sekarang', href: '/pendaftaran' }
        }
      ],
      autoPlay: true,
      autoPlayInterval: 5000,
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: 'object' as const,
      label: 'Slides',
      name: 'slides',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.slideTitle || 'Slide',
        }),
      },
      fields: [
        {
          type: 'string' as const,
          label: 'Title',
          name: 'slideTitle',
          required: true,
        },
        {
          type: 'string' as const,
          label: 'Subtitle',
          name: 'subtitle',
        },
        {
          type: 'string' as const,
          label: 'Description',
          name: 'description',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'image' as const,
          label: 'Background Image',
          name: 'slideImage',
          required: true,
        },
        {
          type: 'object' as const,
          label: 'Primary Button',
          name: 'primaryButton',
          fields: [
            {
              type: 'string' as const,
              label: 'Label',
              name: 'label',
              required: true,
            },
            {
              type: 'string' as const,
              label: 'Link',
              name: 'href',
              required: true,
            },
          ],
        },
        {
          type: 'object' as const,
          label: 'Secondary Button',
          name: 'secondaryButton',
          fields: [
            {
              type: 'string' as const,
              label: 'Label',
              name: 'label',
            },
            {
              type: 'string' as const,
              label: 'Link',
              name: 'href',
            },
          ],
        },
      ],
    },
    {
      type: 'boolean' as const,
      label: 'Auto Play',
      name: 'autoPlay',
    },
    {
      type: 'number' as const,
      label: 'Auto Play Interval (ms)',
      name: 'autoPlayInterval',
      ui: {
        description: 'Time between slides in milliseconds',
      },
    },
  ],
};