import { Metadata } from "next"
import { Footer } from "components/Home/Footer"
import { Header } from "components/Home/Header"
import { Video } from "components/Home/Video"
import { Studies } from "components/Home/Studies"

export const metadata: Metadata = {
  title: "InDat",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {},
}

export default function Home() {
  return (
    <main className="ml-2 cursor-default select-none bg-white dark:bg-gray-900">
      <Header></Header>
      <Video></Video>
      <Studies></Studies>
      <Footer></Footer>
    </main>
  )
}
