'use client';
import React from 'react';
import Link from 'next/link';
import { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';

export const CTABanner = ({ data }: { data: any }) => {
  const buttons = data.buttons || [];
  const backgroundImage = data.backgroundImage;
  const overlay = data.overlay;
  const style = data.style || 'gradient';

  const getButtonClasses = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case 'primary':
        return 'bg-white text-primary hover:bg-gray-100';
      case 'secondary':
        return 'bg-primary/80 text-white hover:bg-primary';
      case 'outline':
      default:
        return 'border-2 border-white text-white hover:bg-white hover:text-primary';
    }
  };

  return (
    <Section
      className={`relative py-20 ${
        style === 'gradient'
          ? 'bg-gradient-to-r from-primary via-primary/90 to-primary'
          : style === 'image' && backgroundImage
            ? 'bg-cover bg-center bg-no-repeat'
            : 'bg-primary'
      }`}
      style={style === 'image' ? { backgroundImage: `url(${backgroundImage})` } : {}}
      background={data.background}
    >
      {/* Overlay */}
      {(style === 'image' && overlay) && (
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Subtitle */}
          <div className="mb-4">
            <span 
              className="inline-flex items-center space-x-2 bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium"
              data-tina-field={tinaField(data, 'subtitle')}
            >
              <Icon data={{ name: 'BiStar', size: 'xs' }} />
              <span>{data.subtitle}</span>
            </span>
          </div>

          {/* Title */}
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto"
            data-tina-field={tinaField(data, 'bannerTitle')}
          >
            {data.bannerTitle}
          </h2>

          {/* Description */}
          <p
            className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            data-tina-field={tinaField(data, 'description')}
          >
            {data.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            {buttons.map((button: any, index: number) => (
              <Link
                key={index}
                href={button.href}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${getButtonClasses(button.style)}`}
                data-tina-field={tinaField(button)}
              >
                <span data-tina-field={tinaField(button, 'label')}>{button.label}</span>
                <Icon data={{ name: 'BiChevronRight', size: 'small' }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export const ctaBannerBlockSchema: Template = {
  name: 'ctaBanner',
  label: 'CTA Banner',
  ui: {
    previewSrc: '/blocks/cta-banner.png',
    defaultItem: {
      bannerTitle: 'Bergabunglah dengan Keluarga Besar Kami',
      subtitle: 'Daftar Sekarang',
      description: 'Jadilah bagian dari sekolah yang telah mencetak generasi unggul selama puluhan tahun.',
      buttons: [
        { label: 'Daftar PPDB', href: '/pendaftaran', style: 'primary' },
        { label: 'Hubungi Kami', href: '/galeri-kontak', style: 'outline' }
      ],
      style: 'gradient',
      overlay: true
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: 'string' as const,
      label: 'Banner Title',
      name: 'bannerTitle',
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
      type: 'object' as const,
      label: 'Buttons',
      name: 'buttons',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.label || 'Button',
        }),
      },
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
        {
          type: 'string' as const,
          label: 'Style',
          name: 'style',
          options: ['primary', 'secondary', 'outline'],
        },
      ],
    },
    {
      type: 'string' as const,
      label: 'Style',
      name: 'style',
      options: ['gradient', 'solid', 'image'],
    },
    {
      type: 'image' as const,
      label: 'Background Image',
      name: 'backgroundImage',
      ui: {
        description: 'Only used when style is "image"'
      }
    },
    {
      type: 'boolean' as const,
      label: 'Overlay',
      name: 'overlay',
      ui: {
        description: 'Add dark overlay on background image'
      }
    },
  ],
};