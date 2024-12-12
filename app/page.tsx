import { Metadata } from "next"
import { Footer } from "components/home/Footer"
import { Header } from "components/home/Header"
import { Video } from "components/home/Video"

export const metadata: Metadata = {
  title: "Welcome to InDat",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {},
}

export default function Home() {
  return (
    <main className=" cursor-default select-none bg-white dark:bg-gray-900">
      <Header></Header>
      <Video></Video>
      <Footer></Footer>
    </main>
  )
}
