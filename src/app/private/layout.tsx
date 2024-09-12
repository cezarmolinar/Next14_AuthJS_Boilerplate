import Navbar from '@/components/template/Navbar'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center  gap-4 border-b bg-background px-4 md:px-6 z-10">
        <Navbar />
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
      <footer className="px-8 py-2 gap-4 md:gap-4"></footer>
    </div>
  )
}
