import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icon';

interface CTAButton {
  label: string;
  href: string;
  style?: 'primary' | 'secondary' | 'outline';
}

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttons?: CTAButton[];
  backgroundImage?: string;
  overlay?: boolean;
  style?: 'gradient' | 'solid' | 'image';
  backgroundColor?: string;
}

export default function CTABanner({
  title = "Bergabunglah dengan Keluarga Besar Kami",
  subtitle = "Daftar Sekarang",
  description = "Jadilah bagian dari sekolah yang telah mencetak generasi unggul selama puluhan tahun. Daftar sekarang dan rasakan pengalaman pendidikan yang berkualitas.",
  buttons = [
    { label: "Daftar PPDB", href: "/pendaftaran", style: "primary" },
    { label: "Hubungi Kami", href: "/galeri-kontak", style: "outline" }
  ],
  backgroundImage = "/uploads/cta-bg.jpg",
  overlay = true,
  style = "gradient",
  backgroundColor = "blue"
}: CTABannerProps) {
  const getBackgroundClasses = () => {
    switch (style) {
      case 'gradient':
        return 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900';
      case 'image':
        return `bg-cover bg-center bg-no-repeat`;
      case 'solid':
      default:
        return `bg-${backgroundColor}-900`;
    }
  };

  const getButtonClasses = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case 'primary':
        return 'bg-white text-blue-900 hover:bg-gray-100';
      case 'secondary':
        return 'bg-blue-700 text-white hover:bg-blue-800';
      case 'outline':
      default:
        return 'border-2 border-white text-white hover:bg-white hover:text-blue-900';
    }
  };

  return (
    <section 
      className={`relative py-20 ${getBackgroundClasses()}`}
      style={style === 'image' ? { backgroundImage: `url(${backgroundImage})` } : {}}
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
            <span className="inline-flex items-center space-x-2 bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
              <Icon data={{ name: 'BiStar', size: 'xs' }} />
              <span>{subtitle}</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
            {title}
          </h2>

          {/* Description */}
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${getButtonClasses(button.style)}`}
              >
                <span>{button.label}</span>
                <Icon 
                  data={{ 
                    name: 'BiChevronRight', 
                    size: 'small'
                  }} 
                />
              </Link>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <Icon data={{ name: 'BiCheck', size: 'small' }} />
              <span>Proses Mudah dan Cepat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon data={{ name: 'BiTime', size: 'small' }} />
              <span>Pendaftaran Dibuka Setiap Hari</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon data={{ name: 'BiSupport', size: 'small' }} />
              <span>Tim Support Siap Membantu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-white opacity-20">
        <Icon data={{ name: 'BiBook', size: 'xl' }} />
      </div>
      <div className="absolute bottom-10 right-10 text-white opacity-20">
        <Icon data={{ name: 'BiGraduate', size: 'xl' }} />
      </div>
      
      {/* Floating shapes */}
      <div className="absolute top-20 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-10 w-8 h-8 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}