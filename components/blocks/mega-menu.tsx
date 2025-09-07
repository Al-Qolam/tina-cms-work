"use client";

import { ArrowRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import {
  PageBlocksMegaMenu,
  PageBlocksMegaMenuMenuItems,
  PageBlocksMegaMenuMenuItemsSubItems,
} from "../../tina/__generated__/types";
import { useEffect, useRef, useState } from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Icon } from "../icon";
import Link from "next/link";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";

export const MegaMenu = ({ data }: { data: PageBlocksMegaMenu }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className={`${data.sticky ? 'sticky top-0 z-50' : 'relative'} bg-background border-b border-border`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            {data.logo ? (
              <img
                src={data.logo}
                alt={data.logoAlt || "Logo"}
                className="h-8 w-auto"
                data-tina-field={tinaField(data, 'logo')}
              />
            ) : (
              <span 
                className="text-xl font-bold text-foreground"
                data-tina-field={tinaField(data, 'brandName')}
              >
                {data.brandName || "Brand"}
              </span>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {data.menuItems?.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item?.subItems && item.subItems.length > 0 ? handleMouseEnter(index) : setActiveDropdown(null)}
                onMouseLeave={handleMouseLeave}
              >
                {item?.subItems && item.subItems.length > 0 ? (
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    data-tina-field={tinaField(item, 'label')}
                  >
                    {item.icon && (
                      <Icon
                        data={{ size: "small", ...item.icon }}
                        className="w-4 h-4"
                      />
                    )}
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={item?.link || "#"}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    data-tina-field={tinaField(item, 'label')}
                  >
                    {item?.icon && (
                      <Icon
                        data={{ size: "small", ...item.icon }}
                        className="w-4 h-4"
                      />
                    )}
                    {item?.label}
                  </Link>
                )}

                {/* Mega Menu Dropdown */}
                {item?.subItems && item.subItems.length > 0 && activeDropdown === index && (
                  <div className="absolute mt-0 w-screen max-w-7xl -translate-x-1/2 left-1/2">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative bg-white dark:bg-zinc-900">
                        <div className="mx-auto max-w-7xl px-8 py-6">
                          {item.megaMenuLayout === "columns" ? (
                            <div className="grid grid-cols-4 gap-6">
                              {item.subItems.map((subItem, subIndex) => (
                                <MegaMenuItem key={subIndex} {...subItem!} />
                              ))}
                            </div>
                          ) : item.megaMenuLayout === "featured" ? (
                            <div className="grid grid-cols-3 gap-8">
                              <div className="col-span-2 grid grid-cols-2 gap-4">
                                {item.subItems.slice(0, -1).map((subItem, subIndex) => (
                                  <MegaMenuItem key={subIndex} {...subItem!} />
                                ))}
                              </div>
                              {item.subItems[item.subItems.length - 1] && (
                                <div className="bg-muted/50 rounded-lg p-6">
                                  <MegaMenuItem {...item.subItems[item.subItems.length - 1]!} featured />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="grid grid-cols-3 gap-8">
                              <div className="col-span-2">
                                <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                                  {item.groupTitle || "Menu"}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                  {item.subItems.map((subItem, subIndex) => (
                                    <MegaMenuItem key={subIndex} {...subItem!} />
                                  ))}
                                </div>
                              </div>
                              {item.sideContent && (
                                <div className="bg-muted/50 rounded-lg p-6">
                                  <h4 className="font-semibold mb-3">{item.sideContentTitle}</h4>
                                  <p className="text-sm text-muted-foreground mb-4">{item.sideContent}</p>
                                  {item.sideContentLink && (
                                    <Link
                                      href={item.sideContentLink}
                                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                                    >
                                      {item.sideContentLinkText || "Learn more"}
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Buttons */}
            {data.ctaButtons && data.ctaButtons.length > 0 && (
              <div className="ml-6 flex items-center gap-3">
                {data.ctaButtons.map((cta, index) => (
                  <Button
                    key={index}
                    variant={cta?.variant as any || "default"}
                    size="sm"
                    asChild
                  >
                    <Link href={cta?.link || "#"}>
                      {cta?.icon && (
                        <Icon
                          data={{ size: "small", ...cta.icon }}
                          className="w-4 h-4 mr-2"
                        />
                      )}
                      {cta?.text}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {data.menuItems?.map((item, index) => (
              <div key={index}>
                {item?.subItems && item.subItems.length > 0 ? (
                  <>
                    <button
                      onClick={() => setMobileActiveDropdown(mobileActiveDropdown === index ? null : index)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon && (
                          <Icon
                            data={{ size: "small", ...item.icon }}
                            className="w-4 h-4"
                          />
                        )}
                        {item.label}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileActiveDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileActiveDropdown === index && (
                      <div className="pl-4 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem?.link || "#"}
                            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
                          >
                            {subItem?.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item?.link || "#"}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {item?.icon && (
                      <Icon
                        data={{ size: "small", ...item.icon }}
                        className="w-4 h-4"
                      />
                    )}
                    {item?.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA Buttons */}
            {data.ctaButtons && data.ctaButtons.length > 0 && (
              <div className="mt-4 space-y-2 px-3">
                {data.ctaButtons.map((cta, index) => (
                  <Button
                    key={index}
                    variant={cta?.variant as any || "default"}
                    className="w-full"
                    asChild
                  >
                    <Link href={cta?.link || "#"}>
                      {cta?.icon && (
                        <Icon
                          data={{ size: "small", ...cta.icon }}
                          className="w-4 h-4 mr-2"
                        />
                      )}
                      {cta?.text}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const MegaMenuItem: React.FC<PageBlocksMegaMenuMenuItemsSubItems & { featured?: boolean }> = (data) => {
  const { featured } = data;

  if (featured) {
    return (
      <div>
        {data.icon && (
          <Icon
            data={{ size: "medium", ...data.icon }}
            className="w-8 h-8 mb-3 text-primary"
          />
        )}
        <h4 className="font-semibold text-foreground mb-2">{data.label}</h4>
        {data.description && (
          <p className="text-sm text-muted-foreground mb-3">{data.description}</p>
        )}
        {data.link && (
          <Link
            href={data.link}
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            Learn more
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <Link
      href={data.link || "#"}
      className="group flex items-start gap-3 rounded-lg p-3 hover:bg-muted transition-colors"
    >
      {data.icon && (
        <Icon
          data={{ size: "small", ...data.icon }}
          className="w-5 h-5 mt-0.5 text-muted-foreground group-hover:text-primary"
        />
      )}
      <div>
        <h4 className="font-medium text-foreground group-hover:text-primary">
          {data.label}
          {data.badge && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {data.badge}
            </Badge>
          )}
        </h4>
        {data.description && (
          <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
        )}
      </div>
    </Link>
  );
};

// Default data
const defaultSubItem = {
  label: "Menu Item",
  description: "",
  link: "/",
  badge: "",
  icon: null,
};

const defaultMenuItem = {
  label: "Menu",
  link: "/",
  icon: null,
  subItems: [],
  megaMenuLayout: "columns",
  groupTitle: "",
  sideContent: "",
  sideContentTitle: "",
  sideContentLink: "",
  sideContentLinkText: "",
};

const defaultCtaButton = {
  text: "Get Started",
  link: "/",
  variant: "default",
  icon: null,
};

export const megaMenuBlockSchema: Template = {
  name: "megaMenu",
  label: "Mega Menu",
  ui: {
    previewSrc: "/blocks/mega-menu.png",
    defaultItem: {
      brandName: "Nurul Ilmi",
      logo: "",
      logoAlt: "Nurul Ilmi Boarding School",
      sticky: true,
      menuItems: [
        {
          label: "Tentang",
          link: "/tentang",
          subItems: [
            {
              label: "Profil Sekolah",
              description: "Sejarah dan visi misi kami",
              link: "/tentang/profil",
              icon: { name: "FaSchool" },
            },
            {
              label: "Struktur Organisasi",
              description: "Pengurus dan staff pengajar",
              link: "/tentang/struktur",
              icon: { name: "FaUsers" },
            },
            {
              label: "Fasilitas",
              description: "Sarana dan prasarana lengkap",
              link: "/tentang/fasilitas",
              icon: { name: "FaBuilding" },
            },
            {
              label: "Prestasi",
              description: "Pencapaian santri kami",
              link: "/tentang/prestasi",
              icon: { name: "FaTrophy" },
              badge: "New",
            },
          ],
          megaMenuLayout: "columns",
        },
        {
          label: "Program",
          link: "/program",
          subItems: [
            {
              label: "Tahfidz Al-Qur'an",
              description: "Program menghafal 30 juz",
              link: "/program/tahfidz",
              icon: { name: "FaQuran" },
            },
            {
              label: "Pendidikan Formal",
              description: "SMP & SMA terakreditasi A",
              link: "/program/formal",
              icon: { name: "FaGraduationCap" },
            },
            {
              label: "Bahasa Arab & Inggris",
              description: "Program bahasa intensif",
              link: "/program/bahasa",
              icon: { name: "FaLanguage" },
            },
            {
              label: "Ekstrakurikuler",
              description: "Beragam kegiatan pengembangan diri",
              link: "/program/ekstrakurikuler",
              icon: { name: "FaFutbol" },
            },
            {
              label: "Life Skills",
              description: "Keterampilan hidup praktis",
              link: "/program/life-skills",
              icon: { name: "FaTools" },
            },
          ],
          megaMenuLayout: "featured",
        },
        {
          label: "PPDB",
          link: "/ppdb",
          subItems: [
            {
              label: "Informasi Pendaftaran",
              description: "Syarat dan ketentuan PPDB",
              link: "/ppdb/info",
              icon: { name: "FaInfoCircle" },
            },
            {
              label: "Alur Pendaftaran",
              description: "Langkah-langkah mendaftar",
              link: "/ppdb/alur",
              icon: { name: "FaListOl" },
            },
            {
              label: "Biaya Pendidikan",
              description: "Rincian biaya sekolah",
              link: "/ppdb/biaya",
              icon: { name: "FaMoneyBillWave" },
            },
            {
              label: "Beasiswa",
              description: "Program bantuan pendidikan",
              link: "/ppdb/beasiswa",
              icon: { name: "FaHandHoldingHeart" },
              badge: "Tersedia",
            },
          ],
          megaMenuLayout: "grouped",
          groupTitle: "Penerimaan Peserta Didik Baru",
          sideContentTitle: "PPDB 2024/2025 Telah Dibuka!",
          sideContent: "Daftarkan putra-putri Anda segera. Kuota terbatas!",
          sideContentLink: "/ppdb/daftar",
          sideContentLinkText: "Daftar Sekarang",
        },
        {
          label: "Berita",
          link: "/berita",
        },
        {
          label: "Galeri",
          link: "/galeri",
        },
        {
          label: "Kontak",
          link: "/kontak",
        },
      ],
      ctaButtons: [
        {
          text: "Portal Siswa",
          link: "/portal",
          variant: "outline",
          icon: { name: "FaUser" },
        },
        {
          text: "Daftar PPDB",
          link: "/ppdb/daftar",
          variant: "default",
          icon: { name: "FaEdit" },
        },
      ],
    },
  },
  fields: [
    {
      type: "string" as const,
      label: "Brand Name",
      name: "brandName",
    },
    {
      type: "image" as const,
      label: "Logo",
      name: "logo",
    },
    {
      type: "string" as const,
      label: "Logo Alt Text",
      name: "logoAlt",
    },
    {
      type: "boolean" as const,
      label: "Sticky Navigation",
      name: "sticky",
      description: "Make navigation stick to top on scroll",
    },
    {
      type: "object" as const,
      label: "Menu Items",
      name: "menuItems",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.label || "Menu Item",
        }),
        defaultItem: { ...defaultMenuItem },
      },
      fields: [
        {
          type: "string" as const,
          label: "Label",
          name: "label",
        },
        {
          type: "string" as const,
          label: "Link",
          name: "link",
        },
        {
          type: "object" as const,
          label: "Icon",
          name: "icon",
          fields: [
            {
              type: "string" as const,
              label: "Icon Name",
              name: "name",
            },
          ],
        },
        {
          type: "string" as const,
          label: "Mega Menu Layout",
          name: "megaMenuLayout",
          options: ["columns", "featured", "grouped"],
          description: "Layout style for dropdown menu",
        },
        {
          type: "string" as const,
          label: "Group Title (for grouped layout)",
          name: "groupTitle",
        },
        {
          type: "string" as const,
          label: "Side Content (for grouped layout)",
          name: "sideContent",
        },
        {
          type: "string" as const,
          label: "Side Content Title",
          name: "sideContentTitle",
        },
        {
          type: "string" as const,
          label: "Side Content Link",
          name: "sideContentLink",
        },
        {
          type: "string" as const,
          label: "Side Content Link Text",
          name: "sideContentLinkText",
        },
        {
          type: "object" as const,
          label: "Sub Items",
          name: "subItems",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.label || "Sub Item",
            }),
            defaultItem: { ...defaultSubItem },
          },
          fields: [
            {
              type: "string" as const,
              label: "Label",
              name: "label",
            },
            {
              type: "string" as const,
              label: "Description",
              name: "description",
            },
            {
              type: "string" as const,
              label: "Link",
              name: "link",
            },
            {
              type: "string" as const,
              label: "Badge",
              name: "badge",
            },
            {
              type: "object" as const,
              label: "Icon",
              name: "icon",
              fields: [
                {
                  type: "string" as const,
                  label: "Icon Name",
                  name: "name",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object" as const,
      label: "CTA Buttons",
      name: "ctaButtons",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.text || "Button",
        }),
        defaultItem: { ...defaultCtaButton },
      },
      fields: [
        {
          type: "string" as const,
          label: "Text",
          name: "text",
        },
        {
          type: "string" as const,
          label: "Link",
          name: "link",
        },
        {
          type: "string" as const,
          label: "Variant",
          name: "variant",
          options: ["default", "outline", "secondary", "ghost"],
        },
        {
          type: "object" as const,
          label: "Icon",
          name: "icon",
          fields: [
            {
              type: "string" as const,
              label: "Icon Name",
              name: "name",
            },
          ],
        },
      ],
    },
  ],
};