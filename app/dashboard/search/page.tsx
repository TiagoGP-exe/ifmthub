"use client"

import { Input } from '../../../components/ui/input'

export default function Home() {
  return (
    <>
      <div className='bg-background sticky top-[4.5rem] mx-auto w-11/12 py-3  '>
        <Input
          placeholder='Pesquisar'
        />
      </div>
    </>
  )
}
