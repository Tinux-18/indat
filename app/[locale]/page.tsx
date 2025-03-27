import { Metadata } from "next"
import { Background } from "components/Home/Background"
import { Footer } from "components/Home/Footer"
import { Header } from "components/Home/Header"
import { Intro } from "components/Home/Intro"
import { Projects } from "components/Home/Projects"
import { Studies } from "components/Home/Studies"

export const metadata: Metadata = {
  title: "InDat",
  description: "Innovation through Data",
  authors: [{ name: "Constantin Rigu", url: "https://github.com/Tinux-18" }],
}

export default function Home() {
  return (
    <div className="cursor-default select-none pb-3 dark:bg-gray-900">
      <Header></Header>
      <main className="flex flex-col items-center justify-center">
        <Intro></Intro>
        <Projects></Projects>
        <Background></Background>
        <Studies></Studies>
      </main>
      <Footer></Footer>
    </div>
  )
}
