import React from 'react';
import { Icon } from '@/components/icon';

interface TopBarProps {
  phone?: string;
  email?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

export default function TopBar({ 
  phone = "021-1234567", 
  email = "info@sekolah.sch.id", 
  address = "Jl. Pendidikan No. 123, Jakarta",
  socialLinks = {}
}: TopBarProps) {
  return (
    <div className="bg-blue-900 text-white py-2 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Icon 
                data={{ name: 'BiPhone', color: 'white', size: 'xs' }} 
                className="text-blue-200" 
              />
              <span>{phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                data={{ name: 'BiMailSend', color: 'white', size: 'xs' }} 
                className="text-blue-200" 
              />
              <span>{email}</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Icon 
                data={{ name: 'BiMapPin', color: 'white', size: 'xs' }} 
                className="text-blue-200" 
              />
              <span>{address}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            {socialLinks.facebook && (
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Icon data={{ name: 'FaFacebookF', size: 'xs' }} />
              </a>
            )}
            {socialLinks.instagram && (
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Icon data={{ name: 'AiFillInstagram', size: 'xs' }} />
              </a>
            )}
            {socialLinks.youtube && (
              <a 
                href={socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Icon data={{ name: 'FaYoutube', size: 'xs' }} />
              </a>
            )}
            <div className="flex items-center space-x-2 text-xs">
              <Icon 
                data={{ name: 'BiTime', color: 'white', size: 'xs' }} 
                className="text-blue-200" 
              />
              <span>Sen - Jum: 07:00 - 15:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}