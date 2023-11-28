"use client"

import * as React from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerAuthSchema } from '../lib/validations/auth'
import { toast } from './ui/use-toast'
import { cn, getFileDimensions } from '../lib/utils'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { Loader2Icon } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import { format } from 'date-fns'
import { signUp, updateImage } from '../lib/services/auth'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'
import { ImageInput } from './Image-input'
import imageCompression from 'browser-image-compression'
import { useRouter } from 'next/navigation'

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
    setValue,
    formState: { errors },
    watch, handleSubmit,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(registerAuthSchema),
  })
  const { push } = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [eyesIsOpen, setEyesIsOpen] = React.useState({
    password: false,
    confirmPassword: false
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    try {
      const payload = await signUp(data)

      if (data.photo) {
        const formdata = new FormData()

        formdata.append('file', data.photo)

        await updateImage(payload.idUser, formdata)
      }


      toast({
        title: "Verifique seu email",
        description: "Enviamos um email com um link para confirmar sua conta.",
      })

      push("/login")
    } catch (error) {
      return toast({
        title: "Erro",
        description: "Algo deu errado. Tente novamente.",
        variant: "destructive",
      })

    } finally {
      setIsLoading(false)
    }


  }

  const convertSizeFileAndUnit = (fileSize: number): string => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = fileSize;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };


  const compressedImages = async (file: File) => {
    const result = await getFileDimensions(file);

    const minorDimension = Math.min(result.width, result.height);

    const compressedFiles = await imageCompression(file, {
      maxWidthOrHeight: minorDimension < 256 ? minorDimension : 256,
      alwaysKeepResolution: true
    });

    setValue("photo", compressedFiles);
  }

  const handleEyeClick = (type: keyof typeof eyesIsOpen) => {
    setEyesIsOpen((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <div className={cn("grid gap-3 px-2 md:px-0", className)} {...props}>
      <ImageInput
        saveImage={(e) => compressedImages(e)}
        error={errors?.photo?.message?.toString()} className='w-full'
      />

      <Input
        placeholder="Digite seu nome"
        {...register("fullName")}
        error={errors.fullName?.message}
      />

      <DatePicker
        placeholder="Data de Nascimento"
        customSetDate={
          (e) => setValue("birthDate", format(e, "dd/MM/yyyy"))
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
          <Select onValueChange={(e: any) => setValue("gender", e)} defaultValue={watch("gender")}>
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
        className="w-full "
        onClick={() => handleSubmit(onSubmit)()}
        disabled={isLoading}
      >
        {isLoading && <Loader2Icon className="mr-2 animate-spin" />}
        Continuar
      </Button>

    </div>
  )
}
