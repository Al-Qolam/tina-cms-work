import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icon';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string;
  author?: string;
}

interface NewsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  news?: NewsItem[];
  viewAllButton?: {
    label: string;
    href: string;
  };
  maxItems?: number;
}

const defaultNews: NewsItem[] = [
  {
    id: 1,
    title: "Prestasi Gemilang Siswa dalam Olimpiade Matematika Nasional",
    excerpt: "Siswa kelas 9 berhasil meraih medali emas dalam kompetisi olimpiade matematika tingkat nasional yang diselenggarakan bulan lalu.",
    image: "/uploads/news-1.jpg",
    date: "15 Agustus 2024",
    category: "Prestasi",
    slug: "prestasi-olimpiade-matematika-nasional",
    author: "Admin Sekolah"
  },
  {
    id: 2,
    title: "Peresmian Laboratorium Komputer Baru dengan Teknologi Terkini",
    excerpt: "Sekolah meresmikan laboratorium komputer baru yang dilengkapi dengan 40 unit PC terbaru dan software pembelajaran modern.",
    image: "/uploads/news-2.jpg",
    date: "10 Agustus 2024",
    category: "Fasilitas",
    slug: "peresmian-laboratorium-komputer-baru",
    author: "Humas Sekolah"
  },
  {
    id: 3,
    title: "Kegiatan Bakti Sosial Siswa di Panti Asuhan Kasih Sayang",
    excerpt: "Para siswa mengadakan kegiatan bakti sosial dengan membagikan sembako dan mengajar anak-anak di panti asuhan.",
    image: "/uploads/news-3.jpg",
    date: "5 Agustus 2024",
    category: "Kegiatan",
    slug: "bakti-sosial-panti-asuhan",
    author: "OSIS"
  },
  {
    id: 4,
    title: "Workshop Parenting untuk Orang Tua Siswa Kelas 1",
    excerpt: "Sekolah mengadakan workshop khusus untuk orang tua siswa baru tentang cara mendampingi anak dalam proses belajar.",
    image: "/uploads/news-4.jpg",
    date: "1 Agustus 2024",
    category: "Workshop",
    slug: "workshop-parenting-orang-tua",
    author: "Tim BK"
  }
];

function formatDate(dateString: string): string {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
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
            <span>{item.date}</span>
          </div>
          {item.author && (
            <div className="flex items-center space-x-1">
              <Icon data={{ name: 'BiUser', size: 'xs' }} />
              <span>{item.author}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/posts/${item.slug}`}>
            {item.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {item.excerpt}
        </p>

        {/* Read More */}
        <Link
          href={`/posts/${item.slug}`}
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
        >
          <span>Baca Selengkapnya</span>
          <Icon 
            data={{ 
              name: 'BiChevronRight', 
              color: 'blue',
              size: 'small'
            }}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </article>
  );
}

export default function NewsSection({
  title = "Berita & Kegiatan Terbaru",
  subtitle = "Update Sekolah",
  description = "Ikuti perkembangan dan kegiatan terbaru di sekolah kami melalui berita dan informasi yang selalu update.",
  news = defaultNews,
  viewAllButton = { label: "Lihat Semua Berita", href: "/posts" },
  maxItems = 4
}: NewsSectionProps) {
  const displayedNews = news.slice(0, maxItems);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-blue-600 text-lg font-semibold mb-2">
            {subtitle}
          </h3>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {displayedNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        {/* View All Button */}
        {viewAllButton && (
          <div className="text-center">
            <Link
              href={viewAllButton.href}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-colors text-lg"
            >
              <span>{viewAllButton.label}</span>
              <Icon data={{ name: 'BiChevronRight', size: 'small' }} />
            </Link>
          </div>
        )}

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <Icon 
              data={{ 
                name: 'BiNews', 
                color: 'blue',
                style: 'circle',
                size: 'large'
              }}
              className="mx-auto mb-4"
            />
            <h4 className="text-2xl font-bold text-blue-900">50+</h4>
            <p className="text-blue-700">Berita Publikasi</p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Icon 
              data={{ 
                name: 'BiCalendarEvent', 
                color: 'green',
                style: 'circle',
                size: 'large'
              }}
              className="mx-auto mb-4"
            />
            <h4 className="text-2xl font-bold text-green-900">25+</h4>
            <p className="text-green-700">Event per Tahun</p>
          </div>
          
          <div className="text-center p-6 bg-orange-50 rounded-xl">
            <Icon 
              data={{ 
                name: 'BiTrophy', 
                color: 'orange',
                style: 'circle',
                size: 'large'
              }}
              className="mx-auto mb-4"
            />
            <h4 className="text-2xl font-bold text-orange-900">100+</h4>
            <p className="text-orange-700">Prestasi Diraih</p>
          </div>
        </div>
      </div>
    </section>
  );
}