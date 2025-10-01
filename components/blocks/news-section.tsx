'use client';
import React from 'react';
import Link from 'next/link';
import { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Icon } from '../icon';
import { Section, sectionBlockSchemaField } from '../layout/section';

function NewsCard({ item }: { item: any }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2" data-tina-field={tinaField(item)}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full img-cover-safe group-hover:scale-110 transition-transform duration-300"
          data-tina-field={tinaField(item, 'image')}
        />
        <div className="absolute top-4 left-4">
          <span
            className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium"
            data-tina-field={tinaField(item, 'category')}
          >
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Icon data={{ name: 'BiTime', size: 'xs' }} />
            <span data-tina-field={tinaField(item, 'date')}>{item.date}</span>
          </div>
          {item.author && (
            <div className="flex items-center space-x-1">
              <Icon data={{ name: 'BiUser', size: 'xs' }} />
              <span data-tina-field={tinaField(item, 'author')}>{item.author}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={`/posts/${item.slug}`} data-tina-field={tinaField(item, 'title')}>
            {item.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p 
          className="text-gray-600 mb-4 line-clamp-3"
          data-tina-field={tinaField(item, 'excerpt')}
        >
          {item.excerpt}
        </p>

        {/* Read More */}
        <Link
          href={`/posts/${item.slug}`}
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors group"
        >
          <span>Baca Selengkapnya</span>
          <Icon
            data={{
              name: 'BiChevronRight',
              color: 'primary',
              size: 'small'
            }}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </article>
  );
}

export const NewsSection = ({ data }: { data: any }) => {
  const news = data.news || [];
  const maxItems = data.maxItems || 4;
  const displayedNews = news.slice(0, maxItems);

  return (
    <Section background={data.background}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
      <div className="text-center mb-16">
        <h3
          className="text-primary text-lg font-semibold mb-2"
          data-tina-field={tinaField(data, 'subtitle')}
        >
          {data.subtitle}
        </h3>
        <h2 
          className="text-4xl font-bold text-gray-900 mb-6"
          data-tina-field={tinaField(data, 'newsTitle')}
        >
          {data.newsTitle}
        </h2>
        <p 
          className="text-lg text-gray-700 max-w-3xl mx-auto"
          data-tina-field={tinaField(data, 'description')}
        >
          {data.description}
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {displayedNews.map((item: any, index: number) => (
          <NewsCard key={index} item={item} />
        ))}
      </div>

      {/* View All Button */}
      {data.viewAllButton && (
        <div className="text-center">
          <Link
            href={data.viewAllButton.href}
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors text-lg"
            data-tina-field={tinaField(data, 'viewAllButton')}
          >
            <span>{data.viewAllButton.label}</span>
            <Icon data={{ name: 'BiChevronRight', size: 'small' }} />
          </Link>
        </div>
      )}
      </div>
    </Section>
  );
};

export const newsSectionBlockSchema: Template = {
  name: 'newsSection',
  label: 'News Section',
  ui: {
    previewSrc: '/blocks/news-section.png',
    defaultItem: {
      newsTitle: 'Berita & Kegiatan Terbaru',
      subtitle: 'Update Sekolah',
      description: 'Ikuti perkembangan dan kegiatan terbaru di sekolah kami.',
      news: [
        {
          title: 'Prestasi Gemilang Siswa dalam Olimpiade Matematika',
          excerpt: 'Siswa kelas 9 berhasil meraih medali emas dalam kompetisi olimpiade matematika tingkat nasional.',
          image: '/uploads/news-1.jpg',
          date: '15 Agustus 2024',
          category: 'Prestasi',
          slug: 'prestasi-olimpiade-matematika',
          author: 'Admin Sekolah'
        }
      ],
      maxItems: 4,
      viewAllButton: { label: 'Lihat Semua Berita', href: '/posts' }
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: 'string' as const,
      label: 'News Title',
      name: 'newsTitle',
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
      label: 'News Items',
      name: 'news',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title || 'News Item',
        }),
      },
      fields: [
        {
          type: 'string' as const,
          label: 'Title',
          name: 'title',
          required: true,
        },
        {
          type: 'string' as const,
          label: 'Excerpt',
          name: 'excerpt',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'image' as const,
          label: 'Image',
          name: 'image',
        },
        {
          type: 'string' as const,
          label: 'Date',
          name: 'date',
          ui: {
            description: 'Format: DD Month YYYY (e.g., 15 Agustus 2024)'
          }
        },
        {
          type: 'string' as const,
          label: 'Category',
          name: 'category',
        },
        {
          type: 'string' as const,
          label: 'Slug',
          name: 'slug',
          required: true,
          ui: {
            description: 'URL-friendly version of title (e.g., prestasi-olimpiade-matematika)'
          }
        },
        {
          type: 'string' as const,
          label: 'Author',
          name: 'author',
        },
      ],
    },
    {
      type: 'number' as const,
      label: 'Max Items to Display',
      name: 'maxItems',
      ui: {
        description: 'Maximum number of news items to show'
      }
    },
    {
      type: 'object' as const,
      label: 'View All Button',
      name: 'viewAllButton',
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
};