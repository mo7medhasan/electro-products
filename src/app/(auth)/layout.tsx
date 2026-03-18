import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Electro Products",
  description: "Browse premium electronics and gadgets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <div className="flex min-h-screen flex-col gap-8 bg-linear-to-br mask-alpha from-gray-900 to-gray-800  text-white">
            {children}
          </div>
      </body>
    </html>
  );
}
