"use client";
import {
  PageBlocksEducationCosts,
  PageBlocksEducationCostsCostItems,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Icon } from "../icon";
import { iconSchema } from "../../tina/fields/icon";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { DollarSign, Heart, AlertTriangle } from "lucide-react";

export const EducationCosts = ({ data }: { data: PageBlocksEducationCosts }) => {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-6xl px-6">
        <Card className="w-full shadow-lg border-0 bg-gradient-to-br from-accent/10 to-accent/20 dark:from-zinc-900 dark:to-zinc-800">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-accent/30 dark:bg-accent/10 rounded-full flex items-center justify-center mb-4">
              {data.headerIcon && (
                <Icon
                  tinaField={tinaField(data, "headerIcon")}
                  data={{ size: "large", ...data.headerIcon }}
                />
              )}
            </div>
            <CardTitle
              data-tina-field={tinaField(data, 'title')}
              className="text-3xl font-bold text-primary dark:text-accent text-balance"
            >
              {data.title}
            </CardTitle>
            <p 
              data-tina-field={tinaField(data, 'subtitle')} 
              className="text-muted-foreground mt-2"
            >
              {data.subtitle}
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
              {data.costItems &&
                data.costItems.map(function (item, i) {
                  return <CostCard key={i} {...item!} />;
                })}
            </div>

            <div className="space-y-4">
              {data.infoAlerts &&
                data.infoAlerts.map(function (alert, i) {
                  return <InfoAlert key={i} {...alert!} />;
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export const CostCard: React.FC<PageBlocksEducationCostsCostItems> = (data) => {
  const gradientColors = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600",
    teal: "from-teal-500 to-teal-600",
  };

  const textColors = {
    blue: "text-blue-600 dark:text-blue-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    purple: "text-purple-600 dark:text-purple-400",
    orange: "text-orange-600 dark:text-orange-400",
    pink: "text-pink-600 dark:text-pink-400",
    teal: "text-teal-600 dark:text-teal-400",
  };

  const colorScheme = data.colorScheme || "blue";
  const gradient = gradientColors[colorScheme as keyof typeof gradientColors] || gradientColors.blue;
  const textColor = textColors[colorScheme as keyof typeof textColors] || textColors.blue;

  return (
    <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}></div>
      <CardContent className="p-6 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
            {data.icon && (
              <Icon
                tinaField={tinaField(data, "icon")}
                data={{ size: "small", ...data.icon }}
                className="text-white"
              />
            )}
          </div>
          {data.badge && (
            <Badge variant="secondary" className="text-xs">
              {data.badge}
            </Badge>
          )}
        </div>
        <h3 
          data-tina-field={tinaField(data, "title")}
          className="font-semibold text-lg mb-2 text-foreground"
        >
          {data.title}
        </h3>
        <p 
          data-tina-field={tinaField(data, "amount")}
          className={`text-2xl font-bold ${textColor} mb-3`}
        >
          {data.amount}
        </p>
        <p 
          data-tina-field={tinaField(data, "description")}
          className="text-sm text-muted-foreground leading-relaxed"
        >
          {data.description}
        </p>
      </CardContent>
    </Card>
  );
};

export const InfoAlert: React.FC<any> = (data) => {
  const alertStyles = {
    success: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30",
    warning: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
    error: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
    info: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
  };

  const textStyles = {
    success: "text-emerald-800 dark:text-emerald-200",
    warning: "text-amber-800 dark:text-amber-200",
    error: "text-red-800 dark:text-red-200",
    info: "text-blue-800 dark:text-blue-200",
  };

  const variant = data.variant || "info";
  const alertStyle = alertStyles[variant as keyof typeof alertStyles] || alertStyles.info;
  const textStyle = textStyles[variant as keyof typeof textStyles] || textStyles.info;

  return (
    <Alert className={alertStyle}>
      {data.icon && (
        <Icon
          data={{ size: "small", ...data.icon }}
          className="h-4 w-4"
        />
      )}
      <AlertDescription className={textStyle}>
        <span 
          data-tina-field={tinaField(data, "title")}
          className="font-semibold"
        >
          {data.title}
        </span>
        <br />
        <div data-tina-field={tinaField(data, "content")}>
          <TinaMarkdown content={data.content} />
        </div>
      </AlertDescription>
    </Alert>
  );
};

const defaultCostItem = {
  title: "Biaya Pendaftaran",
  amount: "Rp400.000",
  description: "Biaya sekali bayar saat mendaftar",
  badge: "Sekali Bayar",
  colorScheme: "blue",
  icon: {
    color: "",
    style: "float",
    name: "FaCreditCard",
  },
};

const defaultAlert = {
  title: "Informasi Penting",
  content: "Keterangan atau informasi tambahan mengenai biaya pendidikan.",
  variant: "info",
  icon: {
    color: "",
    style: "float",
    name: "FaInfoCircle",
  },
};

export const educationCostsBlockSchema: Template = {
  name: "educationCosts",
  label: "Education Costs",
  ui: {
    previewSrc: "/blocks/education-costs.png",
    defaultItem: {
      title: "Biaya Pendidikan",
      subtitle: "Investasi terbaik untuk masa depan putra-putri Anda",
      headerIcon: {
        color: "",
        style: "float",
        name: "FaDollarSign",
      },
      costItems: [
        {
          ...defaultCostItem,
          title: "Biaya Pendaftaran",
          amount: "Rp400.000",
          description: "Biaya sekali bayar saat mendaftar",
          badge: "Sekali Bayar",
          colorScheme: "blue",
          icon: {
            color: "",
            style: "float",
            name: "FaCreditCard",
          },
        },
        {
          ...defaultCostItem,
          title: "Uang Pangkal",
          amount: "mulai Rp10.000.000",
          description: "Bisa diangsur sesuai kemampuan",
          badge: "Dapat Diangsur",
          colorScheme: "emerald",
          icon: {
            color: "",
            style: "float",
            name: "FaMoneyBillWave",
          },
        },
        {
          ...defaultCostItem,
          title: "SPP Bulanan",
          amount: "mulai Rp1.500.000",
          description: "Mencakup pendidikan, asrama, dan makan",
          badge: "Bulanan",
          colorScheme: "purple",
          icon: {
            color: "",
            style: "float",
            name: "FaDollarSign",
          },
        },
      ],
      infoAlerts: [
        {
          title: "Keringanan Biaya Tersedia",
          content: "Bagi yang membutuhkan, silakan ajukan dengan Surat Keterangan Tidak Mampu (SKTM).",
          variant: "success",
          icon: {
            color: "",
            style: "float",
            name: "FaHeart",
          },
        },
        {
          title: "Kebijakan Pengembalian",
          content: "Jika mengundurkan diri setelah pembayaran, seluruh biaya tidak dapat dikembalikan.",
          variant: "error",
          icon: {
            color: "",
            style: "float",
            name: "FaExclamationTriangle",
          },
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
    iconSchema as any,
    {
      type: "object" as const,
      label: "Cost Items",
      name: "costItems",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title || "Cost Item",
          };
        },
        defaultItem: {
          ...defaultCostItem,
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
          label: "Amount",
          name: "amount",
        },
        {
          type: "string" as const,
          label: "Description",
          name: "description",
        },
        {
          type: "string" as const,
          label: "Badge",
          name: "badge",
        },
        {
          type: "string" as const,
          label: "Color Scheme",
          name: "colorScheme",
          options: ["blue", "emerald", "purple", "orange", "pink", "teal"],
        },
        iconSchema as any,
      ],
    },
    {
      type: "object" as const,
      label: "Info Alerts",
      name: "infoAlerts",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title || "Alert",
          };
        },
        defaultItem: {
          ...defaultAlert,
        },
      },
      fields: [
        {
          type: "string" as const,
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text" as const,
          label: "Content",
          name: "content",
        },
        {
          type: "string" as const,
          label: "Variant",
          name: "variant",
          options: ["success", "warning", "error", "info"],
        },
        iconSchema as any,
      ],
    },
  ],
};