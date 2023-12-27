import Navbar from "@/components/navbar";
import AuthProvider from "@/providers/auth-provider";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import backgroundImage from "../../public/images/background_html_ecommerce.jpg";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600"],
});

export const metadata = {
  title: "NSB e-commerce",
  description: "e-commerce for small business",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-scroll"
      // opacity-50
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <body
        className={`from-3% h-full bg-gradient-to-r from-transparent via-indigo-500 via-purple-500 to-pink-500 font-sans ${poppins.variable}bg-slate-100/75`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <footer></footer>
      </body>
    </html>
  );
}
