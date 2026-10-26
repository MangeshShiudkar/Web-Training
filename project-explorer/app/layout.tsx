import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Explorer",
  description: "A simple project management portal.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <header className="border-b border-stone-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
            <Link
              href="/"
              className="flex items-center gap-3 font-semibold text-stone-900"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-emerald-800 text-sm text-white">
                P
              </span>
              <span>Project Explorer</span>
            </Link>
            <nav
              aria-label="Main navigation"
              className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-stone-600"
            >
              <Link className="hover:text-emerald-800" href="/">
                Home
              </Link>
              <Link className="hover:text-emerald-800" href="/about">
                About
              </Link>
              <Link className="hover:text-emerald-800" href="/dashboard">
                Dashboard
              </Link>
              <Link className="hover:text-emerald-800" href="/projects">
                Projects
              </Link>
              <Link className="hover:text-emerald-800" href="/settings">
                Settings
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto min-h-[calc(100vh-73px)] max-w-7xl px-5 py-8 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
