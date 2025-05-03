import ClientOnly from "@/components/ClientOnly";
import Footer from "@/components/Footer";
import ToastContainerBar from "@/components/ToastContainerBar";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import Navbar from "@/components/navbar/Navbar";
import { Montserrat } from "next/font/google";
import "../../styles/globals.css";
import getCurrentUser from "./actions/getCurrentUser";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsentBanner";
import OwnerRegisterModal from "@/components/modals/OwnerRegisterModal";

export const metadata = {
  metadataBase: new URL("https://www.contcave.com"),
  title: "ContCave | Find the Perfect Shoot Space with Ease",
  description:
    "Book the ideal shoot space for your next project on ContCave – the leading platform for creative studio and event space rentals.",
  icons: "https://i.ibb.co/4JdrGHS/Screenshot-2023-11-22-at-3-52-33-AM.png",
  keywords: [
    "studio booking",
    "photography spaces",
    "event spaces",
    "contcave",
    "shoot space rental",
    "creative space booking",
    "photography studio rental",
    "video production space",
    "book studio",
    "photo studio hire",
    "event space rental",
    "shoot location"
  ],
  authors: [{ name: "ContCave" }],
  robots: "index, follow",
  canonical: "https://www.contcave.com",
  openGraph: {
    title: "ContCave | Find the Perfect Shoot Space with Ease",
    description:
      "Book the ideal shoot space for your next project on ContCave – the leading platform for creative studio and event space rentals.",
    url: "https://www.contcave.com",
    siteName: "ContCave",
    type: "website",
    images: [
      {
        url: "https://www.contcave.com/images/logo/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "ContCave Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ContCave | Find the Perfect Shoot Space with Ease",
    description:
      "Book the ideal shoot space for your next project on ContCave – the leading platform for creative studio and event space rentals.",
    site: "@ContCave",
    images: [
      {
        url: "https://www.contcave.com/images/logo/logo-dark.png",
        alt: "ContCave Logo"
      }
    ]
  }
};


const font = Montserrat({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastContainerBar />
          <SearchModal />
          <RegisterModal />
          <LoginModal />
          <OwnerRegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <CookieConsent />
        </ClientOnly>
        <div className="min-h-[100vh] pt-[84px]">{children}</div>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
