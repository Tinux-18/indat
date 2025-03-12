"use client"
import Vimeo from "@u-wave/react-vimeo"

/**
 * Display embedded intro video, explaining who I am and what I can do.
 */
export function Intro() {
  return (
    <section className="mx-4 mt-8 h-10 sm:mx-8 md:mx-12 lg:mx-16">
      <Vimeo
        video={1065153174}
        autoplay
        responsive
        dnt={true}
        showTitle={false}
        showByline={false}
        showPortrait={false}
      />
    </section>
  )
}
