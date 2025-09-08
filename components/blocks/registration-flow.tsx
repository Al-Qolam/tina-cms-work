"use client";
import {
  PageBlocksRegistrationFlow,
  PageBlocksRegistrationFlowSteps,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Icon } from "../icon";
import { iconSchema } from "../../tina/fields/icon";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';

export const RegistrationFlow = ({ data }: { data: PageBlocksRegistrationFlow }) => {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          {data.badge && (
            <div>
              <p 
                data-tina-field={tinaField(data, 'badge')}
                className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400/20 dark:text-teal-200 dark:bg-teal-400/10"
              >
                {data.badge}
              </p>
            </div>
          )}
          <h2 
            data-tina-field={tinaField(data, 'title')}
            className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:mx-auto"
          >
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-100 dark:text-blue-900/50 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern id="registration-pattern" x="0" y="0" width=".135" height=".30">
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect fill="url(#registration-pattern)" width="52" height="24" />
              </svg>
              <span className="relative">{data.titleHighlight}</span>
            </span>{" "}
            {data.titleRest}
          </h2>
          <p 
            data-tina-field={tinaField(data, 'description')}
            className="text-base text-gray-700 dark:text-gray-300 md:text-lg"
          >
            {data.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:py-6 lg:pr-16">
            {data.steps &&
              data.steps.map(function (step, i) {
                const isLast = i === data.steps!.length - 1;
                return <StepItem key={i} {...step!} isLast={isLast} stepNumber={i + 1} />;
              })}
          </div>

          {data.imageUrl && (
            <div className="relative">
              <img
                data-tina-field={tinaField(data, 'imageUrl')}
                className="inset-0 img-cover-safe object-center w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
                src={data.imageUrl}
                alt={data.imageAlt || "Registration illustration"}
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export const StepItem: React.FC<PageBlocksRegistrationFlowSteps & { isLast: boolean; stepNumber: number }> = (data) => {
  const { isLast, stepNumber } = data;
  
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div>
          <div className="flex items-center justify-center w-10 h-10 border rounded-full dark:border-gray-600">
            {data.icon ? (
              <Icon
                tinaField={tinaField(data, "icon")}
                data={{ size: "small", ...data.icon }}
                className="w-4 text-gray-600 dark:text-gray-400"
              />
            ) : (
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{stepNumber}</span>
            )}
          </div>
        </div>
        {!isLast && <div className="w-px h-full bg-gray-300 dark:bg-gray-600" />}
      </div>
      <div className={`pt-1 ${!isLast ? 'pb-8' : ''}`}>
        <p 
          data-tina-field={tinaField(data, 'stepLabel')}
          className="mb-2 text-lg font-bold"
        >
          {data.stepLabel || `Step ${stepNumber}`}
        </p>
        <h3 
          data-tina-field={tinaField(data, 'title')}
          className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-2"
        >
          {data.title}
        </h3>
        <div 
          data-tina-field={tinaField(data, 'description')}
          className="text-gray-700 dark:text-gray-300 mb-3"
        >
          <TinaMarkdown content={data.description} />
        </div>
        {data.details && (
          <div 
            data-tina-field={tinaField(data, 'details')}
            className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg"
          >
            <TinaMarkdown content={data.details} />
          </div>
        )}
        {data.bulletPoints && data.bulletPoints.length > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-2">
            {data.bulletPoints.map((point, idx) => (
              <p key={idx} data-tina-field={tinaField(data, `bulletPoints.${idx}`)}>
                • {point}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const defaultStep = {
  stepLabel: "Step 1",
  title: "Step Title",
  description: "Description of what happens in this step.",
  details: "",
  bulletPoints: [],
  icon: {
    color: "",
    style: "float",
    name: "FaCheckCircle",
  },
};

export const registrationFlowBlockSchema: Template = {
  name: "registrationFlow",
  label: "Registration Flow",
  ui: {
    previewSrc: "/blocks/registration-flow.png",
    defaultItem: {
      badge: "PPDB 2024",
      title: "Alur",
      titleHighlight: "Alur",
      titleRest: "Pendaftaran PPDB NIBS",
      description: "Ikuti 5 langkah mudah untuk bergabung dengan Nurul Ilmi Boarding School dan menjadi bagian dari generasi Qur'ani yang unggul.",
      imageUrl: "/placeholder.svg?height=600&width=400",
      imageAlt: "Santri NIBS sedang belajar",
      steps: [
        {
          stepLabel: "Step 1",
          title: "Daftar via WhatsApp",
          description: "Kirim format pendaftaran lengkap ke nomor WhatsApp resmi PPDB NIBS.",
          details: "**Format:**\nPPDB NIBS_NAMA LENGKAP_JENIS KELAMIN_TEMPAT LAHIR_NAMA AYAH_NAMA IBU_ALAMAT_ASAL SEKOLAH_NO.HP\n\n📱 **0812-7836-2771** (Ust. Hendra)",
          icon: {
            color: "",
            style: "float",
            name: "FaCommentDots",
          },
        },
        {
          stepLabel: "Step 2",
          title: "Transfer Biaya Pendaftaran",
          description: "Transfer biaya pendaftaran sebesar Rp400.000 dan kirim bukti transfer.",
          details: "💳 **BSI 7889997413**\na.n. PPDB Nurul Ilmi",
          icon: {
            color: "",
            style: "float",
            name: "FaCreditCard",
          },
        },
        {
          stepLabel: "Step 3",
          title: "Mengikuti Tes",
          description: "Ikuti serangkaian tes komprehensif di kampus NIBS.",
          bulletPoints: [
            "Tes wawasan keislaman & ilmu umum",
            "Tes baca/tulis Al-Qur'an",
            "Tes potensi menghafal Al-Qur'an",
            "Wawancara santri & orang tua",
          ],
          icon: {
            color: "",
            style: "float",
            name: "FaFileAlt",
          },
        },
        {
          stepLabel: "Step 4",
          title: "Pengumuman",
          description: "Hasil tes akan diumumkan maksimal 14 hari setelah pelaksanaan tes melalui WhatsApp.",
          icon: {
            color: "",
            style: "float",
            name: "FaBullhorn",
          },
        },
        {
          stepLabel: "Success",
          title: "Daftar Ulang",
          description: "Lakukan daftar ulang maksimal 14 hari setelah dinyatakan lulus untuk mengamankan tempat di NIBS.",
          icon: {
            color: "",
            style: "float",
            name: "FaCheckCircle",
          },
        },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string" as const,
      label: "Badge",
      name: "badge",
    },
    {
      type: "string" as const,
      label: "Title Highlight",
      name: "titleHighlight",
      description: "The highlighted part of the title",
    },
    {
      type: "string" as const,
      label: "Title Rest",
      name: "titleRest",
      description: "The rest of the title after the highlight",
    },
    {
      type: "string" as const,
      label: "Description",
      name: "description",
    },
    {
      type: "string" as const,
      label: "Image URL",
      name: "imageUrl",
    },
    {
      type: "string" as const,
      label: "Image Alt Text",
      name: "imageAlt",
    },
    {
      type: "object" as const,
      label: "Steps",
      name: "steps",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title || "Step",
          };
        },
        defaultItem: {
          ...defaultStep,
        },
      },
      fields: [
        {
          type: "string" as const,
          label: "Step Label",
          name: "stepLabel",
        },
        {
          type: "string" as const,
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text" as const,
          label: "Description",
          name: "description",
        },
        {
          type: "rich-text" as const,
          label: "Details",
          name: "details",
          description: "Additional details shown in a highlighted box",
        },
        {
          type: "string" as const,
          label: "Bullet Points",
          name: "bulletPoints",
          list: true,
        },
        iconSchema as any,
      ],
    },
  ],
};