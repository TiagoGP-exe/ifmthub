"use client"

import { Input } from '../../../components/ui/input'

export default function Home() {
  return (
    <main className='px-4 xs:px-8 flex flex-col'>
      <div className='sticky py-3 top-[4.5rem] bg-background'>
        <Input
          placeholder='Pesquisar'
        />
      </div>
    </main>
  )
}
