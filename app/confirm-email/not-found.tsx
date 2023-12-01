import Link from "next/link"
import { EmptyPlaceholder } from '../../components/empty-placeholder'
import { buttonVariants } from '../../components/ui/button'

export default function NotFound() {
  return (
    <EmptyPlaceholder className="mx-auto mt-10 w-11/12 max-w-[600px]">
      <EmptyPlaceholder.Icon name="warning" />
      <EmptyPlaceholder.Title>Uh oh! Não foi possível confirmar o email</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Por favor, verifique se link foi copiado corretamente
      </EmptyPlaceholder.Description>
      <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
        Voltar
      </Link>
    </EmptyPlaceholder>
  )
}
