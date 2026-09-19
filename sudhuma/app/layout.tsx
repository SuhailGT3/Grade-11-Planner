import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sudhuma — Know what's next",
  description:
    "Sudhuma turns your school timetable into a calm daily guide — and reminds you before every lesson.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
