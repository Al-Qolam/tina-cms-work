import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icon';

interface AboutFeature {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  features?: AboutFeature[];
  ctaButton?: {
    label: string;
    href: string;
  };
}

const defaultFeatures: AboutFeature[] = [
  {
    icon: 'BiAward',
    title: 'Akreditasi A',
    description: 'Terakreditasi A dari BAN-S/M dengan standar pendidikan tinggi',
    color: 'blue'
  },
  {
    icon: 'BiGroup',
    title: 'Tenaga Pengajar Profesional',
    description: '50+ guru berpengalaman dan berkualitas',
    color: 'green'
  },
  {
    icon: 'BiTrendingUp',
    title: 'Prestasi Membanggakan',
    description: 'Berbagai penghargaan tingkat daerah dan nasional',
    color: 'orange'
  },
  {
    icon: 'BiHeart',
    title: 'Pendekatan Personal',
    description: 'Perhatian individual untuk setiap siswa',
    color: 'red'
  }
];

export default function AboutSection({
  title = "Tentang Sekolah Kami",
  subtitle = "Membangun Generasi Unggul",
  description = "Sekolah kami telah berdedikasi dalam dunia pendidikan selama lebih dari 35 tahun. Dengan komitmen untuk memberikan pendidikan berkualitas, kami terus berinovasi dalam metode pembelajaran dan pengembangan karakter siswa.",
  image = "/uploads/about-school.jpg",
  features = defaultFeatures,
  ctaButton = { label: "Selengkapnya", href: "/profil-sekolah" }
}: AboutSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h3 className="text-blue-600 text-lg font-semibold mb-2">
                {subtitle}
              </h3>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Icon 
                      data={{ 
                        name: feature.icon, 
                        color: feature.color || 'blue',
                        style: 'circle',
                        size: 'medium'
                      }} 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {ctaButton && (
              <Link
                href={ctaButton.href}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                <span>{ctaButton.label}</span>
                <Icon data={{ name: 'BiChevronRight', size: 'small' }} />
              </Link>
            )}
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src={image}
                alt="Tentang Sekolah"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
              />
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Icon 
                      data={{ 
                        name: 'BiTime', 
                        color: 'blue',
                        size: 'medium'
                      }} 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-2xl">35+</h4>
                    <p className="text-gray-600">Tahun Pengalaman</p>
                  </div>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="absolute -top-6 -right-6 bg-orange-500 text-white p-4 rounded-xl shadow-lg text-center">
                <Icon 
                  data={{ 
                    name: 'BiTrophy', 
                    color: 'white',
                    size: 'medium'
                  }}
                  className="mx-auto mb-2" 
                />
                <p className="font-bold">50+</p>
                <p className="text-xs">Penghargaan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}