"use client";
import {
  PageBlocksFaq,
  PageBlocksFaqFaqItems,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { Badge } from "../ui/badge";

export const FAQ = ({ data }: { data: PageBlocksFaq }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const layoutClass = {
    centered: "max-w-3xl mx-auto",
    withImage: "grid gap-8 md:gap-12 lg:grid-cols-2 items-start",
    twoColumn: "grid gap-8 md:gap-12 lg:grid-cols-2",
  };

  const layout = data.layout || "centered";
  const gridLayout = layoutClass[layout as keyof typeof layoutClass] || layoutClass.centered;

  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-7xl px-6">
        {/* Header - Only for centered layout */}
        {layout === "centered" && (data.title || data.subtitle || data.badge) && (
          <div className="text-center mb-8 md:mb-12">
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

        <div className={gridLayout}>
          {/* Image Section - For withImage layout */}
          {layout === "withImage" && data.sideImage && (
            <div className="relative">
              <div className="sticky top-8">
                <img
                  className="w-full rounded-xl shadow-lg"
                  src={data.sideImage}
                  alt={data.sideImageAlt || "FAQ illustration"}
                  data-tina-field={tinaField(data, 'sideImage')}
                />
                {data.imageCaption && (
                  <p 
                    className="text-sm text-muted-foreground text-center mt-4"
                    data-tina-field={tinaField(data, 'imageCaption')}
                  >
                    {data.imageCaption}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* FAQ Content */}
          <div>
            {/* Header - For withImage layout */}
            {layout === "withImage" && (data.title || data.subtitle || data.badge) && (
              <div className="mb-8">
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
                  <h2 
                    data-tina-field={tinaField(data, 'title')} 
                    className="text-3xl font-bold text-foreground sm:text-4xl mb-4"
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
            )}

            {/* FAQ Items */}
            <div className={layout === "twoColumn" ? "space-y-4" : "space-y-2"}>
              {data.faqItems &&
                data.faqItems.map((item, index) => (
                  <FAQItem
                    key={index}
                    {...item!}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    layout={layout}
                  />
                ))}
            </div>

            {/* CTA Section */}
            {data.showCta && (
              <div className="mt-12 p-6 rounded-xl bg-muted/50 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 
                  className="text-xl font-semibold mb-2"
                  data-tina-field={tinaField(data, 'ctaTitle')}
                >
                  {data.ctaTitle || "Still have questions?"}
                </h3>
                <p 
                  className="text-muted-foreground mb-4"
                  data-tina-field={tinaField(data, 'ctaDescription')}
                >
                  {data.ctaDescription || "Can't find the answer you're looking for? Please contact our support team."}
                </p>
                {data.ctaLink && (
                  <a 
                    href={data.ctaLink}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                    data-tina-field={tinaField(data, 'ctaLink')}
                  >
                    {data.ctaButtonText || "Contact Support"}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Two Column Layout - Second Column */}
          {layout === "twoColumn" && data.faqItemsColumn2 && (
            <div className="space-y-2">
              {data.faqItemsColumn2.map((item, index) => {
                const actualIndex = (data.faqItems?.length || 0) + index;
                return (
                  <FAQItem
                    key={actualIndex}
                    {...item!}
                    index={actualIndex}
                    isOpen={openIndex === actualIndex}
                    onToggle={() => setOpenIndex(openIndex === actualIndex ? null : actualIndex)}
                    layout={layout}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

interface FAQItemProps extends PageBlocksFaqFaqItems {
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  layout: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({ 
  question, 
  answer, 
  category,
  index, 
  isOpen, 
  onToggle,
  layout 
}) => {
  return (
    <div 
      className={`border rounded-lg transition-all duration-200 ${
        isOpen 
          ? 'border-primary/20 bg-muted/30 shadow-sm' 
          : 'border-border hover:border-primary/10 hover:bg-muted/10'
      }`}
      data-tina-field={tinaField({ question, answer, category }, 'question')}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-start justify-between text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex-1 pr-4">
          {category && (
            <Badge variant="outline" className="mb-2 text-xs">
              {category}
            </Badge>
          )}
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {question}
          </h3>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 text-sm text-muted-foreground">
          <TinaMarkdown content={answer} />
        </div>
      </div>
    </div>
  );
};

const defaultFaqItem = {
  question: "What is your question?",
  answer: "This is the answer to your question. You can provide detailed information here.",
  category: "",
};

export const faqBlockSchema: Template = {
  name: "faq",
  label: "FAQ",
  ui: {
    previewSrc: "/blocks/faq.png",
    defaultItem: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our services",
      badge: "FAQ",
      layout: "centered",
      showCta: true,
      ctaTitle: "Still have questions?",
      ctaDescription: "Can't find the answer you're looking for? Please contact our support team.",
      ctaButtonText: "Contact Support",
      ctaLink: "/contact",
      faqItems: [
        {
          question: "Bagaimana cara mendaftar di Nurul Ilmi Boarding School?",
          answer: "Pendaftaran dapat dilakukan melalui WhatsApp dengan mengirim format pendaftaran lengkap ke nomor 0812-7836-2771. Format: PPDB NIBS_NAMA LENGKAP_JENIS KELAMIN_TEMPAT LAHIR_NAMA AYAH_NAMA IBU_ALAMAT_ASAL SEKOLAH_NO.HP",
          category: "Pendaftaran",
        },
        {
          question: "Berapa biaya pendidikan di NIBS?",
          answer: "Biaya pendidikan terdiri dari: Biaya pendaftaran Rp400.000 (sekali bayar), Uang pangkal mulai Rp10.000.000 (dapat diangsur), dan SPP bulanan mulai Rp1.500.000 (termasuk pendidikan, asrama, dan makan).",
          category: "Biaya",
        },
        {
          question: "Apa saja program unggulan di NIBS?",
          answer: "Program unggulan kami meliputi: Program Tahfidz 30 Juz, Pendidikan Akademik terintegrasi, Pembelajaran Bahasa Arab dan Inggris intensif, Ekstrakurikuler beragam, dan Pembinaan karakter Islami.",
          category: "Program",
        },
        {
          question: "Apakah tersedia beasiswa atau keringanan biaya?",
          answer: "Ya, tersedia program keringanan biaya bagi yang membutuhkan. Silakan ajukan dengan melampirkan Surat Keterangan Tidak Mampu (SKTM) dari kelurahan setempat saat pendaftaran.",
          category: "Biaya",
        },
        {
          question: "Bagaimana sistem asrama di NIBS?",
          answer: "NIBS menerapkan sistem boarding school (asrama) dengan pemisahan antara santri putra dan putri. Asrama dilengkapi dengan fasilitas lengkap dan pengawasan 24 jam oleh musyrif/musyrifah.",
          category: "Asrama",
        },
        {
          question: "Apa saja persyaratan pendaftaran santri baru?",
          answer: "Persyaratan meliputi: Usia minimal 12 tahun atau lulus SD/MI, Fotokopi ijazah/SKL, Fotokopi rapor, Fotokopi akta kelahiran, Fotokopi KK, Pas foto 3x4 (6 lembar), dan Surat keterangan sehat.",
          category: "Pendaftaran",
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
      label: "Badge",
      name: "badge",
      description: "Small badge text above title",
    },
    {
      type: "string" as const,
      label: "Layout",
      name: "layout",
      options: ["centered", "withImage", "twoColumn"],
      description: "Choose FAQ layout style",
    },
    {
      type: "image" as const,
      label: "Side Image",
      name: "sideImage",
      description: "Image for 'withImage' layout",
    },
    {
      type: "string" as const,
      label: "Side Image Alt",
      name: "sideImageAlt",
    },
    {
      type: "string" as const,
      label: "Image Caption",
      name: "imageCaption",
    },
    {
      type: "object" as const,
      label: "FAQ Items",
      name: "faqItems",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.question || "FAQ Item",
          };
        },
        defaultItem: {
          ...defaultFaqItem,
        },
      },
      fields: [
        {
          type: "string" as const,
          label: "Question",
          name: "question",
        },
        {
          type: "rich-text" as const,
          label: "Answer",
          name: "answer",
        },
        {
          type: "string" as const,
          label: "Category",
          name: "category",
          description: "Optional category badge",
        },
      ],
    },
    {
      type: "object" as const,
      label: "FAQ Items Column 2",
      name: "faqItemsColumn2",
      description: "Second column items for 'twoColumn' layout",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.question || "FAQ Item",
          };
        },
        defaultItem: {
          ...defaultFaqItem,
        },
      },
      fields: [
        {
          type: "string" as const,
          label: "Question",
          name: "question",
        },
        {
          type: "rich-text" as const,
          label: "Answer",
          name: "answer",
        },
        {
          type: "string" as const,
          label: "Category",
          name: "category",
          description: "Optional category badge",
        },
      ],
    },
    {
      type: "boolean" as const,
      label: "Show CTA",
      name: "showCta",
      description: "Show call-to-action section at bottom",
    },
    {
      type: "string" as const,
      label: "CTA Title",
      name: "ctaTitle",
    },
    {
      type: "string" as const,
      label: "CTA Description",
      name: "ctaDescription",
    },
    {
      type: "string" as const,
      label: "CTA Button Text",
      name: "ctaButtonText",
    },
    {
      type: "string" as const,
      label: "CTA Link",
      name: "ctaLink",
    },
  ],
};