"use client";
import {
  PageBlocksStaffFeatured,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Globe, Award, BookOpen, Users, Calendar } from "lucide-react";

export const StaffFeatured = ({ data }: { data: PageBlocksStaffFeatured }) => {
  const stats = [
    { icon: Calendar, label: "Years Experience", value: data.yearsExperience },
    { icon: Users, label: "Students Taught", value: data.studentsTaught },
    { icon: BookOpen, label: "Courses", value: data.coursesCount },
    { icon: Award, label: "Awards", value: data.awardsCount },
  ].filter(stat => stat.value);

  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-6xl px-6">
        {/* Header */}
        {(data.sectionTitle || data.sectionSubtitle) && (
          <div className="text-center mb-12">
            {data.sectionTitle && (
              <h2 
                data-tina-field={tinaField(data, 'sectionTitle')} 
                className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4"
              >
                {data.sectionTitle}
              </h2>
            )}
            {data.sectionSubtitle && (
              <p 
                data-tina-field={tinaField(data, 'sectionSubtitle')}
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
              >
                {data.sectionSubtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt={data.name || "Featured staff"}
                  className="w-full h-full object-cover"
                  data-tina-field={tinaField(data, 'avatar')}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-muted-foreground">
                  {data.name ? data.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'FS'}
                </div>
              )}
              
              {/* Decorative Badge */}
              {data.featuredBadge && (
                <div className="absolute top-6 right-6">
                  <Badge className="px-4 py-2 text-sm bg-primary/90 backdrop-blur-sm">
                    {data.featuredBadge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Quote Decoration */}
            {data.quote && (
              <div className="absolute -bottom-6 -right-6 bg-primary/10 backdrop-blur-sm rounded-xl p-6 max-w-xs hidden lg:block">
                <svg className="w-8 h-8 text-primary mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sm italic text-foreground/80" data-tina-field={tinaField(data, 'quote')}>
                  "{data.quote}"
                </p>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Name and Title */}
            <div>
              <h3 
                className="text-3xl lg:text-4xl font-bold text-foreground mb-2"
                data-tina-field={tinaField(data, 'name')}
              >
                {data.name}
              </h3>
              <p 
                className="text-xl text-primary font-medium mb-2"
                data-tina-field={tinaField(data, 'role')}
              >
                {data.role}
              </p>
              {data.department && (
                <Badge variant="secondary" className="text-sm">
                  {data.department}
                </Badge>
              )}
            </div>

            {/* Bio */}
            {data.fullBio && (
              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                data-tina-field={tinaField(data, 'fullBio')}
              >
                <p className="text-muted-foreground">
                  {data.fullBio}
                </p>
              </div>
            )}

            {/* Stats */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Expertise */}
            {data.expertise && data.expertise.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {data.expertise.map((skill, i) => (
                    <Badge 
                      key={i} 
                      variant="outline"
                      data-tina-field={tinaField(data, `expertise.${i}`)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Education</h4>
                <ul className="space-y-2">
                  {data.education.map((edu, i) => (
                    <li 
                      key={i} 
                      className="text-sm text-foreground"
                      data-tina-field={tinaField(data, `education.${i}`)}
                    >
                      • {edu}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-3">
              {data.email && (
                <a 
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  data-tina-field={tinaField(data, 'email')}
                >
                  <Mail className="w-5 h-5" />
                  <span>{data.email}</span>
                </a>
              )}
              {data.phone && (
                <a 
                  href={`tel:${data.phone}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  data-tina-field={tinaField(data, 'phone')}
                >
                  <Phone className="w-5 h-5" />
                  <span>{data.phone}</span>
                </a>
              )}
              {data.location && (
                <div 
                  className="flex items-center gap-3 text-muted-foreground"
                  data-tina-field={tinaField(data, 'location')}
                >
                  <MapPin className="w-5 h-5" />
                  <span>{data.location}</span>
                </div>
              )}
            </div>

            {/* Social Links & CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Social Icons */}
              <div className="flex gap-3">
                {data.linkedin && (
                  <a 
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {data.twitter && (
                  <a 
                    href={data.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {data.website && (
                  <a 
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* CTA Buttons */}
              {data.ctaText && data.ctaLink && (
                <Button asChild>
                  <Link href={data.ctaLink}>
                    {data.ctaText}
                  </Link>
                </Button>
              )}
              {data.secondaryCtaText && data.secondaryCtaLink && (
                <Button variant="outline" asChild>
                  <Link href={data.secondaryCtaLink}>
                    {data.secondaryCtaText}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const staffFeaturedBlockSchema: Template = {
  name: "staffFeatured",
  label: "Staff Featured",
  ui: {
    previewSrc: "/blocks/staff-featured.png",
    defaultItem: {
      sectionTitle: "Featured Educator",
      sectionSubtitle: "Get to know our distinguished team member",
      name: "Dr. Ahmad Ibrahim",
      role: "Kepala Sekolah & Founder",
      department: "Leadership",
      featuredBadge: "20+ Years Experience",
      fullBio: "Dr. Ahmad Ibrahim adalah pendidik visioner dengan lebih dari 20 tahun pengalaman dalam pendidikan Islam modern. Beliau mendirikan Nurul Ilmi Boarding School dengan visi menciptakan generasi Qur'ani yang unggul dalam ilmu agama dan umum. Lulusan Al-Azhar University Kairo dengan doktor dalam Pendidikan Islam, Dr. Ahmad telah mengembangkan kurikulum integratif yang menggabungkan hafalan Al-Qur'an dengan akademik excellence.",
      quote: "Pendidikan sejati adalah yang membentuk karakter, mencerahkan akal, dan menyucikan jiwa.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800",
      email: "ahmad.ibrahim@nibs.ac.id",
      phone: "+62 812-3456-7890",
      location: "Malang, East Java, Indonesia",
      yearsExperience: "20+",
      studentsTaught: "5000+",
      coursesCount: "15",
      awardsCount: "12",
      expertise: [
        "Islamic Education",
        "Curriculum Development",
        "School Management",
        "Tahfidz Methodology",
        "Character Building",
        "Educational Leadership",
      ],
      education: [
        "Ph.D. in Islamic Education - Al-Azhar University, Cairo",
        "M.A. in Educational Management - International Islamic University",
        "B.A. in Islamic Studies - Al-Azhar University, Cairo",
      ],
      linkedin: "https://linkedin.com/in/ahmad-ibrahim",
      twitter: "https://twitter.com/ahmad_ibrahim",
      website: "https://ahmadibrahim.com",
      ctaText: "Schedule Meeting",
      ctaLink: "/contact",
      secondaryCtaText: "View Publications",
      secondaryCtaLink: "/publications",
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string" as const,
      label: "Section Title",
      name: "sectionTitle",
    },
    {
      type: "string" as const,
      label: "Section Subtitle",
      name: "sectionSubtitle",
    },
    {
      type: "string" as const,
      label: "Name",
      name: "name",
    },
    {
      type: "string" as const,
      label: "Role/Position",
      name: "role",
    },
    {
      type: "string" as const,
      label: "Department",
      name: "department",
    },
    {
      type: "string" as const,
      label: "Featured Badge",
      name: "featuredBadge",
      description: "Badge text shown on image",
    },
    {
      type: "string" as const,
      label: "Full Bio",
      name: "fullBio",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string" as const,
      label: "Quote",
      name: "quote",
      description: "Inspirational quote from the staff member",
    },
    {
      type: "image" as const,
      label: "Avatar/Photo",
      name: "avatar",
    },
    {
      type: "string" as const,
      label: "Email",
      name: "email",
    },
    {
      type: "string" as const,
      label: "Phone",
      name: "phone",
    },
    {
      type: "string" as const,
      label: "Location",
      name: "location",
    },
    {
      type: "string" as const,
      label: "Years of Experience",
      name: "yearsExperience",
    },
    {
      type: "string" as const,
      label: "Students Taught",
      name: "studentsTaught",
    },
    {
      type: "string" as const,
      label: "Courses Count",
      name: "coursesCount",
    },
    {
      type: "string" as const,
      label: "Awards Count",
      name: "awardsCount",
    },
    {
      type: "string" as const,
      label: "Areas of Expertise",
      name: "expertise",
      list: true,
    },
    {
      type: "string" as const,
      label: "Education",
      name: "education",
      list: true,
    },
    {
      type: "string" as const,
      label: "LinkedIn URL",
      name: "linkedin",
    },
    {
      type: "string" as const,
      label: "Twitter URL",
      name: "twitter",
    },
    {
      type: "string" as const,
      label: "Website URL",
      name: "website",
    },
    {
      type: "string" as const,
      label: "Primary CTA Text",
      name: "ctaText",
    },
    {
      type: "string" as const,
      label: "Primary CTA Link",
      name: "ctaLink",
    },
    {
      type: "string" as const,
      label: "Secondary CTA Text",
      name: "secondaryCtaText",
    },
    {
      type: "string" as const,
      label: "Secondary CTA Link",
      name: "secondaryCtaLink",
    },
  ],
};