"use client";
import {
  PageBlocksArticleFeatured,
  PageBlocksArticleFeaturedSideArticles,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { Badge } from "../ui/badge";
import Link from "next/link";

export const ArticleFeatured = ({ data }: { data: PageBlocksArticleFeatured }) => {
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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured Article - Left Side */}
          <div className="group">
            <article className="relative h-full overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-shadow duration-300">
              {data.featuredImage && (
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800"
                  data-tina-field={tinaField(data, 'featuredImage')}
                >
                  <img
                    src={data.featuredImage}
                    alt={data.featuredImageAlt || "Featured article"}
                    className="img-featured transition-transform duration-300 group-hover:scale-105"
                  />
                  {data.featuredCategory && (
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant="secondary" 
                        className="bg-background/90 backdrop-blur-sm"
                        data-tina-field={tinaField(data, 'featuredCategory')}
                      >
                        {data.featuredCategory}
                      </Badge>
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  {data.featuredAuthor && (
                    <span data-tina-field={tinaField(data, 'featuredAuthor')}>
                      {data.featuredAuthor}
                    </span>
                  )}
                  {data.featuredDate && (
                    <>
                      {data.featuredAuthor && <span>•</span>}
                      <time data-tina-field={tinaField(data, 'featuredDate')}>
                        {data.featuredDate}
                      </time>
                    </>
                  )}
                  {data.featuredReadTime && (
                    <>
                      <span>•</span>
                      <span data-tina-field={tinaField(data, 'featuredReadTime')}>
                        {data.featuredReadTime}
                      </span>
                    </>
                  )}
                </div>

                <h3 
                  className="text-2xl lg:text-3xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors"
                  data-tina-field={tinaField(data, 'featuredTitle')}
                >
                  {data.featuredLink ? (
                    <Link href={data.featuredLink} className="hover:underline">
                      {data.featuredTitle}
                    </Link>
                  ) : (
                    data.featuredTitle
                  )}
                </h3>

                <p 
                  className="text-muted-foreground line-clamp-3"
                  data-tina-field={tinaField(data, 'featuredExcerpt')}
                >
                  {data.featuredExcerpt}
                </p>

                {data.featuredLink && (
                  <div className="mt-4">
                    <Link
                      href={data.featuredLink}
                      className="inline-flex items-center text-primary hover:underline font-medium"
                      data-tina-field={tinaField(data, 'featuredLink')}
                    >
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </article>
          </div>

          {/* Side Articles - Right Side */}
          <div className="grid gap-4 content-start">
            {data.sideArticles &&
              data.sideArticles.map((article, i) => (
                <SideArticle key={i} {...article!} index={i} />
              ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export const SideArticle: React.FC<PageBlocksArticleFeaturedSideArticles & { index: number }> = (data) => {
  const { index } = data;

  return (
    <article 
      className="group flex gap-4 p-4 rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20"
      data-tina-field={tinaField(data, 'title')}
    >
      {data.thumbnail && (
        <div className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <img
            src={data.thumbnail}
            alt={data.thumbnailAlt || `Article ${index + 1}`}
            className="img-gallery transition-transform duration-300 group-hover:scale-110"
            data-tina-field={tinaField(data, 'thumbnail')}
          />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        {data.category && (
          <Badge 
            variant="outline" 
            className="mb-2 text-xs"
            data-tina-field={tinaField(data, 'category')}
          >
            {data.category}
          </Badge>
        )}
        
        <h3 
          className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors"
          data-tina-field={tinaField(data, 'title')}
        >
          {data.link ? (
            <Link href={data.link} className="hover:underline">
              {data.title}
            </Link>
          ) : (
            data.title
          )}
        </h3>
        
        {data.excerpt && (
          <p 
            className="text-sm text-muted-foreground line-clamp-2 mb-2"
            data-tina-field={tinaField(data, 'excerpt')}
          >
            {data.excerpt}
          </p>
        )}
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {data.author && (
            <span data-tina-field={tinaField(data, 'author')}>
              {data.author}
            </span>
          )}
          {data.date && (
            <>
              {data.author && <span>•</span>}
              <time data-tina-field={tinaField(data, 'date')}>
                {data.date}
              </time>
            </>
          )}
          {data.readTime && (
            <>
              <span>•</span>
              <span data-tina-field={tinaField(data, 'readTime')}>
                {data.readTime}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

const defaultSideArticle = {
  title: "Article Title",
  excerpt: "Brief description of the article content...",
  thumbnail: "",
  thumbnailAlt: "",
  category: "Category",
  author: "Author Name",
  date: "Jan 1, 2024",
  readTime: "5 min read",
  link: "/article",
};

export const articleFeaturedBlockSchema: Template = {
  name: "articleFeatured",
  label: "Article Featured",
  ui: {
    previewSrc: "/blocks/article-featured.png",
    defaultItem: {
      title: "Latest Articles",
      subtitle: "Stay updated with our latest news and insights",
      featuredTitle: "The Future of Technology: AI and Machine Learning Revolutionizing Industries",
      featuredExcerpt: "Explore how artificial intelligence and machine learning are transforming various industries, from healthcare to finance, and what this means for the future of work and innovation.",
      featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
      featuredImageAlt: "AI and technology concept",
      featuredCategory: "Technology",
      featuredAuthor: "John Doe",
      featuredDate: "March 15, 2024",
      featuredReadTime: "8 min read",
      featuredLink: "/articles/future-of-technology",
      sideArticles: [
        {
          ...defaultSideArticle,
          title: "Understanding Blockchain Beyond Cryptocurrency",
          excerpt: "Discover the various applications of blockchain technology beyond Bitcoin and cryptocurrencies.",
          thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
          thumbnailAlt: "Blockchain concept",
          category: "Blockchain",
          author: "Jane Smith",
          date: "March 14, 2024",
          readTime: "6 min read",
          link: "/articles/blockchain-applications",
        },
        {
          ...defaultSideArticle,
          title: "The Rise of Sustainable Technology",
          excerpt: "How green tech is shaping a more sustainable future for our planet.",
          thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400",
          thumbnailAlt: "Sustainable technology",
          category: "Sustainability",
          author: "Mike Johnson",
          date: "March 13, 2024",
          readTime: "4 min read",
          link: "/articles/sustainable-tech",
        },
        {
          ...defaultSideArticle,
          title: "Cybersecurity in the Age of Remote Work",
          excerpt: "Essential security practices for protecting data in distributed work environments.",
          thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
          thumbnailAlt: "Cybersecurity",
          category: "Security",
          author: "Sarah Williams",
          date: "March 12, 2024",
          readTime: "7 min read",
          link: "/articles/remote-cybersecurity",
        },
        {
          ...defaultSideArticle,
          title: "5G Networks: Transforming Connectivity",
          excerpt: "The impact of 5G technology on communication and IoT devices.",
          thumbnail: "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=400",
          thumbnailAlt: "5G network tower",
          category: "Networking",
          author: "Tom Brown",
          date: "March 11, 2024",
          readTime: "5 min read",
          link: "/articles/5g-transformation",
        },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string" as const,
      label: "Section Title",
      name: "title",
    },
    {
      type: "string" as const,
      label: "Section Subtitle",
      name: "subtitle",
    },
    {
      type: "string" as const,
      label: "Featured Article Title",
      name: "featuredTitle",
    },
    {
      type: "string" as const,
      label: "Featured Article Excerpt",
      name: "featuredExcerpt",
    },
    {
      type: "image" as const,
      label: "Featured Article Image",
      name: "featuredImage",
    },
    {
      type: "string" as const,
      label: "Featured Image Alt Text",
      name: "featuredImageAlt",
    },
    {
      type: "string" as const,
      label: "Featured Article Category",
      name: "featuredCategory",
    },
    {
      type: "string" as const,
      label: "Featured Article Author",
      name: "featuredAuthor",
    },
    {
      type: "string" as const,
      label: "Featured Article Date",
      name: "featuredDate",
    },
    {
      type: "string" as const,
      label: "Featured Article Read Time",
      name: "featuredReadTime",
    },
    {
      type: "string" as const,
      label: "Featured Article Link",
      name: "featuredLink",
    },
    {
      type: "object" as const,
      label: "Side Articles",
      name: "sideArticles",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title || "Article",
          };
        },
        defaultItem: {
          ...defaultSideArticle,
        },
      },
      fields: [
        {
          type: "string" as const,
          label: "Title",
          name: "title",
        },
        {
          type: "string" as const,
          label: "Excerpt",
          name: "excerpt",
        },
        {
          type: "image" as const,
          label: "Thumbnail",
          name: "thumbnail",
        },
        {
          type: "string" as const,
          label: "Thumbnail Alt Text",
          name: "thumbnailAlt",
        },
        {
          type: "string" as const,
          label: "Category",
          name: "category",
        },
        {
          type: "string" as const,
          label: "Author",
          name: "author",
        },
        {
          type: "string" as const,
          label: "Date",
          name: "date",
        },
        {
          type: "string" as const,
          label: "Read Time",
          name: "readTime",
        },
        {
          type: "string" as const,
          label: "Article Link",
          name: "link",
        },
      ],
    },
  ],
};