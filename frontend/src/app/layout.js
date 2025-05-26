import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import getThemeData from "@/lib/getThemeData";
import Footer from "@/components/Footer";
import ThemeLoader from "@/components/ThemeLoader";
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "BookDucks",
  description: "Din digitala portal till litterär utforskning. Upptäck böcker, bygg din läslista och dela dina betyg",
};

export default async function RootLayout({ children }) {
  const themeData = await getThemeData();

  return (
    <html lang="en">
      <body className={`bg-gray-50 summer:bg-orange-50/40 pink:bg-rose-50/40 min-h-screen flex flex-col ${poppins.className}`}>
        <ThemeLoader theme={themeData} />
        <Toaster position="bottom-right" reverseOrder={false} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
