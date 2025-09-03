import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../tina/__generated__/client";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import Footer from "./Footer";

type EnhancedLayoutProps = PropsWithChildren & {
  rawPageData?: any;
  showTopBar?: boolean;
  showNavBar?: boolean;
  showFooter?: boolean;
};

export default async function EnhancedLayout({ 
  children, 
  rawPageData,
  showTopBar = true,
  showNavBar = true,
  showFooter = true
}: EnhancedLayoutProps) {
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

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      {showTopBar && <TopBar />}
      {showNavBar && <NavBar />}
      <main className="overflow-x-hidden">
        {children}
      </main>
      {showFooter && <Footer />}
    </LayoutProvider>
  );
}