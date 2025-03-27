"use client"
import Vimeo from "@u-wave/react-vimeo"

/**
 * Display embedded intro video, explaining who I am and what I can do.
 */
export function Intro() {
  return (
    <section className="mx-4 w-full max-w-4xl sm:mx-8 md:mx-12 md:max-w-5xl lg:mx-16 lg:max-w-6xl">
      <hgroup className="mb-8 text-center">
        <h1 className="text-5xl font-bold tracking-widest">InDat</h1>
        <h2 className="pink-fade text-2xl">Innovation through Data</h2>
      </hgroup>
      <div className="relative w-full pb-[56.25%]">
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <Vimeo
            video={1065153174}
            autoplay
            responsive
            dnt={true}
            showTitle={false}
            showByline={false}
            showPortrait={false}
          />
        </div>
      </div>
    </section>
  )
}
