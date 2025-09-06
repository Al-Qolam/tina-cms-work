# TinaCMS Block Creation Pattern Guide

## Pola Pembuatan Block TinaCMS

### 1. Struktur File Component (`/components/blocks/[block-name].tsx`)

```typescript
"use client";
import { PageBlocks[BlockName] } from "../../tina/__generated__/types";
import type { Template } from 'tinacms';
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from '../layout/section';
```

### 2. Component Pattern

- **Main Component**: Menerima `data` dengan type dari generated types
- **Sub Components**: Untuk item yang di-list/repeat
- **Section Wrapper**: Semua block dibungkus dengan `<Section background={data.background!}>`
- **TinaField Integration**: Setiap field editable diberi `data-tina-field={tinaField(data, 'fieldName')}`
- **Dark Mode**: Gunakan Tailwind dark: prefix untuk semua styling

### 3. Schema Pattern

```typescript
export const [blockName]BlockSchema: Template = {
  name: "[blockName]",
  label: "[Block Label]",
  ui: {
    previewSrc: "/blocks/[block-name].png",
    defaultItem: {
      // Default values untuk semua fields
    },
  },
  fields: [
    sectionBlockSchemaField, // Wajib di awal
    // Field definitions
  ],
};
```

### 4. Field Types yang Konsisten

- **String fields**: `type: "string" as const` - JANGAN gunakan rich-text untuk field yang dipakai block lain
- **List fields**: `type: "object" as const` dengan `list: true`
- **Icon fields**: Import dan gunakan `iconSchema`
- **Image fields**: Gunakan nama unik jika ada konflik (misal: `imageUrl` bukan `image`)

### 5. Integrasi ke System

#### a. Tambah ke `/components/blocks/index.tsx`:
```typescript
// Import
import { [BlockName] } from "./[block-name]";

// Di Block switch case
case "PageBlocks[BlockName]":
  return <[BlockName] data={block} />;
```

#### b. Tambah ke `/tina/collection/page.ts`:
```typescript
// Import schema
import { [blockName]BlockSchema } from '@/components/blocks/[block-name]';

// Tambah ke templates array
templates: [
  // ... existing blocks
  [blockName]BlockSchema,
],
```

### 6. UI Components

- Gunakan komponen dari `/components/ui/` yang sudah ada
- Jika belum ada, install dari shadcn/ui: `bunx shadcn@latest add [component-name]`

### 7. Styling Guidelines

- Container: `@container mx-auto max-w-[size] px-6`
- Typography: Konsisten dengan `text-foreground`, `text-muted-foreground`
- Colors: Gunakan CSS variables (zinc, blue, emerald, purple, etc)
- Gradients: `bg-gradient-to-br from-[color] to-[color]`
- Shadows: `shadow-lg`, `shadow-md`
- Hover effects: `hover:shadow-lg transition-shadow`

### 8. Common Pitfalls to Avoid

- ❌ Jangan gunakan field name yang sama dengan block lain dengan tipe berbeda
- ❌ Jangan gunakan rich-text untuk field description jika block lain pakai string
- ❌ Jangan lupa import dan export schema
- ❌ Jangan lupa tambahkan ke index.tsx dan page.ts
- ❌ Jangan gunakan relative import untuk file path

### 9. Testing Checklist

- [ ] Component renders tanpa error
- [ ] TinaCMS inline editing berfungsi
- [ ] Dark mode styling bekerja
- [ ] Responsive design (@container queries)
- [ ] Build berhasil: `bun tinacms build`
- [ ] Types generated dengan benar

### 10. Git Workflow untuk Repository dengan Branch Protection

```bash
# 1. Buat branch feature
git checkout -b feat/[feature-name]

# 2. Commit changes
git add .
git commit -m "feat: [description]"

# 3. Push ke remote
git push -u origin feat/[feature-name]

# 4. Buat PR via GitHub atau CLI
gh pr create --title "feat: [title]" --body "[description]"
```

## Gallery Block Implementation Plan

Berdasarkan pattern di atas, untuk membuat 3 variasi gallery block:

### 1. **Gallery Grid** (2-3 columns responsive)
- Fields: images array dengan url & alt
- Layout: `grid-cols-2 md:grid-cols-3`

### 2. **Gallery Masonry** (Variable columns)
- Fields: images array, column config
- Layout: Dynamic grid columns based on config

### 3. **Gallery Featured** (1 hero + grid thumbnails)
- Fields: featured image, thumbnail images
- Layout: Featured top, grid bottom

Setiap gallery block akan:
- Support image upload via TinaCMS
- Include alt text untuk accessibility
- Support customizable gap spacing
- Include optional title & description
- Responsive dengan @container queries