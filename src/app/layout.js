import { Inter, Fredoka, Gilda_Display, Barlow, Babylonica } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
/// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import NavBar from "@/components/navbar";
// import Footer from "@/components/footer";

// Fonts inputs
const inter = Inter({ subsets: ["latin"] });

const fredoka_init = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const gilda_init = Gilda_Display({
  subsets: ["latin"],
  weight: [ "400"],
  variable: "--font-gilda",
});

const barlow_init = Barlow({
  subsets: ["latin"],
  weight: ["100","200","300", "400", "500", "600", "700","800", "900"],
  variable: "--font-barlow",
});


const babylonica_init = Babylonica({
  subsets: ["latin"],
  weight: [ "400"],
  variable: "--font-babylonica",
});

export const metadata = {
  title: "Pamoja Africa Camps & Lodges",
  description: "Where Nature Meets Luxury, Best Luxurious Safari accomodations in Tanzania",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
       
      </head>

      <body
        className={`${inter.className} ${fredoka_init.variable}  ${babylonica_init.variable} ${barlow_init.variable} ${gilda_init.variable}`}
      >
        <AppContextProvider>
          {/* <NavBar/> */}
          {children}
          {/* <Footer/>  */}
        </AppContextProvider>
      </body>
    </html>
  );
}
