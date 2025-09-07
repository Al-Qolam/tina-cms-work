import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";
// Uncomment line below to use MegaMenu instead of Header
// import { MegaMenu } from "../blocks/mega-menu";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global({
    relativePath: "index.json",
  },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      }
    }
  );

  // Option 1: Use default Header (simple navigation)
  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <Header />
      <main className="overflow-x-hidden pt-20">
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );

  // Option 2: Use MegaMenu (advanced navigation with dropdowns)
  // Uncomment the code below and comment the code above to use MegaMenu
  /*
  const megaMenuData = {
    brandName: "Ponpes Nurul Ilmi",
    logo: "/logo.png",
    sticky: true,
    menuItems: [
      {
        label: "Beranda",
        link: "/",
      },
      {
        label: "Tentang",
        link: "/about",
        subItems: [
          {
            label: "Profil Sekolah",
            description: "Sejarah dan visi misi kami",
            link: "/about/profil",
          },
          {
            label: "Fasilitas",
            description: "Sarana dan prasarana",
            link: "/about/fasilitas",
          },
        ],
        megaMenuLayout: "columns",
      },
      {
        label: "PPDB",
        link: "/pendaftaran",
      },
      {
        label: "Blog",
        link: "/posts",
      },
      {
        label: "Kontak",
        link: "/galeri-kontak",
      },
    ],
    ctaButtons: [
      {
        text: "Daftar PPDB",
        link: "/pendaftaran",
        variant: "default",
      },
    ],
  };

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <MegaMenu data={megaMenuData} />
      <main className="overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
  */
}
