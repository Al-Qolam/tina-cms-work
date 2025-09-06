"use client";
import {
  PageBlocksMarkdownArticle,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Calendar, Clock, User, BookOpen, Share2, Bookmark, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export const MarkdownArticle = ({ data }: { data: PageBlocksMarkdownArticle }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 300);
      
      // Calculate reading progress
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };

    if (data.showReadingProgress || data.showScrollTop) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [data.showReadingProgress, data.showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Reading Progress Bar */}
      {data.showReadingProgress && (
        <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
          <div 
            className="h-full bg-primary transition-all duration-100"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      <Section background={data.background!}>
        <div className="@container mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Sidebar */}
            {data.showLeftSidebar && data.leftSidebarContent && (
              <aside className="hidden lg:block lg:col-span-2">
                <div className="sticky top-24 space-y-6">
                  <div 
                    className="prose prose-sm dark:prose-invert"
                    data-tina-field={tinaField(data, 'leftSidebarContent')}
                  >
                    <TinaMarkdown content={data.leftSidebarContent} />
                  </div>
                </div>
              </aside>
            )}

            {/* Main Content */}
            <article className={`
              ${data.showLeftSidebar && data.showRightSidebar ? 'lg:col-span-8' : 
                data.showLeftSidebar || data.showRightSidebar ? 'lg:col-span-9' : 
                'lg:col-span-12'}
            `}>
              {/* Hero Section */}
              {data.heroImage && (
                <div className="mb-8 -mx-6 lg:-mx-0">
                  <img
                    src={data.heroImage}
                    alt={data.heroImageAlt || "Article hero"}
                    className="w-full h-[400px] object-cover lg:rounded-xl"
                    data-tina-field={tinaField(data, 'heroImage')}
                  />
                </div>
              )}

              {/* Article Header */}
              <header className="mb-8">
                {data.category && (
                  <Badge 
                    variant="secondary" 
                    className="mb-4"
                    data-tina-field={tinaField(data, 'category')}
                  >
                    {data.category}
                  </Badge>
                )}
                
                <h1 
                  className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
                  data-tina-field={tinaField(data, 'title')}
                >
                  {data.title}
                </h1>

                {data.lead && (
                  <p 
                    className="text-xl text-muted-foreground mb-6"
                    data-tina-field={tinaField(data, 'lead')}
                  >
                    {data.lead}
                  </p>
                )}

                {/* Author Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b">
                  <div className="flex items-center gap-4">
                    {data.authorAvatar && (
                      <img
                        src={data.authorAvatar}
                        alt={data.authorName || "Author"}
                        className="w-12 h-12 rounded-full object-cover"
                        data-tina-field={tinaField(data, 'authorAvatar')}
                      />
                    )}
                    <div>
                      {data.authorName && (
                        <p 
                          className="font-semibold text-foreground"
                          data-tina-field={tinaField(data, 'authorName')}
                        >
                          {data.authorName}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {data.publishDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <time data-tina-field={tinaField(data, 'publishDate')}>
                              {data.publishDate}
                            </time>
                          </div>
                        )}
                        {data.readingTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span data-tina-field={tinaField(data, 'readingTime')}>
                              {data.readingTime}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  {data.showShareButtons && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </header>

              {/* Table of Contents */}
              {data.showTableOfContents && data.tableOfContents && (
                <div className="mb-8 p-6 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5" />
                    <h3 className="font-semibold">Table of Contents</h3>
                  </div>
                  <div 
                    className="prose prose-sm dark:prose-invert max-w-none"
                    data-tina-field={tinaField(data, 'tableOfContents')}
                  >
                    <TinaMarkdown content={data.tableOfContents} />
                  </div>
                </div>
              )}

              {/* Main Article Content */}
              <div 
                className="
                  prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:leading-relaxed prose-p:text-muted-foreground
                  prose-blockquote:border-l-4 prose-blockquote:border-primary 
                  prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-6
                  prose-code:bg-muted prose-code:px-2 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border
                  prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
                  prose-a:text-primary hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-ul:space-y-2 prose-ol:space-y-2
                  prose-li:text-muted-foreground
                  prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden
                  prose-th:bg-muted prose-th:font-semibold
                  prose-td:border-b prose-td:border-border
                "
                data-tina-field={tinaField(data, 'mainContent')}
              >
                <TinaMarkdown content={data.mainContent} />
              </div>

              {/* Article Footer */}
              {data.conclusion && (
                <div className="mt-12 p-6 rounded-lg bg-muted/50">
                  <h3 className="text-xl font-semibold mb-4">Conclusion</h3>
                  <div 
                    className="prose prose-lg dark:prose-invert"
                    data-tina-field={tinaField(data, 'conclusion')}
                  >
                    <TinaMarkdown content={data.conclusion} />
                  </div>
                </div>
              )}

              {/* Tags */}
              {data.tags && data.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, i) => (
                      <Badge 
                        key={i} 
                        variant="outline"
                        data-tina-field={tinaField(data, `tags.${i}`)}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles */}
              {data.showRelatedArticles && data.relatedArticlesTitle && (
                <div className="mt-12 pt-8 border-t">
                  <h3 
                    className="text-2xl font-bold mb-6"
                    data-tina-field={tinaField(data, 'relatedArticlesTitle')}
                  >
                    {data.relatedArticlesTitle}
                  </h3>
                  {data.relatedArticles && (
                    <div 
                      className="prose dark:prose-invert"
                      data-tina-field={tinaField(data, 'relatedArticles')}
                    >
                      <TinaMarkdown content={data.relatedArticles} />
                    </div>
                  )}
                </div>
              )}
            </article>

            {/* Right Sidebar */}
            {data.showRightSidebar && data.rightSidebarContent && (
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24 space-y-6">
                  <div 
                    className="prose prose-sm dark:prose-invert"
                    data-tina-field={tinaField(data, 'rightSidebarContent')}
                  >
                    <TinaMarkdown content={data.rightSidebarContent} />
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </Section>

      {/* Scroll to Top Button */}
      {data.showScrollTop && showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export const markdownArticleBlockSchema: Template = {
  name: "markdownArticle",
  label: "Markdown Article",
  ui: {
    previewSrc: "/blocks/markdown-article.png",
    defaultItem: {
      title: "Complete Guide to Modern Web Development",
      lead: "Learn everything you need to know about building modern web applications with the latest technologies and best practices.",
      category: "Technology",
      authorName: "John Doe",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      publishDate: "March 15, 2024",
      readingTime: "10 min read",
      showReadingProgress: true,
      showScrollTop: true,
      showShareButtons: true,
      showTableOfContents: true,
      showRelatedArticles: true,
      showLeftSidebar: false,
      showRightSidebar: true,
      tableOfContents: `
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
- [Advanced Topics](#advanced-topics)
- [Best Practices](#best-practices)
- [Conclusion](#conclusion)
      `,
      mainContent: `
## Introduction

Welcome to this comprehensive guide on modern web development. In this article, we'll explore the fundamental concepts, tools, and techniques that every developer should know.

> "The web is more than just a platform; it's a canvas for innovation and creativity."

## Getting Started

Before diving into the technical details, let's understand what makes modern web development different from traditional approaches:

### Key Differences

1. **Component-Based Architecture** - Building UIs with reusable components
2. **State Management** - Managing application data efficiently
3. **Performance Optimization** - Ensuring fast load times and smooth interactions
4. **Developer Experience** - Using modern tools and workflows

### Prerequisites

To follow along with this guide, you should have:

- Basic knowledge of HTML, CSS, and JavaScript
- Node.js installed on your machine
- A code editor (VS Code recommended)
- Git for version control

## Core Concepts

### The Modern Stack

Today's web applications are built using a variety of technologies:

\`\`\`javascript
// Example: React Component
import React from 'react';

function Welcome({ name }) {
  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      <p>Welcome to modern web development.</p>
    </div>
  );
}

export default Welcome;
\`\`\`

### State Management

Managing state is crucial for interactive applications. Here are the main approaches:

| Approach | Use Case | Complexity |
|----------|----------|------------|
| Local State | Component-specific data | Low |
| Context API | Shared state across components | Medium |
| Redux | Complex application state | High |
| Zustand | Simplified global state | Low-Medium |

### Styling Strategies

Modern CSS approaches include:

- **CSS Modules** - Scoped styles for components
- **CSS-in-JS** - Dynamic styling with JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Sass/SCSS** - Enhanced CSS with variables and mixins

## Advanced Topics

### Performance Optimization

Performance is critical for user experience. Consider these techniques:

1. **Code Splitting** - Load only what's needed
2. **Lazy Loading** - Defer loading of non-critical resources
3. **Image Optimization** - Use modern formats like WebP
4. **Caching Strategies** - Implement effective caching

### Security Best Practices

Security should never be an afterthought:

- Always validate user input
- Use HTTPS everywhere
- Implement proper authentication
- Keep dependencies updated
- Follow OWASP guidelines

### Testing Strategies

A robust testing strategy includes:

\`\`\`javascript
// Example: Unit Test
describe('Calculator', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
});
\`\`\`

## Best Practices

### Code Organization

Keep your code clean and maintainable:

- Use meaningful variable names
- Write self-documenting code
- Follow consistent formatting
- Implement proper error handling
- Document complex logic

### Version Control

Git best practices:

- Write clear commit messages
- Use feature branches
- Review code before merging
- Tag releases properly

### Deployment

Modern deployment options:

- **Vercel** - Optimized for Next.js
- **Netlify** - Great for static sites
- **AWS** - Full control and scalability
- **Docker** - Containerized deployments

## Resources and Learning

Continue your learning journey with these resources:

- [MDN Web Docs](https://developer.mozilla.org/)
- [React Documentation](https://react.dev/)
- [JavaScript.info](https://javascript.info/)
- [CSS Tricks](https://css-tricks.com/)

---

*Remember: The key to mastering web development is consistent practice and staying curious about new technologies.*
      `,
      conclusion: `
Web development is an ever-evolving field that requires continuous learning and adaptation. By understanding the core concepts, following best practices, and staying updated with the latest trends, you'll be well-equipped to build amazing web applications.

Start small, build projects, and don't be afraid to experiment. The web development community is welcoming and always ready to help. Happy coding!
      `,
      rightSidebarContent: `
### About the Author

**John Doe** is a senior web developer with 10+ years of experience building scalable applications.

---

### Newsletter

Subscribe to get weekly updates on web development trends.

[Subscribe →](#)

---

### Popular Articles

- [Understanding React Hooks](#)
- [CSS Grid vs Flexbox](#)
- [JavaScript ES2024 Features](#)
- [TypeScript Best Practices](#)

---

### Categories

- Frontend Development
- Backend Development
- DevOps
- UI/UX Design
- Career Advice
      `,
      tags: ["Web Development", "JavaScript", "React", "CSS", "Best Practices"],
      relatedArticlesTitle: "Related Articles",
      relatedArticles: `
- [Getting Started with React 18](#)
- [CSS Architecture for Large Projects](#)
- [JavaScript Performance Tips](#)
- [Building Accessible Web Applications](#)
      `,
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
      label: "Lead/Subtitle",
      name: "lead",
    },
    {
      type: "string" as const,
      label: "Category",
      name: "category",
    },
    {
      type: "image" as const,
      label: "Hero Image",
      name: "heroImage",
    },
    {
      type: "string" as const,
      label: "Hero Image Alt",
      name: "heroImageAlt",
    },
    {
      type: "string" as const,
      label: "Author Name",
      name: "authorName",
    },
    {
      type: "image" as const,
      label: "Author Avatar",
      name: "authorAvatar",
    },
    {
      type: "string" as const,
      label: "Publish Date",
      name: "publishDate",
    },
    {
      type: "string" as const,
      label: "Reading Time",
      name: "readingTime",
    },
    {
      type: "boolean" as const,
      label: "Show Reading Progress Bar",
      name: "showReadingProgress",
    },
    {
      type: "boolean" as const,
      label: "Show Scroll to Top Button",
      name: "showScrollTop",
    },
    {
      type: "boolean" as const,
      label: "Show Share Buttons",
      name: "showShareButtons",
    },
    {
      type: "boolean" as const,
      label: "Show Table of Contents",
      name: "showTableOfContents",
    },
    {
      type: "rich-text" as const,
      label: "Table of Contents",
      name: "tableOfContents",
    },
    {
      type: "rich-text" as const,
      label: "Main Content (Markdown)",
      name: "mainContent",
      description: "The main article content with full Markdown support",
    },
    {
      type: "rich-text" as const,
      label: "Conclusion",
      name: "conclusion",
    },
    {
      type: "string" as const,
      label: "Tags",
      name: "tags",
      list: true,
    },
    {
      type: "boolean" as const,
      label: "Show Related Articles",
      name: "showRelatedArticles",
    },
    {
      type: "string" as const,
      label: "Related Articles Title",
      name: "relatedArticlesTitle",
    },
    {
      type: "rich-text" as const,
      label: "Related Articles",
      name: "relatedArticles",
    },
    {
      type: "boolean" as const,
      label: "Show Left Sidebar",
      name: "showLeftSidebar",
    },
    {
      type: "rich-text" as const,
      label: "Left Sidebar Content",
      name: "leftSidebarContent",
    },
    {
      type: "boolean" as const,
      label: "Show Right Sidebar",
      name: "showRightSidebar",
    },
    {
      type: "rich-text" as const,
      label: "Right Sidebar Content",
      name: "rightSidebarContent",
    },
  ],
};