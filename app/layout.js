import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import {
  Zilla_Slab,
  Geist,
  Geist_Mono,
  Spicy_Rice,
  Dancing_Script,
} from "next/font/google";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const zillaSlab = Zilla_Slab({
  variable: "--font-zilla-slab",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const spicyRice = Spicy_Rice({
  variable: "--font-spicy-rice",
  subsets: ["latin"],
  weight: ["400"],
});

const dancescript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Adjust weights based on font availability
  style: ["normal"], // Ensure "italic" is removed if unsupported
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NEXT-BLOG",
  description:
    "A digital space where curiosity, creativity, and technology collide.",
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${dancescript.variable} antialiased`}>
          <main className={geistMono.className}>{children}</main>
        </body>
        <Toaster />
      </html>
    </ClerkProvider>
  );
}
