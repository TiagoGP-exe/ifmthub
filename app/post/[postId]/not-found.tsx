import Link from "next/link"

import { buttonVariants } from "../../../components/ui/button"
import { EmptyPlaceholder } from "../../../components/empty-placeholder"

export default function NotFound() {
  return (
    <EmptyPlaceholder className="mx-auto max-w-[800px]">
      <EmptyPlaceholder.Icon name="warning" />
      <EmptyPlaceholder.Title>Uh oh! Não encontrado</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Esse post não está disponível
      </EmptyPlaceholder.Description>
      <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
        Voltar
      </Link>
    </EmptyPlaceholder>
  )
}
