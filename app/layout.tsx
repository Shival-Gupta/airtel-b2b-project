import "@/app/globals.css";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { siteConfig } from "@/siteConfig";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { Navbar } from "@/app/_components/navbar";
import { Footer } from "@/app/_components/footer";

const inter = Inter({ subsets: ["latin"] });
const font = inter;

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  template: `%s | ${siteConfig.title}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
          <head />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="theme"
            disableTransitionOnChange
          >
            <div className="h-full bg-accent">
              <Navbar />
              <main className="pt-14 pb-20 bg-accent min-h-[75%]">
                <div className="w-full py-10 px-10 lg:px-32 md:max-w-screen-2xl mx-auto">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider >
  );
};