import { TimelineItem } from "models/timeline"
import { iconMap } from "./timeline-icons"

export function Timeline({ events }: { events: TimelineItem[] }) {
  return (
    <div className="relative w-4/5 space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent md:before:mx-auto md:before:translate-x-0">
      {events.map((event: TimelineItem, index: number) => {
        const IconComponent = iconMap[event.icon] ? iconMap[event.icon] : iconMap["studies"]
        return (
          <div className="group flex md:odd:flex-row-reverse" key={index}>
            {/* Icon */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white bg-slate-300 text-slate-500 shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              {IconComponent && <IconComponent size={20} />}
            </div>
            {/* Text */}
            <div className="w-[calc(100%-4rem)] rounded border border-slate-200 bg-white p-4 shadow md:w-[calc(50%-2.5rem)]">
              <div className="mb-1 flex justify-between space-x-2">
                {/* Header */}
                <div className="font-bold text-slate-900">{event.title}</div>
                {/* Date */}
                <time className="font-caveat font-medium">{event.date}</time>
              </div>
              {/* Subtitle */}
              <div className="text-slate-500">{event.subtitle} </div>
              {/* Content */}
              <div>{event.description} </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
