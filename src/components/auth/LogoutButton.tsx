'use client'

import { signOut } from 'next-auth/react'
import type { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const LogoutButton = ({ children }: Props) => {
  return (
    <div
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => {
        await signOut()
      }}
    >
      {children}
    </div>
  )
}

export default LogoutButton
