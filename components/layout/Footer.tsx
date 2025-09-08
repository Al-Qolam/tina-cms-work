import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icon';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  website?: string;
}

interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

interface FooterProps {
  schoolName?: string;
  schoolDescription?: string;
  logo?: {
    src: string;
    alt: string;
  };
  contactInfo?: ContactInfo;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  copyrightText?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: 'Program Pendidikan',
    links: [
      { label: 'Sekolah Dasar', href: '/program-pendidikan#sd' },
      { label: 'SMP', href: '/program-pendidikan#smp' },
      { label: 'SMA', href: '/program-pendidikan#sma' },
      { label: 'Ekstrakurikuler', href: '/program-pendidikan#ekskul' }
    ]
  },
  {
    title: 'Informasi',
    links: [
      { label: 'Profil Sekolah', href: '/profil-sekolah' },
      { label: 'Fasilitas', href: '/fasilitas' },
      { label: 'Tenaga Pengajar', href: '/tenaga-pengajar' },
      { label: 'Tentang Kami', href: '/about' }
    ]
  },
  {
    title: 'Layanan',
    links: [
      { label: 'Pendaftaran PPDB', href: '/pendaftaran' },
      { label: 'Kontak Kami', href: '/galeri-kontak' },
      { label: 'Galeri Kegiatan', href: '/galeri-kontak' },
      { label: 'Berita Sekolah', href: '/posts' }
    ]
  }
];

const defaultContactInfo: ContactInfo = {
  address: 'Jl. Pendidikan No. 123, Jakarta Selatan 12345',
  phone: '021-1234567',
  email: 'info@sekolah.sch.id',
  website: 'www.sekolah.sch.id'
};

const defaultSocialLinks: SocialLink[] = [
  { platform: 'Facebook', href: '#', icon: 'FaFacebookF' },
  { platform: 'Instagram', href: '#', icon: 'AiFillInstagram' },
  { platform: 'YouTube', href: '#', icon: 'FaYoutube' },
  { platform: 'Twitter', href: '#', icon: 'FaXTwitter' }
];

export default function Footer({
  schoolName = 'Ponpes Nurul Ilmi',
  schoolDescription = 'Lembaga pendidikan yang berkomitmen menghasilkan generasi unggul, berkarakter, dan siap menghadapi tantangan masa depan.',
  logo = { src: '/logo.webp', alt: 'Logo Ponpes Nurul Ilmi' },
  contactInfo = defaultContactInfo,
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  copyrightText = 'Sekolah Kami. All rights reserved.'
}: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* School Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo.src} alt={logo.alt} className="h-12 w-auto object-contain" />
              <div>
                <h3 className="text-2xl font-bold">{schoolName}</h3>
                <p className="text-blue-300 text-sm">Pendidikan Berkualitas</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {schoolDescription}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.platform}
                >
                  <Icon data={{ name: social.icon, size: 'small' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-6 text-blue-300">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group"
                    >
                      <Icon 
                        data={{ name: 'BiChevronRight', size: 'xs' }}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-blue-300">
              Hubungi Kami
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Icon 
                  data={{ name: 'BiMapPin', color: 'blue', size: 'small' }} 
                  className="mt-1 flex-shrink-0"
                />
                <p className="text-gray-300">{contactInfo.address}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon data={{ name: 'BiPhone', color: 'blue', size: 'small' }} />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon data={{ name: 'BiMailSend', color: 'blue', size: 'small' }} />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              
              {contactInfo.website && (
                <div className="flex items-center space-x-3">
                  <Icon data={{ name: 'BiGlobe', color: 'blue', size: 'small' }} />
                  <a 
                    href={`https://${contactInfo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {contactInfo.website}
                  </a>
                </div>
              )}
            </div>

            {/* Operating Hours */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h5 className="font-semibold mb-3 text-blue-300">Jam Operasional</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span>07:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span>07:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>Tutup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {copyrightText}
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
              <div className="flex items-center space-x-2">
                <Icon data={{ name: 'BiHeart', color: 'red', size: 'xs' }} />
                <span>Dibuat dengan TinaCMS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}