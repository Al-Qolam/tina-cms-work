import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icon';

interface Program {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
  color: string;
  href?: string;
}

interface ProgramSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  programs?: Program[];
  ctaButton?: {
    label: string;
    href: string;
  };
}

const defaultPrograms: Program[] = [
  {
    id: 1,
    title: 'Sekolah Dasar (SD)',
    description: 'Program pendidikan dasar dengan fokus pada literasi, numerasi, dan pembentukan karakter.',
    icon: 'BiChild',
    features: ['Kelas 1-6', 'Kurikulum Nasional', 'Kegiatan Ekstrakurikuler', 'Pendekatan Pembelajaran Aktif'],
    image: '/uploads/program-sd.jpg',
    color: 'blue',
    href: '/program-pendidikan#sd'
  },
  {
    id: 2,
    title: 'Sekolah Menengah Pertama (SMP)',
    description: 'Pendidikan menengah pertama dengan kurikulum komprehensif dan pengembangan minat bakat.',
    icon: 'BiBook',
    features: ['Kelas 7-9', 'Mata Pelajaran Lengkap', 'Laboratorium Modern', 'Program Unggulan'],
    image: '/uploads/program-smp.jpg',
    color: 'green',
    href: '/program-pendidikan#smp'
  },
  {
    id: 3,
    title: 'Sekolah Menengah Atas (SMA)',
    description: 'Program pendidikan menengah atas dengan peminatan sesuai minat dan bakat siswa.',
    icon: 'BiGraduate',
    features: ['Kelas 10-12', 'Peminatan IPA/IPS/Bahasa', 'Persiapan PTN', 'Beasiswa Prestasi'],
    image: '/uploads/program-sma.jpg',
    color: 'orange',
    href: '/program-pendidikan#sma'
  }
];

export default function ProgramSection({
  title = "Program Pendidikan",
  subtitle = "Jenjang Pendidikan Lengkap",
  description = "Kami menyediakan program pendidikan dari tingkat dasar hingga menengah atas dengan kurikulum berkualitas dan fasilitas lengkap.",
  programs = defaultPrograms,
  ctaButton = { label: "Lihat Semua Program", href: "/program-pendidikan" }
}: ProgramSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
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

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Icon 
                    data={{ 
                      name: program.icon, 
                      color: program.color,
                      style: 'circle',
                      size: 'large'
                    }}
                    className="bg-white/90"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {program.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <Icon 
                        data={{ 
                          name: 'BiCheck', 
                          color: program.color,
                          size: 'small'
                        }} 
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Link */}
                {program.href && (
                  <Link
                    href={program.href}
                    className={`inline-flex items-center space-x-2 text-${program.color}-600 hover:text-${program.color}-700 font-medium transition-colors group`}
                  >
                    <span>Pelajari Lebih Lanjut</span>
                    <Icon 
                      data={{ 
                        name: 'BiChevronRight', 
                        color: program.color,
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: 'BiFootball', title: 'Ekstrakurikuler', desc: '15+ Pilihan', color: 'green' },
            { icon: 'BiDesktop', title: 'Lab Komputer', desc: 'Teknologi Terkini', color: 'blue' },
            { icon: 'BiBook', title: 'Perpustakaan', desc: '5000+ Koleksi', color: 'purple' },
            { icon: 'BiTrophy', title: 'Prestasi', desc: '50+ Penghargaan', color: 'orange' }
          ].map((item, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Icon 
                data={{ 
                  name: item.icon, 
                  color: item.color,
                  style: 'circle',
                  size: 'large'
                }}
                className="mx-auto mb-3"
              />
              <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {ctaButton && (
          <div className="text-center">
            <Link
              href={ctaButton.href}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-colors text-lg"
            >
              <span>{ctaButton.label}</span>
              <Icon data={{ name: 'BiChevronRight', size: 'small' }} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}