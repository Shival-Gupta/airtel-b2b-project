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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="theme"
            disableTransitionOnChange
          >
            <section className="h-full">
              <Navbar />
              <main className="py-20 min-h-[75%] bg-accent">
                <div className="container mx-auto px-6 lg:px-16">
                  {children}
                </div>
              </main>
              <Footer />
            </section>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider >
  );
};