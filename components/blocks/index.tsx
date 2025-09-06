import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { Callout } from "./callout";
import { Stats } from "./stats";
import { CallToAction } from "./call-to-action";
import { EducationCosts } from "./education-costs";
import { RegistrationFlow } from "./registration-flow";

// New landing page blocks
import { HeroSlider } from "./hero-slider";
import { AboutSection } from "./about-section";
import { StatisticsSection } from "./statistics-section";
import { ProgramSection } from "./program-section";
import { CTABanner } from "./cta-banner";
import { NewsSection } from "./news-section";

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
    default:
      return null;
  }
};
