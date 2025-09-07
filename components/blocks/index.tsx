import { Page, PageBlocks } from "../../tina/__generated__/types";

import { AboutSection } from "./about-section";
import { ArticleCards } from "./article-cards";
import { ArticleFeatured } from "./article-featured";
import { CTABanner } from "./cta-banner";
import { CallToAction } from "./call-to-action";
import { Callout } from "./callout";
import { Content } from "./content";
import { Curriculum } from "./curriculum";
import { EducationCosts } from "./education-costs";
import { FAQ } from "./faq";
import { Features } from "./features";
import { GalleryFeatured } from "./gallery-featured";
import { GalleryGrid } from "./gallery-grid";
import { GalleryMasonry } from "./gallery-masonry";
import { Hero } from "./hero";
import { HeroSlider } from "./hero-slider";
import { MarkdownArticle } from "./markdown-article";
import { MegaMenu } from "./mega-menu";
import { NewsSection } from "./news-section";
import { ProgramSection } from "./program-section";
import { RegistrationFlow } from "./registration-flow";
import { RichContent } from "./rich-content";
import { StaffCards } from "./staff-cards";
import { StaffFeatured } from "./staff-featured";
import { StatisticsSection } from "./statistics-section";
import { Stats } from "./stats";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { tinaField } from "tinacms/dist/react";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksStats":
      return <Stats data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    // New landing page blocks
    case "PageBlocksHeroSlider":
      return <HeroSlider data={block} />;
    case "PageBlocksAboutSection":
      return <AboutSection data={block} />;
    case "PageBlocksStatisticsSection":
      return <StatisticsSection data={block} />;
    case "PageBlocksProgramSection":
      return <ProgramSection data={block} />;
    case "PageBlocksCtaBanner":
      return <CTABanner data={block} />;
    case "PageBlocksNewsSection":
      return <NewsSection data={block} />;
    case "PageBlocksEducationCosts":
      return <EducationCosts data={block} />;
    case "PageBlocksRegistrationFlow":
      return <RegistrationFlow data={block} />;
    case "PageBlocksGalleryGrid":
      return <GalleryGrid data={block} />;
    case "PageBlocksGalleryMasonry":
      return <GalleryMasonry data={block} />;
    case "PageBlocksGalleryFeatured":
      return <GalleryFeatured data={block} />;
    case "PageBlocksArticleFeatured":
      return <ArticleFeatured data={block} />;
    case "PageBlocksArticleCards":
      return <ArticleCards data={block} />;
    case "PageBlocksStaffCards":
      return <StaffCards data={block} />;
    case "PageBlocksStaffFeatured":
      return <StaffFeatured data={block} />;
    case "PageBlocksFaq":
      return <FAQ data={block} />;
    case "PageBlocksRichContent":
      return <RichContent data={block} />;
    case "PageBlocksMarkdownArticle":
      return <MarkdownArticle data={block} />;
    case "PageBlocksMegaMenu":
      return <MegaMenu data={block} />;
    case "PageBlocksCurriculum":
      return <Curriculum data={block} />;
    default:
      return null;
  }
};
