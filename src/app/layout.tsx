import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "C++ Learning Simulator",
  description: "Interactive C++ learning platform with AI tutor and code simulator",
  keywords: ["C++", "programming", "learning", "simulator", "education"],
  authors: [{ name: "C++ Learning Simulator Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen bg-background">
              <Sidebar />
              <main className="transition-all duration-300 ease-in-out pt-20 lg:pt-8 ml-0 lg:ml-20 xl:ml-72 p-4 lg:p-8 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-cyan-50/30 dark:from-blue-950/20 dark:via-purple-950/15 dark:to-cyan-950/20 animate-gradient-slow" />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-400/5 dark:to-purple-400/5 rounded-full blur-xl animate-float-slow" />
                  <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 dark:from-purple-400/5 dark:to-cyan-400/5 rounded-full blur-xl animate-float-medium" />
                  <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 dark:from-cyan-400/5 dark:to-blue-400/5 rounded-full blur-xl animate-float-fast" />
                  
                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-slow" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                {children}
                </div>
              </main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
