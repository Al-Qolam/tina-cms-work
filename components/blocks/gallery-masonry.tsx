"use client";
import {
  PageBlocksGalleryMasonry,
  PageBlocksGalleryMasonryImages,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';

export const GalleryMasonry = ({ data }: { data: PageBlocksGalleryMasonry }) => {
  const columnsClass = {
    "2": "columns-2",
    "3": "columns-2 md:columns-3",
    "4": "columns-2 md:columns-3 lg:columns-4",
    "5": "columns-2 md:columns-3 lg:columns-5",
    "6": "columns-2 md:columns-3 lg:columns-4 xl:columns-6",
  };

  const gapClass = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
    xlarge: "gap-8",
  };

  const columns = data.columns || "3";
  const gap = data.gap || "medium";
  const masonryColumns = columnsClass[columns as keyof typeof columnsClass] || columnsClass["3"];
  const masonryGap = gapClass[gap as keyof typeof gapClass] || gapClass.medium;

  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-7xl px-6">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-8 md:mb-12">
            {data.title && (
              <h2 
                data-tina-field={tinaField(data, 'title')} 
                className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4"
              >
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p 
                data-tina-field={tinaField(data, 'subtitle')}
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
              >
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`${masonryColumns} ${masonryGap}`}>
          {data.images &&
            data.images.map((image, i) => (
              <MasonryItem key={i} {...image!} index={i} gap={gap} />
            ))}
        </div>
      </div>
    </Section>
  );
};

export const MasonryItem: React.FC<PageBlocksGalleryMasonryImages & { index: number; gap: string }> = (data) => {
  const { index, gap } = data;
  
  const marginClass = {
    small: "mb-2",
    medium: "mb-4",
    large: "mb-6",
    xlarge: "mb-8",
  };

  const cornerRadius = {
    none: "",
    small: "rounded",
    medium: "rounded-lg",
    large: "rounded-xl",
    full: "rounded-2xl",
  };

  const aspectRatios = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    tall: "aspect-[2/3]",
    wide: "aspect-[16/9]",
  };

  const radius = data.cornerRadius || "medium";
  const radiusClass = cornerRadius[radius as keyof typeof cornerRadius] || cornerRadius.medium;
  const marginBottom = marginClass[gap as keyof typeof marginClass] || marginClass.medium;
  const aspectRatio = data.aspectRatio || "auto";
  const aspectClass = aspectRatios[aspectRatio as keyof typeof aspectRatios] || "";

  return (
    <div 
      className={`inline-block w-full ${marginBottom} break-inside-avoid`}
      data-tina-field={tinaField(data, "url")}
    >
      <div className={`relative overflow-hidden group ${aspectClass}`}>
        <div className={`relative ${radiusClass} overflow-hidden bg-gray-100 dark:bg-gray-800 ${!aspectClass ? 'h-auto' : 'h-full'}`}>
          {data.url ? (
            <img
              src={data.url}
              alt={data.alt || `Gallery image ${index + 1}`}
              className={`${aspectClass ? 'img-gallery' : 'img-content'} transition-transform duration-300 group-hover:scale-105 ${radiusClass}`}
              loading="lazy"
            />
          ) : (
            <div className={`flex items-center justify-center ${aspectClass ? 'h-full' : 'h-64'} text-muted-foreground`}>
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          
          {(data.caption || data.photographer) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {data.caption && (
                  <p 
                    data-tina-field={tinaField(data, "caption")}
                    className="text-white text-sm font-medium mb-1"
                  >
                    {data.caption}
                  </p>
                )}
                {data.photographer && (
                  <p 
                    data-tina-field={tinaField(data, "photographer")}
                    className="text-white/80 text-xs"
                  >
                    by {data.photographer}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const defaultImage = {
  url: "",
  alt: "Gallery image",
  caption: "",
  photographer: "",
  cornerRadius: "medium",
  aspectRatio: "auto",
};

export const galleryMasonryBlockSchema: Template = {
  name: "galleryMasonry",
  label: "Gallery Masonry",
  ui: {
    previewSrc: "/blocks/gallery-masonry.png",
    defaultItem: {
      title: "Gallery Showcase",
      subtitle: "A beautiful masonry layout for your images",
      columns: "3",
      gap: "medium",
      images: [
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688025668.png",
          alt: "Gallery image 1",
          aspectRatio: "portrait",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029344.png",
          alt: "Gallery image 2",
          aspectRatio: "square",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029370.png",
          alt: "Gallery image 3",
          aspectRatio: "auto",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029384.png",
          alt: "Gallery image 4",
          aspectRatio: "tall",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029394.png",
          alt: "Gallery image 5",
          aspectRatio: "square",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029408.png",
          alt: "Gallery image 6",
          aspectRatio: "wide",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029424.jpg",
          alt: "Gallery image 7",
          aspectRatio: "portrait",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029434.png",
          alt: "Gallery image 8",
          aspectRatio: "auto",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029447.jpg",
          alt: "Gallery image 9",
          aspectRatio: "square",
        },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string" as const,
      label: "Title",
      name: "title",
    },
    {
      type: "string" as const,
      label: "Subtitle",
      name: "subtitle",
    },
    {
      type: "string" as const,
      label: "Columns",
      name: "columns",
      options: ["2", "3", "4", "5", "6"],
      description: "Number of masonry columns (responsive)",
    },
    {
      type: "string" as const,
      label: "Gap Size",
      name: "gap",
      options: ["small", "medium", "large", "xlarge"],
      description: "Space between images",
    },
    {
      type: "object" as const,
      label: "Images",
      name: "images",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.alt || item?.caption || "Image",
          };
        },
        defaultItem: {
          ...defaultImage,
        },
      },
      fields: [
        {
          type: "image" as const,
          label: "Image URL",
          name: "url",
          description: "Upload or provide URL for the image",
        },
        {
          type: "string" as const,
          label: "Alt Text",
          name: "alt",
          description: "Alternative text for accessibility",
        },
        {
          type: "string" as const,
          label: "Caption",
          name: "caption",
          description: "Caption shown on hover (optional)",
        },
        {
          type: "string" as const,
          label: "Photographer",
          name: "photographer",
          description: "Photo credit (optional)",
        },
        {
          type: "string" as const,
          label: "Aspect Ratio",
          name: "aspectRatio",
          options: ["auto", "square", "video", "portrait", "tall", "wide"],
          description: "Control image aspect ratio in masonry",
        },
        {
          type: "string" as const,
          label: "Corner Radius",
          name: "cornerRadius",
          options: ["none", "small", "medium", "large", "full"],
          description: "Roundness of image corners",
        },
      ],
    },
  ],
};