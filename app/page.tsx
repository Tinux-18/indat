import { Metadata } from "next"
import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "Welcome to InDat",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {},
}

export default function Web() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Welcome to InDat!
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Hi! I&apos;m Constantin.
            </p>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              InDat got off the ground because I want to build technical solutions in a diverse range of industries.
            </p>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              I am a full-stack software developer with a backend focus, and I&apos;m really looking forward to hearing
              what problem you want to solve.
            </p>
            <Button href="mailto:constantin@indat.tech" className="mr-3">
              Let&apos;s talk!
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
