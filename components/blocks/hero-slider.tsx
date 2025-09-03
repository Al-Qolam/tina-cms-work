'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Icon } from '../icon';
import { iconSchema } from '@/tina/fields/icon';
import { Section, sectionBlockSchemaField } from '../layout/section';

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
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          data-tina-field={tinaField(slide)}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.slideImage})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center text-white">
                <h2 
                  className="text-lg md:text-xl font-medium mb-4 text-blue-200"
                  data-tina-field={tinaField(slide, 'subtitle')}
                >
                  {slide.subtitle}
                </h2>
                <h1 
                  className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                  data-tina-field={tinaField(slide, 'slideTitle')}
                >
                  {slide.slideTitle}
                </h1>
                <p 
                  className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto"
                  data-tina-field={tinaField(slide, 'description')}
                >
                  {slide.description}
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {slide.primaryButton && (
                    <Link
                      href={slide.primaryButton.href}
                      className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                      data-tina-field={tinaField(slide, 'primaryButton')}
                    >
                      <span>{slide.primaryButton.label}</span>
                      <Icon data={{ name: 'BiChevronRight', size: 'small' }} />
                    </Link>
                  )}
                  {slide.secondaryButton && (
                    <Link
                      href={slide.secondaryButton.href}
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-blue-900 transition-colors"
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
            {slides.map((_: any, index: number) => (
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
        </>
      )}

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="text-white text-center">
          <p className="text-sm mb-2">Scroll Down</p>
          <div className="animate-bounce">
            <Icon data={{ name: 'BiChevronDown', size: 'medium' }} />
          </div>
        </div>
      </div>
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
      type: 'object',
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
          type: 'string',
          label: 'Title',
          name: 'slideTitle',
          required: true,
        },
        {
          type: 'string',
          label: 'Subtitle',
          name: 'subtitle',
        },
        {
          type: 'string',
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
          type: 'object',
          label: 'Primary Button',
          name: 'primaryButton',
          fields: [
            {
              type: 'string',
              label: 'Label',
              name: 'label',
              required: true,
            },
            {
              type: 'string',
              label: 'Link',
              name: 'href',
              required: true,
            },
          ],
        },
        {
          type: 'object',
          label: 'Secondary Button',
          name: 'secondaryButton',
          fields: [
            {
              type: 'string',
              label: 'Label',
              name: 'label',
            },
            {
              type: 'string',
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