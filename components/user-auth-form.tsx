"use client"

import * as React from "react"
import * as z from "zod"
import { userAuthSchema } from '../lib/validations/auth'
import { toast } from './ui/use-toast'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { useAuth } from './use-auth'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [eyesIsOpen, setEyesIsOpen] = React.useState({
    password: false,
    confirmPassword: false
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await login(data.email, data.password)

    setIsLoading(false)

    if (!signInResult) {
      return toast({
        title: "Algo deu errado",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleEyeClick = (type: keyof typeof eyesIsOpen) => {
    setEyesIsOpen((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <div className={cn("grid gap-2 px-4", className)} {...props}>
      <Input
        placeholder="Email"
        {...register("email")}
        type='email'
        error={errors.email?.message}
      />
      <Input
        placeholder="Senha"
        rightIcon={
          eyesIsOpen.password ?
            <EyeOpenIcon onClick={() => handleEyeClick("password")} /> :
            <EyeClosedIcon onClick={() => handleEyeClick("password")} />
        }
        type={
          eyesIsOpen.password ?
            "text" :
            "password"
        }
        {...register("password")}
        error={errors.password?.message}
      />

      <Button
        className="w-full select-none"
        onClick={() => handleSubmit(onSubmit)()}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 animate-spin" />}
        Entrar
      </Button>
    </div>
  )
}
