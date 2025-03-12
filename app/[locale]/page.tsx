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
    <main className="ml-2 flex cursor-default select-none flex-col justify-evenly space-y-6 bg-white dark:bg-gray-900">
      <Header></Header>
      <Intro></Intro>
      <Studies></Studies>
      <Footer></Footer>
    </main>
  )
}
