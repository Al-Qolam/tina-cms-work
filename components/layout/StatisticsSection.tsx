'use client';
import React, { useState, useEffect } from 'react';
import { Icon } from '@/components/icon';

interface Statistic {
  icon: string;
  value: string | number;
  label: string;
  color?: string;
  prefix?: string;
  suffix?: string;
}

interface StatisticsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  statistics?: Statistic[];
  background?: 'light' | 'dark' | 'blue';
}

const defaultStatistics: Statistic[] = [
  {
    icon: 'BiGroup',
    value: 500,
    label: 'Siswa Aktif',
    color: 'blue',
    suffix: '+'
  },
  {
    icon: 'BiUser',
    value: 50,
    label: 'Tenaga Pengajar',
    color: 'green',
    suffix: '+'
  },
  {
    icon: 'BiTrophy',
    value: 95,
    label: 'Tingkat Kelulusan',
    color: 'orange',
    suffix: '%'
  },
  {
    icon: 'BiAward',
    value: 'A',
    label: 'Akreditasi',
    color: 'red'
  }
];

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

function StatCard({ stat, index }: { stat: Statistic; index: number }) {
  const isNumber = typeof stat.value === 'number';
  const numericValue = isNumber ? stat.value : 0;
  const { count, setIsVisible } = useCounter(numericValue);

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
    <div id={`stat-${index}`} className="text-center group">
      <div className="mb-4">
        <Icon 
          data={{ 
            name: stat.icon, 
            color: stat.color || 'blue',
            style: 'circle',
            size: 'xl'
          }}
          className="mx-auto group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="mb-2">
        <span className="text-4xl lg:text-5xl font-bold text-gray-900">
          {stat.prefix}{displayValue}{stat.suffix}
        </span>
      </div>
      <p className="text-gray-600 font-medium text-lg">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatisticsSection({
  title = "Prestasi Sekolah",
  subtitle = "Pencapaian Membanggakan",
  description = "Sekolah kami bangga dengan berbagai prestasi yang telah diraih dalam bidang akademik maupun non-akademik.",
  statistics = defaultStatistics,
  background = 'light'
}: StatisticsSectionProps) {
  const backgroundClasses = {
    light: 'bg-white',
    dark: 'bg-gray-900',
    blue: 'bg-blue-900'
  };

  const textClasses = {
    light: 'text-gray-900',
    dark: 'text-white',
    blue: 'text-white'
  };

  const subtitleClasses = {
    light: 'text-blue-600',
    dark: 'text-blue-400',
    blue: 'text-blue-200'
  };

  const descriptionClasses = {
    light: 'text-gray-700',
    dark: 'text-gray-300',
    blue: 'text-blue-100'
  };

  return (
    <section className={`py-20 ${backgroundClasses[background]}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className={`text-lg font-semibold mb-2 ${subtitleClasses[background]}`}>
            {subtitle}
          </h3>
          <h2 className={`text-4xl font-bold mb-6 ${textClasses[background]}`}>
            {title}
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${descriptionClasses[background]}`}>
            {description}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {statistics.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        {background === 'blue' && (
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
      </div>
    </section>
  );
}