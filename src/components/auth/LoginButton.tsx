'use client'

import { signIn } from 'next-auth/react'
import type { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const LoginButton = ({ children }: Props) => {
  return (
    <div
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => {
        await signIn()
      }}
    >
      {children}
    </div>
  )
}

export default LoginButton
