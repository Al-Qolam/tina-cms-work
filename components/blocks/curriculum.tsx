"use client";

import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Star,
  Target,
  Trophy,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  PageBlocksCurriculum,
  PageBlocksCurriculumLevels,
  PageBlocksCurriculumLevelsSubjects,
} from "../../tina/__generated__/types";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { Badge } from "../ui/badge";
import { Icon } from "../icon";
import { Progress } from "../ui/progress";
import { Section } from "../layout/section";
import type { Template } from 'tinacms';
import { iconSchema } from "../../tina/fields/icon";
import { sectionBlockSchemaField } from '../layout/section';
import { tinaField } from "tinacms/dist/react";

export const Curriculum = ({ data }: { data: PageBlocksCurriculum }) => {
  const [activeLevel, setActiveLevel] = useState(0);
  const levels = data.levels || [];

  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-7xl px-6">
        {/* Header Section */}
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
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            data-tina-field={tinaField(data, 'title')}
          >
            {data.title}
          </h2>
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            data-tina-field={tinaField(data, 'subtitle')}
          >
            {data.subtitle}
          </p>
        </div>

        {/* Key Features */}
        {data.keyFeatures && data.keyFeatures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {data.keyFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-lg transition-shadow"
                data-tina-field={tinaField(feature)}
              >
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {feature?.icon && (
                      <Icon
                        data={{ size: "large", style: "circle", ...feature.icon }}
                        className="w-16 h-16"
                        tinaField={tinaField(feature, 'icon')}
                      />
                    )}
                  </div>
                  <CardTitle className="text-lg">{feature?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature?.description}</p>
                  {feature?.value && (
                    <div className="mt-4 text-2xl font-bold text-primary">
                      {feature.value}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Curriculum Levels Tabs */}
        {levels.length > 0 && (
          <Tabs defaultValue="0" className="mt-12">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 h-auto p-2">
              {levels.map((level, index) => (
                <TabsTrigger 
                  key={index} 
                  value={index.toString()}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-4 flex flex-col items-center gap-2"
                >
                  {level?.icon && (
                    <Icon
                      data={{ size: "small", ...level.icon }}
                      className="w-5 h-5"
                    />
                  )}
                  <span className="font-semibold">{level?.levelName}</span>
                  {level?.levelBadge && (
                    <Badge variant="secondary" className="text-sm">
                      {level.levelBadge}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {levels.map((level, levelIndex) => (
              <TabsContent key={levelIndex} value={levelIndex.toString()} className="mt-8">
                <div className="space-y-8">
                  {/* Level Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        <GraduationCap className="w-6 h-6 text-primary" />
                        {level?.levelName}
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {level?.levelDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Level Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {level?.duration && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Durasi</p>
                              <p className="font-semibold">{level.duration}</p>
                            </div>
                          </div>
                        )}
                        {level?.totalHours && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Jam Pelajaran</p>
                              <p className="font-semibold">{level.totalHours}</p>
                            </div>
                          </div>
                        )}
                        {level?.targetAge && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Usia</p>
                              <p className="font-semibold">{level.targetAge}</p>
                            </div>
                          </div>
                        )}
                        {level?.certification && (
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Sertifikasi</p>
                              <p className="font-semibold">{level.certification}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Subjects Grid */}
                      {level?.subjects && level.subjects.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            Mata Pelajaran
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {level.subjects.map((subject, subIndex) => (
                              <SubjectCard key={subIndex} subject={subject!} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Learning Outcomes */}
                      {level?.learningOutcomes && level.learningOutcomes.length > 0 && (
                        <div className="mt-8">
                          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            Capaian Pembelajaran
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {level.learningOutcomes.map((outcome, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Extra Activities */}
                      {level?.extraActivities && level.extraActivities.length > 0 && (
                        <div className="mt-8">
                          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-primary" />
                            Kegiatan Ekstrakurikuler
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {level.extraActivities.map((activity, index) => (
                              <Badge key={index} variant="outline">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Assessment Method */}
                  {level?.assessmentMethod && (
                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="text-lg">Metode Penilaian</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{level.assessmentMethod}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* CTA Section */}
        {(data.ctaTitle || data.ctaButton) && (
          <div className="mt-12 text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
            {data.ctaTitle && (
              <h3 className="text-2xl font-bold mb-4">{data.ctaTitle}</h3>
            )}
            {data.ctaDescription && (
              <p className="text-muted-foreground mb-6">{data.ctaDescription}</p>
            )}
            {data.ctaButton && (
              <a
                href={data.ctaButton.href}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                {data.ctaButton.label}
                <Icon data={{ name: "BiChevronRight", size: "small" }} />
              </a>
            )}
          </div>
        )}
      </div>
    </Section>
  );
};

// Subject Card Component
const SubjectCard = ({ subject }: { subject: PageBlocksCurriculumLevelsSubjects }) => {
  const hasProgress = subject.weeklyHours && subject.totalHours;
  const progressValue = hasProgress 
    ? (parseInt(subject.weeklyHours) / parseInt(subject.totalHours)) * 100 
    : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {subject.icon && (
              <Icon
                data={{ size: "small", ...subject.icon }}
                className="w-8 h-8"
              />
            )}
            <div>
              <CardTitle className="text-base">{subject.subjectName}</CardTitle>
              {subject.category && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {subject.category}
                </Badge>
              )}
            </div>
          </div>
          {subject.isCore && (
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {subject.description && (
          <p className="text-sm text-muted-foreground mb-3">{subject.description}</p>
        )}
        
        <div className="space-y-2">
          {subject.weeklyHours && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Jam/Minggu</span>
              <span className="font-semibold">{subject.weeklyHours} jam</span>
            </div>
          )}
          
          {subject.teacher && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pengajar</span>
              <span className="font-semibold">{subject.teacher}</span>
            </div>
          )}
        </div>

        {subject.topics && subject.topics.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs font-semibold mb-2">Topik Pembelajaran:</p>
            <div className="flex flex-wrap gap-1">
              {subject.topics.slice(0, 3).map((topic, index) => (
                <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                  {topic}
                </span>
              ))}
              {subject.topics.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{subject.topics.length - 3} lainnya
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const curriculumBlockSchema: Template = {
  name: "curriculum",
  label: "Curriculum",
  ui: {
    previewSrc: "/blocks/curriculum.png",
    defaultItem: {
      title: "Kurikulum Terpadu",
      subtitle: "Memadukan pendidikan agama dan umum untuk membentuk generasi yang cerdas dan berakhlak mulia",
      badge: "Kurikulum 2024",
      keyFeatures: [
        {
          icon: { name: "BiBook", color: "blue" },
          title: "Kurikulum Nasional",
          description: "Mengikuti standar pendidikan nasional K-13",
          value: "100%"
        },
        {
          icon: { name: "BiMoon", color: "green" },
          title: "Pendidikan Agama",
          description: "Tahfidz, Fiqh, Aqidah, dan Bahasa Arab",
          value: "40%"
        },
        {
          icon: { name: "BiWorld", color: "purple" },
          title: "Bahasa International",
          description: "Bahasa Inggris dan Arab intensif",
          value: "3 Bahasa"
        }
      ],
      levels: [
        {
          levelName: "SMP/MTs",
          levelDescription: "Program pendidikan menengah pertama dengan kurikulum terpadu",
          levelBadge: "Grade 7-9",
          icon: { name: "BiSchool" },
          duration: "3 Tahun",
          totalHours: "42 Jam/Minggu",
          targetAge: "12-15 Tahun",
          certification: "Ijazah Negara",
          subjects: [
            {
              subjectName: "Al-Qur'an & Tahfidz",
              category: "Agama",
              description: "Program menghafal Al-Qur'an dengan target 10 juz",
              weeklyHours: "10",
              totalHours: "420",
              isCore: true,
              icon: { name: "BiBook" },
              teacher: "Ust. Ahmad Fauzi",
              topics: ["Tahsin", "Tahfidz", "Tafsir", "Tajwid"]
            },
            {
              subjectName: "Matematika",
              category: "Umum",
              description: "Matematika dasar dan lanjutan",
              weeklyHours: "5",
              totalHours: "210",
              isCore: true,
              icon: { name: "BiCalculator" },
              teacher: "Ibu Siti Nurhasanah",
              topics: ["Aljabar", "Geometri", "Statistika", "Trigonometri"]
            },
            {
              subjectName: "Bahasa Arab",
              category: "Bahasa",
              description: "Kemampuan berbahasa Arab aktif",
              weeklyHours: "6",
              totalHours: "252",
              isCore: true,
              icon: { name: "BiGlobe" },
              teacher: "Ust. Muhammad Syafii",
              topics: ["Nahwu", "Shorof", "Muhadatsah", "Kitabah"]
            },
            {
              subjectName: "IPA Terpadu",
              category: "Umum",
              description: "Fisika, Kimia, dan Biologi",
              weeklyHours: "4",
              totalHours: "168",
              isCore: true,
              icon: { name: "BiAtom" },
              teacher: "Bpk. Rizki Pratama",
              topics: ["Fisika Dasar", "Kimia", "Biologi", "Praktikum"]
            }
          ],
          learningOutcomes: [
            "Hafal minimal 10 juz Al-Qur'an",
            "Mampu berbahasa Arab dan Inggris aktif",
            "Menguasai ilmu pengetahuan umum sesuai standar nasional",
            "Memiliki akhlak mulia dan kepribadian Islami",
            "Siap melanjutkan ke jenjang SMA/MA",
            "Memiliki keterampilan hidup dasar"
          ],
          extraActivities: [
            "Pramuka",
            "Olahraga",
            "Seni Kaligrafi",
            "Robotika",
            "Debat Bahasa",
            "Tahfidz Club",
            "Science Club"
          ],
          assessmentMethod: "Penilaian berbasis kompetensi dengan ujian semester, ujian praktik, dan penilaian harian. Evaluasi tahfidz dilakukan setiap pekan dengan target hafalan."
        },
        {
          levelName: "SMA/MA",
          levelDescription: "Program pendidikan menengah atas dengan penjurusan IPA/IPS",
          levelBadge: "Grade 10-12",
          icon: { name: "BiGraduationCap" },
          duration: "3 Tahun",
          totalHours: "45 Jam/Minggu",
          targetAge: "15-18 Tahun",
          certification: "Ijazah Negara + Syahadah",
          subjects: [
            {
              subjectName: "Tahfidz Lanjutan",
              category: "Agama",
              description: "Target hafalan 30 juz",
              weeklyHours: "8",
              totalHours: "336",
              isCore: true,
              icon: { name: "BiBook" }
            },
            {
              subjectName: "Fisika/Kimia/Biologi",
              category: "IPA",
              description: "Sains lanjutan untuk jurusan IPA",
              weeklyHours: "6",
              totalHours: "252",
              isCore: true,
              icon: { name: "BiTestTube" }
            }
          ],
          learningOutcomes: [
            "Hafal 30 juz Al-Qur'an (Program Tahfidz)",
            "Siap masuk PTN/PTS favorit",
            "Menguasai bahasa asing (Arab & Inggris)",
            "Memiliki jiwa kepemimpinan"
          ],
          extraActivities: [
            "Olimpiade Sains",
            "Muhadhoroh",
            "Jurnalistik",
            "Enterpreneurship"
          ]
        },
        {
          levelName: "Program Tahfidz",
          levelDescription: "Program khusus menghafal 30 juz dengan pemahaman mendalam",
          levelBadge: "Special",
          icon: { name: "BiStar" },
          duration: "3-4 Tahun",
          totalHours: "50 Jam/Minggu",
          targetAge: "12-20 Tahun",
          certification: "Syahadah Tahfidz",
          subjects: [
            {
              subjectName: "Tahfidz Intensif",
              category: "Tahfidz",
              description: "Menghafal dengan target 10 juz per tahun",
              weeklyHours: "20",
              totalHours: "840",
              isCore: true,
              icon: { name: "BiBookOpen" }
            },
            {
              subjectName: "Ulumul Qur'an",
              category: "Agama",
              description: "Ilmu-ilmu Al-Qur'an",
              weeklyHours: "4",
              totalHours: "168",
              isCore: true,
              icon: { name: "BiBookReader" }
            }
          ],
          learningOutcomes: [
            "Hafal 30 juz Al-Qur'an dengan tajwid yang benar",
            "Memahami tafsir dan asbabun nuzul",
            "Mampu menjadi imam dan khatib",
            "Siap menjadi pengajar Al-Qur'an"
          ]
        }
      ],
      ctaTitle: "Bergabunglah dengan Kami",
      ctaDescription: "Daftarkan putra-putri Anda untuk mendapatkan pendidikan terbaik",
      ctaButton: {
        label: "Lihat Info PPDB",
        href: "/ppdb"
      }
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
      type: "object" as const,
      label: "Key Features",
      name: "keyFeatures",
      list: true,
      fields: [
        iconSchema as any,
        {
          type: "string" as const,
          label: "Title",
          name: "title",
        },
        {
          type: "string" as const,
          label: "Description",
          name: "description",
        },
        {
          type: "string" as const,
          label: "Value",
          name: "value",
        },
      ],
    },
    {
      type: "object" as const,
      label: "Curriculum Levels",
      name: "levels",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.levelName || "Level",
        }),
      },
      fields: [
        {
          type: "string" as const,
          label: "Level Name",
          name: "levelName",
        },
        {
          type: "string" as const,
          label: "Level Description",
          name: "levelDescription",
        },
        {
          type: "string" as const,
          label: "Level Badge",
          name: "levelBadge",
        },
        iconSchema as any,
        {
          type: "string" as const,
          label: "Duration",
          name: "duration",
        },
        {
          type: "string" as const,
          label: "Total Hours/Week",
          name: "totalHours",
        },
        {
          type: "string" as const,
          label: "Target Age",
          name: "targetAge",
        },
        {
          type: "string" as const,
          label: "Certification",
          name: "certification",
        },
        {
          type: "object" as const,
          label: "Subjects",
          name: "subjects",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.subjectName || "Subject",
            }),
          },
          fields: [
            {
              type: "string" as const,
              label: "Subject Name",
              name: "subjectName",
            },
            {
              type: "string" as const,
              label: "Category",
              name: "category",
            },
            {
              type: "string" as const,
              label: "Description",
              name: "description",
            },
            {
              type: "string" as const,
              label: "Weekly Hours",
              name: "weeklyHours",
            },
            {
              type: "string" as const,
              label: "Total Hours",
              name: "totalHours",
            },
            {
              type: "boolean" as const,
              label: "Is Core Subject",
              name: "isCore",
            },
            iconSchema as any,
            {
              type: "string" as const,
              label: "Teacher",
              name: "teacher",
            },
            {
              type: "string" as const,
              label: "Topics",
              name: "topics",
              list: true,
            },
          ],
        },
        {
          type: "string" as const,
          label: "Learning Outcomes",
          name: "learningOutcomes",
          list: true,
        },
        {
          type: "string" as const,
          label: "Extra Activities",
          name: "extraActivities",
          list: true,
        },
        {
          type: "string" as const,
          label: "Assessment Method",
          name: "assessmentMethod",
          ui: {
            component: "textarea",
          },
        },
      ],
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
      type: "object" as const,
      label: "CTA Button",
      name: "ctaButton",
      fields: [
        {
          type: "string" as const,
          label: "Label",
          name: "label",
        },
        {
          type: "string" as const,
          label: "Link",
          name: "href",
        },
      ],
    },
  ],
};