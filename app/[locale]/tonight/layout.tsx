import type { ReactNode } from "react"

export default function TonightLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto min-h-screen max-w-md p-4 dark:bg-gray-900 dark:text-white">{children}</div>
}
