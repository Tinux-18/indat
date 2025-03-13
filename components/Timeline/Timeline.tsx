import { TimelineItem } from "models/timeline"
import { iconMap } from "./timeline-icons"

export function Timeline({ events }: { events: TimelineItem[] }) {
  return (
    <div
      aria-label="Timeline of events"
      role="list"
      className="relative mx-5 w-4/5 space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent md:before:mx-auto md:before:translate-x-0"
    >
      {events.map((event: TimelineItem, index: number) => {
        const IconComponent = iconMap[event.icon] ? iconMap[event.icon] : iconMap["studies"]
        return (
          <div className="group flex items-center md:odd:flex-row-reverse" key={index} role="listitem">
            <div
              aria-label={`Icon representing ${event.icon}`}
              aria-hidden="true"
              role="img"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white bg-slate-300 text-slate-500 shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
            >
              {IconComponent && <IconComponent size={20} />}
            </div>
            <div
              aria-label={`Timeline card: ${event.title}`}
              className="w-[calc(100%-4rem)] rounded border border-slate-200 bg-white p-4 shadow md:w-[calc(50%-2.5rem)]"
            >
              <div className="mb-1 flex justify-between space-x-2">
                <header className="font-bold text-slate-900">{event.title}</header>
                <time
                  aria-label={`Event date: ${event.date}`}
                  dateTime={event.date.replace(/\s/g, "")}
                  className="font-caveat font-medium"
                >
                  {event.date}
                </time>
              </div>
              <p aria-label="Event subtitle" className="text-slate-500">
                {event.subtitle}
              </p>
              <p aria-label="Event description">{event.description} </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
