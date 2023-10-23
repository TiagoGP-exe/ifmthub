import { Metadata } from "next"
import Link from "next/link"

import { cn } from "../../../lib/utils"
import { buttonVariants } from "../../../components/ui/button"
import { Icons } from '../../../components/icons'
import { UserAuthForm } from '../../../components/user-auth-form'
import Logo from '../../../components/logo'

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo />
          <p className="text-muted-foreground text-sm">
            Para se cadastrar preencha o formulário
          </p>
        </div>
        <UserAuthForm />
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Não possui conta? Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
