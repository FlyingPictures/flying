import { Inter, Poppins, Libre_Baskerville } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "500"],
  variable: "--font-poppins",
})

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["italic"],
  variable: "--font-libre-baskerville",
})

export const fontVariables = `${inter.variable} ${poppins.variable} ${libreBaskerville.variable}`