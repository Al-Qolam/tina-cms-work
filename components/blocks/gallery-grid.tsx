"use client";
import {
  PageBlocksGalleryGrid,
  PageBlocksGalleryGridImages,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import Image from "next/image";

export const GalleryGrid = ({ data }: { data: PageBlocksGalleryGrid }) => {
  const columnsClass = {
    "2": "grid-cols-2",
    "3": "grid-cols-2 md:grid-cols-3",
    "4": "grid-cols-2 md:grid-cols-4",
    "5": "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    "6": "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  const gapClass = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
    xlarge: "gap-8",
  };

  const columns = data.columns || "3";
  const gap = data.gap || "medium";
  const gridColumns = columnsClass[columns as keyof typeof columnsClass] || columnsClass["3"];
  const gridGap = gapClass[gap as keyof typeof gapClass] || gapClass.medium;

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

        <div className={`grid ${gridColumns} ${gridGap}`}>
          {data.images &&
            data.images.map((image, i) => (
              <GalleryItem key={i} {...image!} index={i} />
            ))}
        </div>
      </div>
    </Section>
  );
};

export const GalleryItem: React.FC<PageBlocksGalleryGridImages & { index: number }> = (data) => {
  const { index } = data;
  const cornerRadius = {
    none: "",
    small: "rounded",
    medium: "rounded-lg",
    large: "rounded-xl",
    full: "rounded-2xl",
  };

  const radius = data.cornerRadius || "medium";
  const radiusClass = cornerRadius[radius as keyof typeof cornerRadius] || cornerRadius.medium;

  return (
    <div 
      className="relative overflow-hidden group"
      data-tina-field={tinaField(data, "url")}
    >
      <div className={`relative aspect-square ${radiusClass} overflow-hidden bg-gray-100 dark:bg-gray-800`}>
        {data.url ? (
          <img
            src={data.url}
            alt={data.alt || `Gallery image ${index + 1}`}
            className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${radiusClass}`}
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
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
        
        {data.caption && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p 
                data-tina-field={tinaField(data, "caption")}
                className="text-white text-sm font-medium"
              >
                {data.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const defaultImage = {
  url: "",
  alt: "Gallery image",
  caption: "",
  cornerRadius: "medium",
};

export const galleryGridBlockSchema: Template = {
  name: "galleryGrid",
  label: "Gallery Grid",
  ui: {
    previewSrc: "/blocks/gallery-grid.png",
    defaultItem: {
      title: "Our Gallery",
      subtitle: "Explore our collection of memorable moments",
      columns: "3",
      gap: "medium",
      images: [
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688025668.png",
          alt: "Gallery image 1",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029344.png",
          alt: "Gallery image 2",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029370.png",
          alt: "Gallery image 3",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029384.png",
          alt: "Gallery image 4",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029394.png",
          alt: "Gallery image 5",
        },
        {
          ...defaultImage,
          url: "https://pagedone.io/asset/uploads/1688029408.png",
          alt: "Gallery image 6",
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
      description: "Number of columns in the grid (responsive)",
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
          label: "Corner Radius",
          name: "cornerRadius",
          options: ["none", "small", "medium", "large", "full"],
          description: "Roundness of image corners",
        },
      ],
    },
  ],
};