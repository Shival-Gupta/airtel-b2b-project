import "@/app/globals.css";
import { Inter } from "next/font/google";
import { siteConfig } from "@/siteConfig";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
import { Toaster } from "@/components/ui/toaster";

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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        //   variables: {
        //     colorPrimary: 'var(--primary)',
        //     colorDanger: 'var(--danger)',
        //     colorSuccess: 'var(--success)',
        //     colorWarning: 'var(--destructive)',
        //     colorAlphaShade: 'var(--accent)',
        //     colorTextOnPrimaryBackground: 'var(--primary)',
        //     colorTextSecondary: 'var(--secondary)',
        //     colorBackground: 'var(--background)',
        //     colorInputText: 'var(--foreground)',
        //     colorInputBackground: 'var(--primary-foreground)',
        //     borderRadius: 'var(--radius)',
        //   }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            storageKey='theme'
          // disableTransitionOnChange
          >
            <div className="h-full">
              <Header />
              <main className="mt-14 py-6 min-h-[75%] bg-accent">
                <div className="container mx-auto px-6 lg:px-16">
                  {children}
                </div>
              </main>
              <Toaster />
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider >
  );
};