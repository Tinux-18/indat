import { PasscodeForm } from "components/Tonight/PasscodeForm"

export default async function TonightPasscodePage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 py-4">
      <h1 className="text-2xl font-semibold">Tonight</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">Enter the passcode to continue.</p>
      <div className="w-full max-w-xs">
        <PasscodeForm next={next && next.startsWith("/") && !next.startsWith("//") ? next : "/tonight"} />
      </div>
    </main>
  )
}
