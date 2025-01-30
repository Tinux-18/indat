import { Metadata } from "next"
import { Footer } from "components/Home/Footer"
import { Header } from "components/Home/Header"
import { Video } from "components/Home/Video"

export const metadata: Metadata = {
  title: "InDat",
  icons: {
    icon: "favicon/favicon.ico",
  },
}

export default function Home() {
  return (
    <main className="cursor-default select-none bg-white dark:bg-gray-900">
      <Header></Header>
      <Video></Video>
      <Footer></Footer>
    </main>
  )
}
