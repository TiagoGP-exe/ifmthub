"use client"

import { useRouter } from 'next/navigation'
import { Input } from '../../../components/ui/input'

export default function Home() {
  const { push } = useRouter()

  const hundred = Array.from(Array(100).keys())

  return (

    <main className='xs:px-8 flex flex-col'>
      <div className='sticky py-3 top-[4.5rem] bg-background'>
        <Input
          placeholder='Pesquisar'
          icon='search'
          size='xs'
          onChange={() => { }}
        />
      </div>


    </main>
  )
}
