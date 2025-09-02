'use client';
import React, { useState, useEffect } from 'react';
import { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Icon } from '../icon';
import { iconSchema } from '@/tina/fields/icon';
import { Section, sectionBlockSchemaField } from '../layout/section';

// Counter animation hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return { count, setIsVisible };
}

function StatCard({ stat, index }: { stat: any; index: number }) {
  const isNumber = typeof stat.value === 'number';
  const { count, setIsVisible } = useCounter(isNumber ? stat.value : 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 200);
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`stat-${index}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [index, setIsVisible]);

  const displayValue = isNumber ? count : stat.value;

  return (
    <div id={`stat-${index}`} className="text-center group" data-tina-field={tinaField(stat)}>
      <div className="mb-4">
        <Icon 
          data={{ 
            name: stat.icon?.name || 'BiStar', 
            color: stat.icon?.color || 'blue',
            style: 'circle',
            size: 'xl'
          }}
          className="mx-auto group-hover:scale-110 transition-transform duration-300"
          tinaField={tinaField(stat, 'icon')}
        />
      </div>
      <div className="mb-2">
        <span className="text-4xl lg:text-5xl font-bold text-gray-900">
          <span data-tina-field={tinaField(stat, 'prefix')}>{stat.prefix}</span>
          <span data-tina-field={tinaField(stat, 'value')}>{displayValue}</span>
          <span data-tina-field={tinaField(stat, 'suffix')}>{stat.suffix}</span>
        </span>
      </div>
      <p 
        className="text-gray-600 font-medium text-lg"
        data-tina-field={tinaField(stat, 'label')}
      >
        {stat.label}
      </p>
    </div>
  );
}

export const StatisticsSection = ({ data }: { data: any }) => {
  const statistics = data.statistics || [];
  const background = data.background || 'bg-white';

  const getTextClasses = (bg: string) => {
    if (bg.includes('gray-900') || bg.includes('blue-900')) {
      return 'text-white';
    }
    return 'text-gray-900';
  };

  const getSubtitleClasses = (bg: string) => {
    if (bg.includes('gray-900') || bg.includes('blue-900')) {
      return 'text-blue-200';
    }
    return 'text-blue-600';
  };

  const getDescriptionClasses = (bg: string) => {
    if (bg.includes('gray-900') || bg.includes('blue-900')) {
      return 'text-blue-100';
    }
    return 'text-gray-700';
  };

  return (
    <Section background={data.background}>
      {/* Header */}
      <div className="text-center mb-16">
        <h3 
          className={`text-lg font-semibold mb-2 ${getSubtitleClasses(background)}`}
          data-tina-field={tinaField(data, 'subtitle')}
        >
          {data.subtitle}
        </h3>
        <h2 
          className={`text-4xl font-bold mb-6 ${getTextClasses(background)}`}
          data-tina-field={tinaField(data, 'title')}
        >
          {data.title}
        </h2>
        <p 
          className={`text-lg max-w-3xl mx-auto ${getDescriptionClasses(background)}`}
          data-tina-field={tinaField(data, 'description')}
        >
          {data.description}
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        {statistics.map((stat: any, index: number) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* Bottom decoration */}
      {background.includes('blue') && (
        <div className="mt-16 flex justify-center">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
};

export const statisticsSectionBlockSchema: Template = {
  name: 'statisticsSection',
  label: 'Statistics Section',
  ui: {
    previewSrc: '/blocks/statistics-section.png',
    defaultItem: {
      title: 'Prestasi Sekolah',
      subtitle: 'Pencapaian Membanggakan',
      description: 'Sekolah kami bangga dengan berbagai prestasi yang telah diraih dalam bidang akademik maupun non-akademik.',
      statistics: [
        {
          icon: { name: 'BiGroup', color: 'blue' },
          value: 500,
          label: 'Siswa Aktif',
          suffix: '+'
        },
        {
          icon: { name: 'BiUser', color: 'green' },
          value: 50,
          label: 'Tenaga Pengajar',
          suffix: '+'
        },
        {
          icon: { name: 'BiTrophy', color: 'orange' },
          value: 95,
          label: 'Tingkat Kelulusan',
          suffix: '%'
        },
        {
          icon: { name: 'BiAward', color: 'red' },
          value: 'A',
          label: 'Akreditasi'
        }
      ]
    },
  },
  fields: [
    ...sectionBlockSchemaField,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
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
      label: 'Statistics',
      name: 'statistics',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.label || 'Statistic',
        }),
      },
      fields: [
        iconSchema,
        {
          type: 'string',
          label: 'Value',
          name: 'value',
          required: true,
          ui: {
            description: 'Use numbers for animated counters, text for static values'
          }
        },
        {
          type: 'string',
          label: 'Label',
          name: 'label',
          required: true,
        },
        {
          type: 'string',
          label: 'Prefix',
          name: 'prefix',
          ui: {
            description: 'Text before value (e.g., "$", ">")'
          }
        },
        {
          type: 'string',
          label: 'Suffix',
          name: 'suffix',
          ui: {
            description: 'Text after value (e.g., "+", "%", "K")'
          }
        },
      ],
    },
  ],
};