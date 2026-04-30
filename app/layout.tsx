import './globals.css';
import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ariesliu.com'),
  title: 'Aries Liu | Product Owner, Project Lead, AI Builder',
  description:
    'Product Leader with 8 yrs Product, 4+ yrs Leadership across FinTech, Gaming, MarTech, and Healthcare. Combining design excellence with data-driven strategies.',
  openGraph: {
    title: 'Aries Liu | Product Owner, Project Lead, AI Builder',
    description:
      'Product Leader across FinTech, Gaming, MarTech, and Healthcare.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aries Liu | Product Owner, Project Lead, AI Builder',
    description:
      'Product Leader across FinTech, Gaming, MarTech, and Healthcare.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="light"){document.documentElement.classList.remove("dark")}else if(t==="dark"||(!t)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${dmSerif.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
