import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { KanbanContextProvider } from "@/components/KanbanProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // title: 'Create Next App',
  title: "Kanban with Convex",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position='bottom-right' richColors />
          <KanbanContextProvider>
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </KanbanContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
