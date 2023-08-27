"use client"

import { useRouter } from 'next/navigation'
import { Input } from '../../../components/ui/input'

export default function Home() {

  return (
    <main className='xs:px-8 flex flex-col'>
      <div className='sticky py-3 top-[4.5rem] bg-background'>
        <Input
          placeholder='Pesquisar'
        />
      </div>
    </main>
  )
}
