'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { loginSchema } from '@/lib/Schemas/userZodSchema'
import { UserLoginAction } from '@/actions/auth/authAction'
// import Titulo from '../template/Titulo'
import AuthCard from './auth-card'

const FormLogin = () => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null)
    console.log(values)
    startTransition(async () => {
      const response = await UserLoginAction(values)
      if (response.error) {
        setError(response.error)
      } else {
        router.push('/private')
      }
    })
  }

  return (
    <AuthCard title="Conecte-se" description="">
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      type="email"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                      <div className="flex items-center">
                        <Link
                          href="/reset-password"
                          className="ml-auto inline-block text-sm text-secondary-foreground underline"
                        >
                          Esqueceu a senha?
                        </Link>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormMessage>{error}</FormMessage>}
            <Button type="submit" className="w-full" disabled={isPending}>
              Conectar
            </Button>
          </form>
        </Form>
        <div className="mt-5 space-y-4 text-sm">
          Não tem uma conta?{' '}
          <Link href="/register" className="underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </AuthCard>
  )
}
export default FormLogin
