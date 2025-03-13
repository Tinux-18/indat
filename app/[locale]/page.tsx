import { Metadata } from "next"
import { Footer } from "components/Home/Footer"
import { Header } from "components/Home/Header"
import { Intro } from "components/Home/Intro"
import { Studies } from "components/Home/Studies"

export const metadata: Metadata = {
  title: "InDat",
  description: "Innovation through Data",
  authors: [{ name: "Constantin Rigu", url: "https://github.com/Tinux-18" }],
}

export default function Home() {
  return (
    <body className="ml-2 cursor-default select-none dark:bg-gray-900">
      <Header></Header>
      <main className="flex flex-col items-center justify-center">
        <Intro></Intro>
        <Studies></Studies>
      </main>
      <Footer></Footer>
    </body>
  )
}
