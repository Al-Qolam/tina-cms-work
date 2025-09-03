'use client';
import React from 'react';
import Link from 'next/link';
import { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Icon } from '../icon';
import { iconSchema } from '@/tina/fields/icon';
import { Section, sectionBlockSchemaField } from '../layout/section';

export const AboutSection = ({ data }: { data: any }) => {
  const features = data.features || [];

  return (
    <Section background={data.background}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="order-2 lg:order-1">
          <div className="mb-8">
            <h3 
              className="text-blue-600 text-lg font-semibold mb-2"
              data-tina-field={tinaField(data, 'subtitle')}
            >
              {data.subtitle}
            </h3>
            <h2 
              className="text-4xl font-bold text-gray-900 mb-6"
              data-tina-field={tinaField(data, 'aboutTitle')}
            >
              {data.aboutTitle}
            </h2>
            <p 
              className="text-lg text-gray-700 leading-relaxed"
              data-tina-field={tinaField(data, 'description')}
            >
              {data.description}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {features.map((feature: any, index: number) => (
              <div key={index} className="flex items-start space-x-4" data-tina-field={tinaField(feature)}>
                <div className="flex-shrink-0">
                  <Icon 
                    data={{ 
                      name: feature.icon?.name || 'BiStar', 
                      color: feature.icon?.color || 'blue',
                      style: 'circle',
                      size: 'medium'
                    }} 
                    tinaField={tinaField(feature, 'icon')}
                  />
                </div>
                <div>
                  <h4 
                    className="font-semibold text-gray-900 mb-2"
                    data-tina-field={tinaField(feature, 'featureTitle')}
                  >
                    {feature.featureTitle}
                  </h4>
                  <p 
                    className="text-gray-600 text-sm"
                    data-tina-field={tinaField(feature, 'description')}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          {data.ctaButton && (
            <Link
              href={data.ctaButton.href}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-colors"
              data-tina-field={tinaField(data, 'ctaButton')}
            >
              <span>{data.ctaButton.label}</span>
              <Icon data={{ name: 'BiChevronRight', size: 'small' }} />
            </Link>
          )}
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2">
          <div className="relative">
            <img
              src={data.aboutImage}
              alt={data.aboutTitle}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
              data-tina-field={tinaField(data, 'aboutImage')}
            />
            
            {/* Floating Card */}
            {data.achievementCard && (
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Icon 
                      data={{ 
                        name: data.achievementCard.icon?.name || 'BiTime', 
                        color: 'blue',
                        size: 'medium'
                      }} 
                    />
                  </div>
                  <div>
                    <h4 
                      className="font-bold text-gray-900 text-2xl"
                      data-tina-field={tinaField(data.achievementCard, 'value')}
                    >
                      {data.achievementCard.value}
                    </h4>
                    <p 
                      className="text-gray-600"
                      data-tina-field={tinaField(data.achievementCard, 'label')}
                    >
                      {data.achievementCard.label}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Achievement Badge */}
            {data.achievementBadge && (
              <div className="absolute -top-6 -right-6 bg-orange-500 text-white p-4 rounded-xl shadow-lg text-center">
                <Icon 
                  data={{ 
                    name: data.achievementBadge.icon?.name || 'BiTrophy', 
                    color: 'white',
                    size: 'medium'
                  }}
                  className="mx-auto mb-2" 
                />
                <p 
                  className="font-bold"
                  data-tina-field={tinaField(data.achievementBadge, 'value')}
                >
                  {data.achievementBadge.value}
                </p>
                <p 
                  className="text-xs"
                  data-tina-field={tinaField(data.achievementBadge, 'label')}
                >
                  {data.achievementBadge.label}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export const aboutSectionBlockSchema: Template = {
  name: 'aboutSection',
  label: 'About Section',
  ui: {
    previewSrc: '/blocks/about-section.png',
    defaultItem: {
      aboutTitle: 'Tentang Sekolah Kami',
      subtitle: 'Membangun Generasi Unggul',
      description: 'Sekolah kami telah berdedikasi dalam dunia pendidikan selama lebih dari 35 tahun dengan komitmen memberikan pendidikan berkualitas.',
      aboutImage: '/uploads/about-school.jpg',
      features: [
        {
          icon: { name: 'BiAward', color: 'blue' },
          featureTitle: 'Akreditasi A',
          description: 'Terakreditasi A dari BAN-S/M dengan standar pendidikan tinggi'
        },
        {
          icon: { name: 'BiGroup', color: 'green' },
          featureTitle: 'Tenaga Pengajar Profesional',
          description: '50+ guru berpengalaman dan berkualitas'
        }
      ],
      ctaButton: { label: 'Selengkapnya', href: '/profil-sekolah' },
      achievementCard: {
        icon: { name: 'BiTime' },
        value: '35+',
        label: 'Tahun Pengalaman'
      },
      achievementBadge: {
        icon: { name: 'BiTrophy' },
        value: '50+',
        label: 'Penghargaan'
      }
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: 'string',
      label: 'About Title',
      name: 'aboutTitle',
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
      type: 'image',
      label: 'About Image',
      name: 'aboutImage',
    },
    {
      type: 'object',
      label: 'Features',
      name: 'features',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.featureTitle || 'Feature',
        }),
      },
      fields: [
        iconSchema,
        {
          type: 'string',
          label: 'Feature Title',
          name: 'featureTitle',
          required: true,
        },
        {
          type: 'string',
          label: 'Description',
          name: 'description',
          ui: {
            component: 'textarea',
          },
        },
      ],
    },
    {
      type: 'object',
      label: 'CTA Button',
      name: 'ctaButton',
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
    {
      type: 'object',
      label: 'Achievement Card',
      name: 'achievementCard',
      fields: [
        iconSchema,
        {
          type: 'string',
          label: 'Value',
          name: 'value',
        },
        {
          type: 'string',
          label: 'Label',
          name: 'label',
        },
      ],
    },
    {
      type: 'object',
      label: 'Achievement Badge',
      name: 'achievementBadge',
      fields: [
        iconSchema,
        {
          type: 'string',
          label: 'Value',
          name: 'value',
        },
        {
          type: 'string',
          label: 'Label',
          name: 'label',
        },
      ],
    },
  ],
};