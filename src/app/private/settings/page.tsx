import Link from 'next/link'
import UserSettingsForm from '@/components/auth/FormUserSettings'
import { auth } from '@/lib/auth'
import ControllerDB from '@/controller'

export default async function Settings() {
  const session = await auth()
  const userData = await ControllerDB.user.getById(session?.user.id)
  delete userData.password

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="#" className="font-semibold text-primary">
              Geral
            </Link>
            <Link href="#">Support</Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
            <UserSettingsForm user={userData} />
          </div>
        </div>
      </main>
    </div>
  )
}
