import type { Collection } from 'tinacms';
import { aboutSectionBlockSchema } from '@/components/blocks/about-section';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { contentBlockSchema } from '@/components/blocks/content';
import { ctaBannerBlockSchema } from '@/components/blocks/cta-banner';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';
import { educationCostsBlockSchema } from '@/components/blocks/education-costs';
import { featureBlockSchema } from '@/components/blocks/features';
import { galleryFeaturedBlockSchema } from '@/components/blocks/gallery-featured';
import { galleryGridBlockSchema } from '@/components/blocks/gallery-grid';
import { galleryMasonryBlockSchema } from '@/components/blocks/gallery-masonry';
import { heroBlockSchema } from '@/components/blocks/hero';
import { heroSliderBlockSchema } from '@/components/blocks/hero-slider';
import { newsSectionBlockSchema } from '@/components/blocks/news-section';
import { programSectionBlockSchema } from '@/components/blocks/program-section';
import { registrationFlowBlockSchema } from '@/components/blocks/registration-flow';
import { statisticsSectionBlockSchema } from '@/components/blocks/statistics-section';
import { statsBlockSchema } from '@/components/blocks/stats';
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { videoBlockSchema } from '@/components/blocks/video';

// New landing page block schemas







const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') {
        return '/';
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        heroSliderBlockSchema,
        aboutSectionBlockSchema,
        statisticsSectionBlockSchema,
        programSectionBlockSchema,
        ctaBannerBlockSchema,
        newsSectionBlockSchema,
        educationCostsBlockSchema,
        registrationFlowBlockSchema,
        galleryGridBlockSchema,
        galleryMasonryBlockSchema,
        galleryFeaturedBlockSchema,
      ],
    },
  ],
};

export default Page;
