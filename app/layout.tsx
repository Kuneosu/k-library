import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K Library | Developer Projects Showcase",
  description:
    "A comprehensive library showcasing side projects, toy projects, and technical experiments by Kuneosu",
  keywords: [
    "library",
    "developer",
    "projects",
    "web development",
    "programming",
    "kuneosu",
  ],
  authors: [{ name: "Kuneosu" }],
  openGraph: {
    title: "Kuneosu Library | Developer Projects Showcase",
    description:
      "Explore Kuneosu's collection of side projects and technical experiments",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
