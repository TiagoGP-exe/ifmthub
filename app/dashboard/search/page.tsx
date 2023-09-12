"use client"

import { Input } from '../../../components/ui/input'

export default function Home() {
  return (
    <main className='xs:px-8 flex flex-col px-4'>
      <div className='bg-background sticky top-[4.5rem] py-3'>
        <Input
          placeholder='Pesquisar'
        />
      </div>
    </main>
  )
}
