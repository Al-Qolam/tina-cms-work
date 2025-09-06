"use client";
import {
  PageBlocksStaffCards,
  PageBlocksStaffCardsStaffMembers,
} from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState, useMemo } from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Globe, ChevronLeft, ChevronRight, Filter } from "lucide-react";

export const StaffCards = ({ data }: { data: PageBlocksStaffCards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const itemsPerPage = data.itemsPerPage || 12;
  const staff = data.staffMembers || [];

  // Get unique departments and roles for filters
  const departments = useMemo(() => {
    const deps = new Set(staff.map(s => s?.department).filter(Boolean));
    return ["all", ...Array.from(deps)];
  }, [staff]);

  const roles = useMemo(() => {
    const roleSet = new Set(staff.map(s => s?.role).filter(Boolean));
    return ["all", ...Array.from(roleSet)];
  }, [staff]);

  // Filter staff based on selected filters
  const filteredStaff = useMemo(() => {
    return staff.filter(member => {
      if (!member) return false;
      const matchDept = selectedDepartment === "all" || member.department === selectedDepartment;
      const matchRole = selectedRole === "all" || member.role === selectedRole;
      return matchDept && matchRole;
    });
  }, [staff, selectedDepartment, selectedRole]);

  // Pagination
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStaff = filteredStaff.slice(startIndex, endIndex);

  // Reset page when filters change
  const handleDepartmentChange = (dept: string) => {
    setSelectedDepartment(dept);
    setCurrentPage(1);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  const layoutClass = {
    grid: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    list: "grid gap-4",
  };

  const layout = data.layout || "grid";
  const gridLayout = layoutClass[layout as keyof typeof layoutClass] || layoutClass.grid;

  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-7xl px-6">
        {/* Header */}
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

        {/* Filters */}
        {data.showFilters && (
          <div className="mb-8 p-4 bg-card rounded-lg border">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                {/* Department Filter */}
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground mb-1 block">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border bg-background text-foreground"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>
                        {dept === "all" ? "All Departments" : dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Role Filter */}
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground mb-1 block">Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border bg-background text-foreground"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>
                        {role === "all" ? "All Roles" : role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-center text-sm text-muted-foreground">
                Showing {filteredStaff.length} {filteredStaff.length === 1 ? 'member' : 'members'}
              </div>
            </div>
          </div>
        )}

        {/* Staff Grid/List */}
        <div className={gridLayout}>
          {currentStaff.map((member, i) => (
            <StaffCard key={i} {...member!} index={i} layout={layout} />
          ))}
        </div>

        {/* Empty State */}
        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No staff members found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {data.showPagination && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                // Show first, last, current, and adjacent pages
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  );
                }
                // Show ellipsis
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2">...</span>;
                }
                return null;
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
};

export const StaffCard: React.FC<PageBlocksStaffCardsStaffMembers & { index: number; layout: string }> = (data) => {
  const { index, layout } = data;
  const isListLayout = layout === "list";

  if (isListLayout) {
    return (
      <div className="group flex gap-6 p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            {data.avatar ? (
              <img
                src={data.avatar}
                alt={data.name || `Staff member ${index + 1}`}
                className="w-full h-full object-cover"
                data-tina-field={tinaField(data, 'avatar')}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                {data.name ? data.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'SM'}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-2">
            <h3 
              className="text-xl font-bold text-foreground"
              data-tina-field={tinaField(data, 'name')}
            >
              {data.name}
            </h3>
            <p 
              className="text-primary font-medium"
              data-tina-field={tinaField(data, 'role')}
            >
              {data.role}
            </p>
            {data.department && (
              <Badge variant="secondary" className="mt-2">
                {data.department}
              </Badge>
            )}
          </div>

          {data.bio && (
            <p 
              className="text-muted-foreground text-sm mb-3 line-clamp-2"
              data-tina-field={tinaField(data, 'bio')}
            >
              {data.bio}
            </p>
          )}

          {/* Contact & Social */}
          <div className="flex flex-wrap gap-4 text-sm">
            {data.email && (
              <a href={`mailto:${data.email}`} className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                <Mail className="w-4 h-4" />
                <span>{data.email}</span>
              </a>
            )}
            {data.phone && (
              <a href={`tel:${data.phone}`} className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                <Phone className="w-4 h-4" />
                <span>{data.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout (Card)
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-all duration-300">
      {/* Avatar */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
        {data.avatar ? (
          <img
            src={data.avatar}
            alt={data.name || `Staff member ${index + 1}`}
            className="w-full h-full object-cover"
            data-tina-field={tinaField(data, 'avatar')}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground">
            {data.name ? data.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'SM'}
          </div>
        )}
        {data.featured && (
          <Badge className="absolute top-4 right-4 bg-primary">
            Featured
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-3">
          <h3 
            className="text-lg font-bold text-foreground mb-1"
            data-tina-field={tinaField(data, 'name')}
          >
            {data.name}
          </h3>
          <p 
            className="text-primary font-medium text-sm"
            data-tina-field={tinaField(data, 'role')}
          >
            {data.role}
          </p>
          {data.department && (
            <Badge variant="secondary" className="mt-2 text-xs">
              {data.department}
            </Badge>
          )}
        </div>

        {data.bio && (
          <p 
            className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1"
            data-tina-field={tinaField(data, 'bio')}
          >
            {data.bio}
          </p>
        )}

        {/* Contact */}
        <div className="space-y-2 text-sm">
          {data.email && (
            <a 
              href={`mailto:${data.email}`} 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              data-tina-field={tinaField(data, 'email')}
            >
              <Mail className="w-4 h-4" />
              <span className="truncate">{data.email}</span>
            </a>
          )}
          {data.phone && (
            <a 
              href={`tel:${data.phone}`} 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              data-tina-field={tinaField(data, 'phone')}
            >
              <Phone className="w-4 h-4" />
              <span>{data.phone}</span>
            </a>
          )}
          {data.location && (
            <div 
              className="flex items-center gap-2 text-muted-foreground"
              data-tina-field={tinaField(data, 'location')}
            >
              <MapPin className="w-4 h-4" />
              <span>{data.location}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {(data.linkedin || data.twitter || data.website) && (
          <div className="mt-4 pt-4 border-t flex gap-3">
            {data.linkedin && (
              <a 
                href={data.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
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
                className="text-muted-foreground hover:text-primary transition-colors"
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
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const defaultStaffMember = {
  name: "Staff Name",
  role: "Position",
  department: "Department",
  bio: "Brief bio or description about the staff member's expertise and experience.",
  avatar: "",
  email: "email@example.com",
  phone: "+1234567890",
  location: "Location",
  linkedin: "",
  twitter: "",
  website: "",
  featured: false,
};

export const staffCardsBlockSchema: Template = {
  name: "staffCards",
  label: "Staff Cards",
  ui: {
    previewSrc: "/blocks/staff-cards.png",
    defaultItem: {
      title: "Our Team",
      subtitle: "Meet the talented people behind our success",
      layout: "grid",
      showFilters: true,
      showPagination: true,
      itemsPerPage: 12,
      staffMembers: [
        {
          ...defaultStaffMember,
          name: "Dr. Ahmad Ibrahim",
          role: "Kepala Sekolah",
          department: "Manajemen",
          bio: "Pendidik berpengalaman dengan spesialisasi dalam pendidikan Islam dan manajemen pesantren modern.",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
          email: "ahmad.ibrahim@nibs.ac.id",
          phone: "+62 812-3456-7890",
          location: "Malang, Indonesia",
          featured: true,
        },
        {
          ...defaultStaffMember,
          name: "Ustadz Muhammad Fajar",
          role: "Kepala Tahfidz",
          department: "Tahfidz",
          bio: "Hafidz 30 juz dengan sanad bersambung, pembimbing program tahfidz intensif.",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
          email: "m.fajar@nibs.ac.id",
          phone: "+62 813-4567-8901",
          location: "Malang, Indonesia",
        },
        {
          ...defaultStaffMember,
          name: "Ustadzah Fatimah Zahra",
          role: "Koordinator Putri",
          department: "Akademik",
          bio: "Spesialis pendidikan karakter dan pembinaan santri putri.",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
          email: "fatimah@nibs.ac.id",
          phone: "+62 814-5678-9012",
          location: "Malang, Indonesia",
        },
        {
          ...defaultStaffMember,
          name: "Bapak Hendra Wijaya",
          role: "Kepala Administrasi",
          department: "Administrasi",
          bio: "Mengelola administrasi sekolah dan PPDB dengan sistem modern.",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
          email: "hendra@nibs.ac.id",
          phone: "+62 815-6789-0123",
          location: "Malang, Indonesia",
        },
        {
          ...defaultStaffMember,
          name: "Ustadz Abdul Rahman",
          role: "Guru Bahasa Arab",
          department: "Bahasa",
          bio: "Lulusan Al-Azhar Mesir, pengajar bahasa Arab dengan metode modern.",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          email: "rahman@nibs.ac.id",
          phone: "+62 816-7890-1234",
          location: "Malang, Indonesia",
        },
        {
          ...defaultStaffMember,
          name: "Ibu Sarah Amelia",
          role: "Guru Matematika",
          department: "MIPA",
          bio: "Pengajar matematika berprestasi dengan pendekatan pembelajaran inovatif.",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
          email: "sarah@nibs.ac.id",
          phone: "+62 817-8901-2345",
          location: "Malang, Indonesia",
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
      options: ["grid", "list"],
      description: "Choose between grid cards or list view",
    },
    {
      type: "boolean" as const,
      label: "Show Filters",
      name: "showFilters",
      description: "Enable department and role filtering",
    },
    {
      type: "boolean" as const,
      label: "Show Pagination",
      name: "showPagination",
      description: "Enable pagination for large lists",
    },
    {
      type: "number" as const,
      label: "Items Per Page",
      name: "itemsPerPage",
      description: "Number of staff members per page",
    },
    {
      type: "object" as const,
      label: "Staff Members",
      name: "staffMembers",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.name || "Staff Member",
          };
        },
        defaultItem: {
          ...defaultStaffMember,
        },
      },
      fields: [
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
          label: "Bio",
          name: "bio",
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
          type: "boolean" as const,
          label: "Featured",
          name: "featured",
          description: "Mark as featured staff member",
        },
      ],
    },
  ],
};