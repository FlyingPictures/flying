import { Inter, Poppins, Libre_Baskerville } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-inter",
})

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700"],
  variable: "--font-poppins",
})

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
})

export const fontVariables = `
  ${inter.variable}
  ${poppins.variable}
  ${libreBaskerville.variable}
`
