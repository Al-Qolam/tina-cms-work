'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icon';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface NavBarProps {
  logo?: {
    src: string;
    alt: string;
  };
  schoolName?: string;
  menuItems?: NavItem[];
}

const defaultMenuItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { 
    label: 'Profil', 
    href: '/profil-sekolah',
    children: [
      { label: 'Profil Sekolah', href: '/profil-sekolah' },
      { label: 'Tenaga Pengajar', href: '/tenaga-pengajar' },
      { label: 'Tentang Kami', href: '/about' }
    ]
  },
  { 
    label: 'Pendidikan',
    href: '/program-pendidikan',
    children: [
      { label: 'Program Pendidikan', href: '/program-pendidikan' },
      { label: 'Fasilitas', href: '/fasilitas' }
    ]
  },
  { label: 'Pendaftaran', href: '/pendaftaran' },
  { label: 'Kontak', href: '/galeri-kontak' }
];

export default function NavBar({ 
  logo = { src: '/logo.webp', alt: 'Logo Ponpes Nurul Ilmi' },
  schoolName = "Ponpes Nurul Ilmi",
  menuItems = defaultMenuItems
}: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and School Name */}
          <Link href="/" className="flex items-center space-x-3">
            <img src={logo.src} alt={logo.alt} className="h-10 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">{schoolName}</span>
              <span className="text-xs text-gray-600">Pendidikan Berkualitas</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.children ? (
                  <div
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary cursor-pointer py-2"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className="font-medium">{item.label}</span>
                    <Icon data={{ name: 'BiChevronDown', size: 'xs' }} />
                    
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border py-2">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-accent/20 hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-primary font-medium py-2 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/pendaftaran"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors font-medium"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon
              data={{
                name: isMobileMenuOpen ? 'BiX' : 'BiMenu',
                size: 'medium',
                color: 'primary'
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 mt-4">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.children ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      >
                        <span className="font-medium">{item.label}</span>
                        <Icon 
                          data={{ 
                            name: activeDropdown === item.label ? 'BiChevronUp' : 'BiChevronDown', 
                            size: 'xs' 
                          }} 
                        />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="bg-gray-50">
                          {item.children.map((child, childIndex) => (
                            <Link
                              key={childIndex}
                              href={child.href}
                              className="block px-8 py-2 text-gray-600 hover:text-primary"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-4 pt-2">
                <Link
                  href="/pendaftaran"
                  className="block w-full text-center bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}