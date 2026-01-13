import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-primary",
});

export const metadata = {
  title: "2026年度日历",
  description: "精美的2026年日历，支持多种主题风格和事件管理",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" data-theme="tech">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={geist.variable}>
        {children}
      </body>
    </html>
  );
}
