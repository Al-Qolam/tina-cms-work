"use client";
import {
  PageBlocksArticleCards,
  PageBlocksArticleCardsArticles,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";

export const ArticleCards = ({ data }: { data: PageBlocksArticleCards }) => {
  const layoutClass = {
    grid: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
    list: "grid gap-6",
    masonry: "columns-1 md:columns-2 lg:columns-3 gap-6",
  };

  const layout = data.layout || "grid";
  const gridLayout = layoutClass[layout as keyof typeof layoutClass] || layoutClass.grid;

  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12">
          <div>
            {data.title && (
              <h2 
                data-tina-field={tinaField(data, 'title')} 
                className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-2"
              >
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p 
                data-tina-field={tinaField(data, 'subtitle')}
                className="text-muted-foreground text-lg"
              >
                {data.subtitle}
              </p>
            )}
          </div>
          
          {data.viewAllLink && (
            <Button
              variant="outline"
              asChild
              className="mt-4 md:mt-0"
            >
              <Link href={data.viewAllLink} data-tina-field={tinaField(data, 'viewAllLink')}>
                {data.viewAllText || "View All"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        {/* Articles Grid/List */}
        <div className={gridLayout}>
          {data.articles &&
            data.articles.map((article, i) => (
              layout === "masonry" ? (
                <div key={i} className="break-inside-avoid mb-6">
                  <ArticleCard {...article!} index={i} layout={layout} />
                </div>
              ) : (
                <ArticleCard key={i} {...article!} index={i} layout={layout} />
              )
            ))}
        </div>

        {/* Load More Button */}
        {data.showLoadMore && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              data-tina-field={tinaField(data, 'loadMoreText')}
            >
              {data.loadMoreText || "Load More Articles"}
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
};

export const ArticleCard: React.FC<PageBlocksArticleCardsArticles & { index: number; layout: string }> = (data) => {
  const { index, layout } = data;
  const isListLayout = layout === "list";

  const cardContent = (
    <>
      {data.image && (
        <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${isListLayout ? 'md:w-80' : 'aspect-[16/10]'}`}>
          <img
            src={data.image}
            alt={data.imageAlt || `Article ${index + 1}`}
            className="img-featured transition-transform duration-300 group-hover:scale-105"
            data-tina-field={tinaField(data, 'image')}
          />
          {data.category && (
            <div className="absolute top-4 left-4">
              <Badge 
                variant="secondary" 
                className="bg-background/90 backdrop-blur-sm"
                data-tina-field={tinaField(data, 'category')}
              >
                {data.category}
              </Badge>
            </div>
          )}
          {data.featured && (
            <div className="absolute top-4 right-4">
              <Badge 
                variant="destructive"
                className="bg-red-500/90 backdrop-blur-sm"
              >
                Featured
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6 flex-1">
        {/* Tags */}
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {data.tags.map((tag, i) => (
              <Badge 
                key={i} 
                variant="outline" 
                className="text-xs"
                data-tina-field={tinaField(data, `tags.${i}`)}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 
          className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors"
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

        {/* Excerpt */}
        {data.excerpt && (
          <p 
            className="text-muted-foreground line-clamp-3 mb-4"
            data-tina-field={tinaField(data, 'excerpt')}
          >
            {data.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {data.author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span data-tina-field={tinaField(data, 'author')}>
                {data.author}
              </span>
            </div>
          )}
          
          {data.date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time data-tina-field={tinaField(data, 'date')}>
                {data.date}
              </time>
            </div>
          )}
          
          {data.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span data-tina-field={tinaField(data, 'readTime')}>
                {data.readTime}
              </span>
            </div>
          )}
        </div>

        {/* Read More Link */}
        {data.link && data.showReadMore && (
          <div className="mt-4">
            <Link
              href={data.link}
              className="inline-flex items-center text-primary hover:underline font-medium text-sm"
              data-tina-field={tinaField(data, 'link')}
            >
              Read more
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </>
  );

  if (isListLayout) {
    return (
      <article className="group flex flex-col md:flex-row gap-6 overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300 hover:border-primary/20">
        {cardContent}
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300 hover:border-primary/20 h-full">
      {cardContent}
    </article>
  );
};

const defaultArticle = {
  title: "Article Title",
  excerpt: "Brief description of the article content that provides a preview of what readers can expect...",
  image: "",
  imageAlt: "",
  category: "Category",
  tags: ["Tag1", "Tag2"],
  author: "Author Name",
  date: "January 1, 2024",
  readTime: "5 min read",
  link: "/article",
  featured: false,
  showReadMore: true,
};

export const articleCardsBlockSchema: Template = {
  name: "articleCards",
  label: "Article Cards",
  ui: {
    previewSrc: "/blocks/article-cards.png",
    defaultItem: {
      title: "Berita Terbaru",
      subtitle: "Ikuti perkembangan dan informasi terkini dari kami",
      layout: "grid",
      viewAllText: "Lihat Semua Berita",
      viewAllLink: "/berita",
      showLoadMore: false,
      loadMoreText: "Muat Lebih Banyak",
      articles: [
        {
          ...defaultArticle,
          title: "ARCTHUR 2.0 : Ajang Bergengsi Kejuaraan Horsebow Putri Tingkat Nasional Piala Bupati Malang 2025",
          excerpt: "Kejuaraan horsebow tingkat nasional yang diselenggarakan di Malang dengan peserta dari berbagai daerah di Indonesia.",
          image: "https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=800",
          imageAlt: "Horsebow championship",
          category: "Olahraga",
          tags: ["Kejuaraan", "Nasional", "Horsebow"],
          author: "Admin NIBS",
          date: "22 Agustus 2025",
          readTime: "3 min read",
          link: "/berita/arcthur-2025",
          featured: true,
        },
        {
          ...defaultArticle,
          title: "Wisuda Akbar Tahfidz Angkatan ke-15 Nurul Ilmi Boarding School",
          excerpt: "Acara wisuda para santri yang telah menyelesaikan program tahfidz Al-Qur'an dengan target hafalan 30 juz.",
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
          imageAlt: "Graduation ceremony",
          category: "Pendidikan",
          tags: ["Wisuda", "Tahfidz", "Prestasi"],
          author: "Humas NIBS",
          date: "20 Agustus 2025",
          readTime: "5 min read",
          link: "/berita/wisuda-tahfidz-15",
        },
        {
          ...defaultArticle,
          title: "Pembukaan Pendaftaran Santri Baru Tahun Ajaran 2025/2026",
          excerpt: "PPDB Nurul Ilmi Boarding School telah dibuka. Segera daftarkan putra-putri Anda untuk mendapatkan pendidikan terbaik.",
          image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
          imageAlt: "Student registration",
          category: "PPDB",
          tags: ["Pendaftaran", "Santri Baru", "2025"],
          author: "Panitia PPDB",
          date: "18 Agustus 2025",
          readTime: "4 min read",
          link: "/berita/ppdb-2025",
        },
        {
          ...defaultArticle,
          title: "Santri NIBS Raih Juara 1 Musabaqah Hifdzil Qur'an Tingkat Provinsi",
          excerpt: "Prestasi membanggakan diraih santri NIBS dalam ajang MHQ tingkat provinsi dengan meraih juara 1.",
          image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800",
          imageAlt: "Quran competition",
          category: "Prestasi",
          tags: ["Juara", "MHQ", "Tahfidz"],
          author: "Admin NIBS",
          date: "15 Agustus 2025",
          readTime: "3 min read",
          link: "/berita/juara-mhq-provinsi",
        },
        {
          ...defaultArticle,
          title: "Workshop Parenting: Mendidik Generasi Qur'ani di Era Digital",
          excerpt: "Workshop untuk orang tua santri tentang cara mendidik anak di era digital dengan tetap berpegang pada nilai-nilai Qur'ani.",
          image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
          imageAlt: "Parenting workshop",
          category: "Kegiatan",
          tags: ["Workshop", "Parenting", "Digital"],
          author: "Humas NIBS",
          date: "10 Agustus 2025",
          readTime: "6 min read",
          link: "/berita/workshop-parenting-2025",
        },
        {
          ...defaultArticle,
          title: "Program Ramadhan: Pesantren Kilat dan I'tikaf untuk Umum",
          excerpt: "NIBS membuka program pesantren kilat dan i'tikaf selama bulan Ramadhan untuk masyarakat umum.",
          image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=800",
          imageAlt: "Ramadhan program",
          category: "Program",
          tags: ["Ramadhan", "Pesantren Kilat", "I'tikaf"],
          author: "Admin NIBS",
          date: "5 Agustus 2025",
          readTime: "4 min read",
          link: "/berita/program-ramadhan",
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
      label: "Layout",
      name: "layout",
      options: ["grid", "list", "masonry"],
      description: "Choose the layout style for articles",
    },
    {
      type: "string" as const,
      label: "View All Text",
      name: "viewAllText",
      description: "Text for the view all button",
    },
    {
      type: "string" as const,
      label: "View All Link",
      name: "viewAllLink",
      description: "Link to the full articles page",
    },
    {
      type: "boolean" as const,
      label: "Show Load More",
      name: "showLoadMore",
      description: "Show a load more button at the bottom",
    },
    {
      type: "string" as const,
      label: "Load More Text",
      name: "loadMoreText",
      description: "Text for the load more button",
    },
    {
      type: "object" as const,
      label: "Articles",
      name: "articles",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title || "Article",
          };
        },
        defaultItem: {
          ...defaultArticle,
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
          label: "Image",
          name: "image",
        },
        {
          type: "string" as const,
          label: "Image Alt Text",
          name: "imageAlt",
        },
        {
          type: "string" as const,
          label: "Category",
          name: "category",
        },
        {
          type: "string" as const,
          label: "Tags",
          name: "tags",
          list: true,
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
        {
          type: "boolean" as const,
          label: "Featured",
          name: "featured",
          description: "Mark as featured article",
        },
        {
          type: "boolean" as const,
          label: "Show Read More",
          name: "showReadMore",
          description: "Show read more link",
        },
      ],
    },
  ],
};