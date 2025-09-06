"use client";
import {
  PageBlocksRichContent,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Calendar, Clock, User, Tag } from "lucide-react";

export const RichContent = ({ data }: { data: PageBlocksRichContent }) => {
  const containerClass = {
    narrow: "max-w-3xl",
    medium: "max-w-4xl",
    wide: "max-w-6xl",
    full: "max-w-7xl",
  };

  const width = data.contentWidth || "medium";
  const widthClass = containerClass[width as keyof typeof containerClass] || containerClass.medium;

  const alignmentClass = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };

  const alignment = data.alignment || "center";
  const alignClass = alignmentClass[alignment as keyof typeof alignmentClass] || alignmentClass.center;

  // Prose theme variants
  const proseTheme = {
    default: "prose-gray dark:prose-invert",
    blue: "prose-blue dark:prose-invert",
    green: "prose-green dark:prose-invert",
    purple: "prose-purple dark:prose-invert",
    pink: "prose-pink dark:prose-invert",
  };

  const theme = data.proseTheme || "default";
  const themeClass = proseTheme[theme as keyof typeof proseTheme] || proseTheme.default;

  return (
    <Section background={data.background!}>
      <div className={`@container ${widthClass} ${alignClass} px-6`}>
        {/* Header Section */}
        {(data.title || data.subtitle || data.badge) && (
          <div className={`mb-8 md:mb-12 ${
            alignment === 'center' ? 'text-center' : 
            alignment === 'right' ? 'text-right' : 
            'text-left'
          }`}>
            {data.badge && (
              <Badge 
                variant="secondary" 
                className="mb-4"
                data-tina-field={tinaField(data, 'badge')}
              >
                {data.badge}
              </Badge>
            )}
            {data.title && (
              <h1 
                data-tina-field={tinaField(data, 'title')} 
                className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4"
              >
                {data.title}
              </h1>
            )}
            {data.subtitle && (
              <p 
                data-tina-field={tinaField(data, 'subtitle')}
                className="text-xl text-muted-foreground"
              >
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Meta Information */}
        {(data.author || data.date || data.readTime || data.tags) && (
          <>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              {data.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span data-tina-field={tinaField(data, 'author')}>{data.author}</span>
                </div>
              )}
              {data.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time data-tina-field={tinaField(data, 'date')}>{data.date}</time>
                </div>
              )}
              {data.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span data-tina-field={tinaField(data, 'readTime')}>{data.readTime}</span>
                </div>
              )}
            </div>
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {data.tags.map((tag, i) => (
                  <Badge 
                    key={i} 
                    variant="outline"
                    data-tina-field={tinaField(data, `tags.${i}`)}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <Separator className="mb-8" />
          </>
        )}

        {/* Featured Image */}
        {data.featuredImage && (
          <div className="mb-8 md:mb-12">
            <img
              src={data.featuredImage}
              alt={data.featuredImageAlt || "Featured image"}
              className="w-full rounded-xl shadow-lg"
              data-tina-field={tinaField(data, 'featuredImage')}
            />
            {data.featuredImageCaption && (
              <p 
                className="text-sm text-center text-muted-foreground mt-3"
                data-tina-field={tinaField(data, 'featuredImageCaption')}
              >
                {data.featuredImageCaption}
              </p>
            )}
          </div>
        )}

        {/* Main Content - Full Markdown Support */}
        <div 
          className={`
            prose ${themeClass} 
            ${data.proseLg ? 'prose-lg' : ''} 
            ${data.proseXl ? 'prose-xl' : ''} 
            max-w-none
            prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-8
            prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12
            prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
            prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6
            prose-p:leading-relaxed prose-p:mb-6
            prose-ul:my-6 prose-ol:my-6
            prose-li:my-2
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic
            prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg
            prose-img:rounded-lg prose-img:shadow-md
            prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden
            prose-th:bg-muted prose-th:font-semibold
            prose-strong:font-bold prose-strong:text-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-hr:border-border
          `}
          data-tina-field={tinaField(data, 'content')}
        >
          <TinaMarkdown content={data.content} />
        </div>

        {/* Footer Section */}
        {data.footerContent && (
          <>
            <Separator className="mt-12 mb-8" />
            <div 
              className="prose prose-sm max-w-none text-muted-foreground"
              data-tina-field={tinaField(data, 'footerContent')}
            >
              <TinaMarkdown content={data.footerContent} />
            </div>
          </>
        )}
      </div>
    </Section>
  );
};

export const richContentBlockSchema: Template = {
  name: "richContent",
  label: "Rich Content",
  ui: {
    previewSrc: "/blocks/rich-content.png",
    defaultItem: {
      title: "Rich Content Block",
      subtitle: "Write anything with full Markdown support",
      content: `# Welcome to Rich Content

This component supports **all Markdown features** including:

## Text Formatting
- **Bold text** for emphasis
- *Italic text* for subtle emphasis  
- ~~Strikethrough~~ for corrections
- \`inline code\` for technical terms

## Lists

### Unordered List
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered List
1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

## Blockquotes

> "The best way to predict the future is to invent it."
> 
> — Alan Kay

## Code Blocks

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

## Tables

| Feature | Description | Status |
|---------|-------------|--------|
| Markdown | Full support | ✅ |
| Images | Inline and block | ✅ |
| Tables | With alignment | ✅ |
| Code | Syntax highlighting | ✅ |

## Links and Images

Visit [TinaCMS](https://tina.io) for more information.

![Placeholder Image](https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800)

## Horizontal Rule

---

## Advanced Features

### Task Lists
- [x] Completed task
- [ ] Pending task
- [ ] Another task

### Footnotes
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

### Definition Lists
Term 1
: Definition of term 1

Term 2
: Definition of term 2

## HTML Elements

You can also use <mark>highlighted text</mark>, <sub>subscript</sub>, and <sup>superscript</sup>.

---

*This is just the beginning. You can write any content you want using Markdown!*`,
      contentWidth: "medium",
      alignment: "center",
      proseTheme: "default",
      proseLg: false,
      proseXl: false,
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
      label: "Badge",
      name: "badge",
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
      label: "Tags",
      name: "tags",
      list: true,
    },
    {
      type: "image" as const,
      label: "Featured Image",
      name: "featuredImage",
    },
    {
      type: "string" as const,
      label: "Featured Image Alt",
      name: "featuredImageAlt",
    },
    {
      type: "string" as const,
      label: "Featured Image Caption",
      name: "featuredImageCaption",
    },
    {
      type: "rich-text" as const,
      label: "Main Content (Markdown)",
      name: "content",
      description: "Write your content here with full Markdown support",
    },
    {
      type: "rich-text" as const,
      label: "Footer Content (Optional)",
      name: "footerContent",
      description: "Additional content at the bottom",
    },
    {
      type: "string" as const,
      label: "Content Width",
      name: "contentWidth",
      options: ["narrow", "medium", "wide", "full"],
      description: "Maximum width of the content",
    },
    {
      type: "string" as const,
      label: "Alignment",
      name: "alignment",
      options: ["left", "center", "right"],
      description: "Content alignment",
    },
    {
      type: "string" as const,
      label: "Prose Theme",
      name: "proseTheme",
      options: ["default", "blue", "green", "purple", "pink"],
      description: "Color theme for text",
    },
    {
      type: "boolean" as const,
      label: "Large Text",
      name: "proseLg",
      description: "Use larger text size",
    },
    {
      type: "boolean" as const,
      label: "Extra Large Text",
      name: "proseXl",
      description: "Use extra large text size",
    },
  ],
};