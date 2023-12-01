import { notFound } from 'next/navigation'
import { confirmEmail } from '../../lib/services/auth'
import { buttonVariants } from '../../components/ui/button'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { EmptyPlaceholder } from '../../components/empty-placeholder'
import { ConfirmEmailButton } from '../../components/confirm-email-button'


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

    return (
      <EmptyPlaceholder className="mx-auto mt-10 w-11/12 max-w-[600px]">
        <EmptyPlaceholder.Icon name="check" />
        <EmptyPlaceholder.Title>Email confirmado</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Seu email foi confirmado com sucesso
        </EmptyPlaceholder.Description>
        <ConfirmEmailButton token={data.token} />
      </EmptyPlaceholder>
    )
  } catch (error) {
    console.error(error)

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
