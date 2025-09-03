'use client';
import React from 'react';
import Link from 'next/link';
import { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Icon } from '../icon';
import { iconSchema } from '@/tina/fields/icon';
import { Section, sectionBlockSchemaField } from '../layout/section';

export const ProgramSection = ({ data }: { data: any }) => {
  const programs = data.programs || [];
  const extraFeatures = data.extraFeatures || [];

  return (
    <Section background={data.background}>
      {/* Header */}
      <div className="text-center mb-16">
        <h3 
          className="text-blue-600 text-lg font-semibold mb-2"
          data-tina-field={tinaField(data, 'subtitle')}
        >
          {data.subtitle}
        </h3>
        <h2 
          className="text-4xl font-bold text-gray-900 mb-6"
          data-tina-field={tinaField(data, 'programTitle')}
        >
          {data.programTitle}
        </h2>
        <p 
          className="text-lg text-gray-700 max-w-3xl mx-auto"
          data-tina-field={tinaField(data, 'description')}
        >
          {data.description}
        </p>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {programs.map((program: any, index: number) => (
          <div
            key={index}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            data-tina-field={tinaField(program)}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                data-tina-field={tinaField(program, 'image')}
              />
              <div className="absolute top-4 left-4">
                <Icon 
                  data={{ 
                    name: program.icon?.name || 'BiBook', 
                    color: program.icon?.color || 'blue',
                    style: 'circle',
                    size: 'large'
                  }}
                  className="bg-white bg-opacity-90"
                  tinaField={tinaField(program, 'icon')}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 
                className="text-xl font-bold text-gray-900 mb-3"
                data-tina-field={tinaField(program, 'title')}
              >
                {program.title}
              </h3>
              <p 
                className="text-gray-600 mb-4"
                data-tina-field={tinaField(program, 'description')}
              >
                {program.description}
              </p>

              {/* Features */}
              {program.features && (
                <div className="space-y-2 mb-6">
                  {program.features.map((feature: any, featureIndex: number) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <Icon 
                        data={{ 
                          name: 'BiCheck', 
                          color: program.icon?.color || 'blue',
                          size: 'small'
                        }} 
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Link */}
              {program.href && (
                <Link
                  href={program.href}
                  className={`inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group`}
                  data-tina-field={tinaField(program, 'href')}
                >
                  <span>Pelajari Lebih Lanjut</span>
                  <Icon 
                    data={{ 
                      name: 'BiChevronRight', 
                      color: 'blue',
                      size: 'small'
                    }}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Extra Features Grid */}
      {extraFeatures.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {extraFeatures.map((item: any, index: number) => (
            <div 
              key={index} 
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              data-tina-field={tinaField(item)}
            >
              <Icon 
                data={{ 
                  name: item.icon?.name || 'BiStar', 
                  color: item.icon?.color || 'blue',
                  style: 'circle',
                  size: 'large'
                }}
                className="mx-auto mb-3"
                tinaField={tinaField(item, 'icon')}
              />
              <h4 
                className="font-semibold text-gray-900 mb-1"
                data-tina-field={tinaField(item, 'title')}
              >
                {item.title}
              </h4>
              <p 
                className="text-sm text-gray-600"
                data-tina-field={tinaField(item, 'description')}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CTA Button */}
      {data.ctaButton && (
        <div className="text-center">
          <Link
            href={data.ctaButton.href}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-colors text-lg"
            data-tina-field={tinaField(data, 'ctaButton')}
          >
            <span>{data.ctaButton.label}</span>
            <Icon data={{ name: 'BiChevronRight', size: 'small' }} />
          </Link>
        </div>
      )}
    </Section>
  );
};

export const programSectionBlockSchema: Template = {
  name: 'programSection',
  label: 'Program Section',
  ui: {
    previewSrc: '/blocks/program-section.png',
    defaultItem: {
      programTitle: 'Program Pendidikan',
      subtitle: 'Jenjang Pendidikan Lengkap',
      description: 'Kami menyediakan program pendidikan dari tingkat dasar hingga menengah atas dengan kurikulum berkualitas.',
      programs: [
        {
          title: 'Sekolah Dasar (SD)',
          description: 'Program pendidikan dasar dengan fokus pada literasi, numerasi, dan pembentukan karakter.',
          icon: { name: 'BiChild', color: 'blue' },
          features: ['Kelas 1-6', 'Kurikulum Nasional', 'Kegiatan Ekstrakurikuler'],
          image: '/uploads/program-sd.jpg',
          href: '/program-pendidikan#sd'
        }
      ],
      extraFeatures: [
        { icon: { name: 'BiFootball', color: 'green' }, title: 'Ekstrakurikuler', description: '15+ Pilihan' }
      ],
      ctaButton: { label: 'Lihat Semua Program', href: '/program-pendidikan' }
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: 'string',
      label: 'Program Title',
      name: 'programTitle',
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
      type: 'object',
      label: 'Programs',
      name: 'programs',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title || 'Program',
        }),
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
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
        iconSchema,
        {
          type: 'string',
          label: 'Features',
          name: 'features',
          list: true,
        },
        {
          type: 'image',
          label: 'Image',
          name: 'image',
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
      label: 'Extra Features',
      name: 'extraFeatures',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title || 'Feature',
        }),
      },
      fields: [
        iconSchema,
        {
          type: 'string',
          label: 'Title',
          name: 'title',
          required: true,
        },
        {
          type: 'string',
          label: 'Description',
          name: 'description',
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
  ],
};