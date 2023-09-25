import Link from "next/link"

import { cn } from "../../../lib/utils"
import { buttonVariants } from "../../../components/ui/button"
import Logo from '../../../components/logo'
import { UserAuthForm } from '../../../components/user-auth-form'
import { RegisterAuthForm } from '../../../components/register-auth-form'
import Image from 'next/image'

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="hidden h-full items-center justify-center bg-[#B8D8C7] lg:flex lg:flex-col" >
        <Image alt='Ilustração de uma pessoa escrevendo em um quadro'
          src="/illustration.svg" width={500} height={500} />

        <h1 className='font-heading mt-4 max-w-md text-center text-5xl text-black'>
          Compartilhe suas ideias facilmente
        </h1>
        <p className='mt-4 max-w-md px-10 text-center text-sm text-black opacity-60'>
          Junte-se à comunidade do IFMTHUB e experimente um CMS feito sob medida para estudantes.
        </p>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Para se cadastrar preencha o formulário
            </p>
          </div>
          <RegisterAuthForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
