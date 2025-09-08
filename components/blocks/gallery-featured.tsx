"use client";
import {
  PageBlocksGalleryFeatured,
  PageBlocksGalleryFeaturedThumbnails,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { useState } from 'react';

export const GalleryFeatured = ({ data }: { data: PageBlocksGalleryFeatured }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const thumbnails = data.thumbnails || [];
  const allImages = [
    {
      url: data.featuredImageUrl,
      alt: data.featuredImageAlt,
      caption: data.featuredImageCaption,
    },
    ...thumbnails,
  ];

  const currentImage = allImages[selectedImage];

  const gapClass = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
    xlarge: "gap-8",
  };

  const gap = data.thumbnailGap || "medium";
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

        <div className={`grid ${gridGap}`}>
          {/* Featured Image Section */}
          <div className="relative group">
            <div 
              className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
              data-tina-field={tinaField(data, 'featuredImageUrl')}
            >
              {currentImage.url ? (
                <img
                  src={currentImage.url}
                  alt={currentImage.alt || "Featured gallery image"}
                  className="img-featured transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <svg
                    className="w-20 h-20"
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
              
              {currentImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
                  <p className="text-white text-lg font-medium">
                    {currentImage.caption}
                  </p>
                </div>
              )}

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % allImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Thumbnails Grid */}
          {thumbnails.length > 0 && (
            <div className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ${gridGap}`}>
              <ThumbnailItem
                url={data.featuredImageUrl}
                alt={data.featuredImageAlt}
                isSelected={selectedImage === 0}
                onClick={() => setSelectedImage(0)}
                index={0}
              />
              {thumbnails.map((thumbnail, i) => (
                <ThumbnailItem
                  key={i}
                  {...thumbnail!}
                  isSelected={selectedImage === i + 1}
                  onClick={() => setSelectedImage(i + 1)}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

interface ThumbnailItemProps extends Partial<PageBlocksGalleryFeaturedThumbnails> {
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export const ThumbnailItem: React.FC<ThumbnailItemProps> = (data) => {
  const { isSelected, onClick, index } = data;

  return (
    <button
      onClick={onClick}
      className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900' 
          : 'hover:opacity-80'
      }`}
      aria-label={`View image ${index + 1}`}
    >
      <div className="relative h-full w-full bg-gray-100 dark:bg-gray-800">
        {data.url ? (
          <img
            src={data.url}
            alt={data.alt || `Thumbnail ${index + 1}`}
            className="img-gallery"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <svg
              className="w-8 h-8"
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
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20" />
        )}
      </div>
    </button>
  );
};

const defaultThumbnail = {
  url: "",
  alt: "Gallery thumbnail",
  caption: "",
};

export const galleryFeaturedBlockSchema: Template = {
  name: "galleryFeatured",
  label: "Gallery Featured",
  ui: {
    previewSrc: "/blocks/gallery-featured.png",
    defaultItem: {
      title: "Featured Gallery",
      subtitle: "Click on thumbnails to view larger images",
      featuredImageUrl: "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
      featuredImageAlt: "Featured image",
      featuredImageCaption: "Beautiful landscape photography",
      thumbnailGap: "medium",
      thumbnails: [
        {
          url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
          alt: "Gallery image 1",
          caption: "Mountain sunrise",
        },
        {
          url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
          alt: "Gallery image 2",
          caption: "Forest pathway",
        },
        {
          url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
          alt: "Gallery image 3",
          caption: "Ocean waves",
        },
        {
          url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
          alt: "Gallery image 4",
          caption: "Desert dunes",
        },
        {
          url: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
          alt: "Gallery image 5",
          caption: "City lights",
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
      type: "image" as const,
      label: "Featured Image URL",
      name: "featuredImageUrl",
      description: "The main large image displayed at the top",
    },
    {
      type: "string" as const,
      label: "Featured Image Alt Text",
      name: "featuredImageAlt",
    },
    {
      type: "string" as const,
      label: "Featured Image Caption",
      name: "featuredImageCaption",
    },
    {
      type: "string" as const,
      label: "Thumbnail Gap Size",
      name: "thumbnailGap",
      options: ["small", "medium", "large", "xlarge"],
      description: "Space between thumbnail images",
    },
    {
      type: "object" as const,
      label: "Thumbnails",
      name: "thumbnails",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.alt || item?.caption || "Thumbnail",
          };
        },
        defaultItem: {
          ...defaultThumbnail,
        },
      },
      fields: [
        {
          type: "image" as const,
          label: "Thumbnail URL",
          name: "url",
          description: "Upload or provide URL for the thumbnail",
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
          description: "Caption shown when this image is featured",
        },
      ],
    },
  ],
};