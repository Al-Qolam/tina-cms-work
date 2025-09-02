import type { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { featureBlockSchema } from '@/components/blocks/features';
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { statsBlockSchema } from '@/components/blocks/stats';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';

// New landing page block schemas
import { heroSliderBlockSchema } from '@/components/blocks/hero-slider';
import { aboutSectionBlockSchema } from '@/components/blocks/about-section';
import { statisticsSectionBlockSchema } from '@/components/blocks/statistics-section';
import { programSectionBlockSchema } from '@/components/blocks/program-section';
import { ctaBannerBlockSchema } from '@/components/blocks/cta-banner';
import { newsSectionBlockSchema } from '@/components/blocks/news-section';

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
        // Existing blocks
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        // New landing page blocks (testing one by one)
        // heroSliderBlockSchema,
        aboutSectionBlockSchema,
      ],
    },
  ],
};

export default Page;
