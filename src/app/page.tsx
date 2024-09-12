export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex bg-blue-400">
        <p>ESQUERDA</p>
        <div>
          <a href="./private">By </a>
        </div>
      </div>

      <div className="flex min-h-fit w-full lg:max-w-5xl bg-red-400">corpo</div>

      <div className="grid text-center mb-0 w-full lg:max-w-5xl lg:grid-cols-4 bg-blue-400">
        <div>DIV 1</div>
        <div>DIV 1</div>
        <div>DIV 1</div>
        <div>DIV 1</div>
      </div>
    </main>
  )
}
