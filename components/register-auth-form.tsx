"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerAuthSchema } from '../lib/validations/auth'
import { toast } from './ui/use-toast'
import { cn } from '../lib/utils'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { EyeIcon, Loader2Icon } from 'lucide-react'
import { EyeClosedIcon } from '@radix-ui/react-icons'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import { format } from 'date-fns'
import { signIn, signUp } from '../lib/services/auth'

interface RegisterAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof registerAuthSchema>

const genders = [
  {
    label: "Masculino",
    value: "M"
  },
  {
    label: "Feminino",
    value: "F"
  }
]

export function RegisterAuthForm({ className, ...props }: RegisterAuthFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(registerAuthSchema),
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  const [eyesIsOpen, setEyesIsOpen] = React.useState({
    password: false,
    confirmPassword: false
  })

  const values = watch()
  console.log(values)


  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signUp({ ...data, urlImgProfile: "" })

    setIsLoading(false)

    // if (!signInResult?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your sign in request failed. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    })
  }

  const handleEyeClick = (type: keyof typeof eyesIsOpen) => {
    setEyesIsOpen((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <div className={cn("grid gap-3 px-2 md:px-0", className)} {...props}>

      <Input
        placeholder="Digite seu nome"
        {...register("fullName")}
        error={errors.fullName?.message}
      />
      <DatePicker
        placeholder="Data de Nascimento"
        customSetDate={
          (e) => setValue("birthDate", format(e, "dd-MM-yyyy"))
        }
        error={watch("birthDate") ? "" : errors.birthDate?.message}
      />
      <div className='grid grid-cols-1 content-start gap-2 md:grid-cols-2'>
        <Input
          placeholder="email@example.com"
          {...register("email")}
          type="email"
          error={errors.email?.message}
        />
        <div>
          <Select onValueChange={(e) => setValue("gender", e)} defaultValue={watch("gender")}>
            <SelectTrigger className={cn(
              !watch("gender") && errors.gender?.message && "border-red-500 text-red-500",
            )}>
              <SelectValue placeholder="Gênero" />
            </SelectTrigger>
            <SelectContent >
              <SelectGroup >
                {genders.map((gender) => (
                  <SelectItem className='px-2' value={gender.value} key={gender.value}>
                    {gender.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {!watch("gender") && errors.gender?.message && (
            <span className='text-xs font-medium text-red-500'>{errors.gender?.message}</span>
          )}
        </div>
      </div>

      <Input
        placeholder="Senha"
        rightIcon={
          eyesIsOpen.password ?
            <EyeIcon onClick={() => handleEyeClick("password")} /> :
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
        className="w-full "
        onClick={() => {
          onSubmit(values)
          console.log(errors)
        }}
        disabled={isLoading}
      >
        {isLoading && <Loader2Icon className="mr-2 animate-spin" />}
        Continuar
      </Button>

    </div>
  )
}
