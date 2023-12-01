import { notFound, useRouter } from 'next/navigation'
import { confirmEmail } from '../../lib/services/auth'
import { Button, buttonVariants } from '../../components/ui/button'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { EmptyPlaceholder } from '../../components/empty-placeholder'


interface ConfirmEmailProps {
  params: {}
  searchParams: { token: string }
}

export default async function ConfirmEmail(props: ConfirmEmailProps) {

  if (!props.searchParams?.token) {
    notFound()
  }


  try {

    const data = await confirmEmail(props.searchParams?.token)

    const setCookies = () => {
      Cookies.set('authToken', data.token, { expires: new Date(Date.now() + 60 * 60 * 1000) })
    }

    return (
      <EmptyPlaceholder className="mx-auto mt-10 w-11/12 max-w-[600px]">
        <EmptyPlaceholder.Icon name="check" />
        <EmptyPlaceholder.Title>Email confirmado</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Seu email foi confirmado com sucesso
        </EmptyPlaceholder.Description>
        <Link href="/dashboard" onClick={setCookies} className={buttonVariants({ variant: "ghost" })}>
          Voltar
        </Link>
      </EmptyPlaceholder>
    )
  } catch (error) {
    return (
      <EmptyPlaceholder className="mx-auto mt-10 w-11/12 max-w-[600px]">
        <EmptyPlaceholder.Icon name="warning" />
        <EmptyPlaceholder.Title>Email não confirmado</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Não foi possível confirmar o email
        </EmptyPlaceholder.Description>
        <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
          Voltar
        </Link>
      </EmptyPlaceholder>
    )
  }

}
