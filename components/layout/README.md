# Landing Page Components

Kumpulan komponen reusable untuk landing page sekolah yang dapat digunakan di berbagai halaman.

## Komponen Tersedia

### 1. TopBar
Bar informasi di bagian atas dengan kontak dan social media.

```tsx
import { TopBar } from '@/components/layout';

<TopBar
  phone="021-1234567"
  email="info@sekolah.sch.id"
  address="Jl. Pendidikan No. 123"
  socialLinks={{
    facebook: "https://facebook.com/sekolah",
    instagram: "https://instagram.com/sekolah",
    youtube: "https://youtube.com/sekolah"
  }}
/>
```

### 2. NavBar
Navigation bar dengan menu dropdown dan responsive design.

```tsx
import { NavBar } from '@/components/layout';

<NavBar
  logo={{ src: "/logo.png", alt: "Logo Sekolah" }}
  schoolName="Nama Sekolah"
  menuItems={customMenuItems} // Optional, ada default
/>
```

### 3. HeroSlider
Slider hero section dengan multiple slides.

```tsx
import { HeroSlider } from '@/components/layout';

<HeroSlider
  slides={customSlides} // Optional, ada default
  autoPlay={true}
  autoPlayInterval={5000}
/>
```

### 4. AboutSection
Section tentang sekolah dengan features grid.

```tsx
import { AboutSection } from '@/components/layout';

<AboutSection
  title="Tentang Kami"
  description="Deskripsi sekolah..."
  image="/about-image.jpg"
  features={customFeatures} // Optional
  ctaButton={{ label: "Selengkapnya", href: "/about" }}
/>
```

### 5. StatisticsSection
Section statistik dengan animasi counter.

```tsx
import { StatisticsSection } from '@/components/layout';

<StatisticsSection
  title="Prestasi Sekolah"
  statistics={customStats} // Optional
  background="blue" // 'light' | 'dark' | 'blue'
/>
```

### 6. ProgramSection
Section program pendidikan.

```tsx
import { ProgramSection } from '@/components/layout';

<ProgramSection
  title="Program Pendidikan"
  programs={customPrograms} // Optional
  ctaButton={{ label: "Lihat Semua", href: "/programs" }}
/>
```

### 7. CTABanner
Call-to-action banner dengan background options.

```tsx
import { CTABanner } from '@/components/layout';

<CTABanner
  title="Bergabunglah dengan Kami"
  description="Daftar sekarang..."
  buttons={[
    { label: "Daftar", href: "/daftar", style: "primary" },
    { label: "Kontak", href: "/kontak", style: "outline" }
  ]}
  style="gradient" // 'gradient' | 'solid' | 'image'
/>
```

### 8. NewsSection
Section berita dan kegiatan terbaru.

```tsx
import { NewsSection } from '@/components/layout';

<NewsSection
  title="Berita Terbaru"
  news={newsData} // Optional, ada default
  maxItems={4}
  viewAllButton={{ label: "Semua Berita", href: "/berita" }}
/>
```

### 9. Footer
Footer lengkap dengan informasi sekolah.

```tsx
import { Footer } from '@/components/layout';

<Footer
  schoolName="Nama Sekolah"
  schoolDescription="Deskripsi sekolah..."
  contactInfo={contactData}
  sections={footerSections} // Optional
  socialLinks={socialData} // Optional
/>
```

## Penggunaan Complete Landing Page

```tsx
import { LandingPage } from '@/components/layout/LandingPage';

export default function HomePage() {
  return (
    <LandingPage
      // Bisa pass props custom untuk setiap section
      heroProps={{ autoPlay: false }}
      statsProps={{ background: 'dark' }}
      // dll...
    />
  );
}
```

## Atau Penggunaan Individual

```tsx
import {
  TopBar,
  NavBar,
  HeroSlider,
  AboutSection,
  StatisticsSection,
  ProgramSection,
  CTABanner,
  NewsSection,
  Footer
} from '@/components/layout';

export default function CustomPage() {
  return (
    <div>
      <TopBar />
      <NavBar />
      <HeroSlider />
      <AboutSection />
      <StatisticsSection background="blue" />
      <ProgramSection />
      <CTABanner />
      <NewsSection />
      <Footer />
    </div>
  );
}
```

## Features

✅ **Responsive Design** - Semua komponen responsive untuk mobile, tablet, dan desktop
✅ **Customizable** - Bisa dikustomisasi dengan props
✅ **Reusable** - Dapat digunakan di berbagai halaman  
✅ **TypeScript** - Full TypeScript support
✅ **Accessible** - Mengikuti best practices accessibility
✅ **SEO Friendly** - Struktur HTML yang SEO friendly
✅ **Performance Optimized** - Menggunakan Next.js optimizations
✅ **Animation** - Smooth animations dan transitions
✅ **Icon System** - Konsisten dengan sistem icon yang ada

## Customization

Setiap komponen memiliki props default yang bisa di-override sesuai kebutuhan. Lihat interface masing-masing komponen untuk detail props yang tersedia.