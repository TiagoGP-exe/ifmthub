import Image from 'next/image'
import { Outfit } from 'next/font/google'
import { Button } from '@mantine/core';
import Head from 'next/head';
import { HeaderNav } from './components/HeaderNav';
import { TrendingUp } from 'lucide-react';


export default function Home() {
  const year = new Date().getFullYear()

  return (
    <main
      className={`flex min-h-screen flex-col items-center md:justify-between pt-32  w-full z-10`}
    >
      <HeaderNav />
      <Head>
        <title>Home</title>
      </Head>

      <div className='flex-col-reverse md:flex-row flex items-start px-8 md:gap-8 justify-center max-w-screen-xl '>
        <div className='w-full md:w-1/2'>
          <h1 className=' text-5xl'>
            Compartilhe suas ideias facilmente
          </h1>
          <p className='text-xs max-w-lg mb-4'>
            Não deixe que a tecnologia complicada atrapalhe sua criatividade e produtividade. Junte-se à comunidade do IFMTHUB e experimente um CMS feito sob medida para estudantes.
          </p>
          <Button color='green' size='md'>
            Comece a Ler
          </Button>
        </div>

        <div className='w-full md:w-1/2'>
          <Image
            alt='Ilustração de uma pessoa escrevendo em um quadro'
            src="/illustration.svg"
            height={400}
            width={600}
            className='w-full aspect-video object-fill max-h-60 sm:max-h-96 md:max-h-none'
          />
        </div>
      </div>

      <section className='flex flex-col w-full items-start max-w-screen-xl p-8'>
        <div className='flex items-center gap-4 justify-center'>
          <TrendingUp size={32} />
          <h2 className='text-3xl font-bold text-center'>
            Tendências
          </h2>
        </div>

        <div>
          <Image
            unoptimized
            alt='Ilustração de uma pessoa escrevendo em um quadro'
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            height={36}
            width={36}
            className='w-full aspect-square rounded-lg object-cover border-2'
          />
        </div>
      </section>

      <footer className='bg-black/10 w-full font-semibold  h-14 flex justify-center items-center  '>
        <p className='opacity-60 text-center'>Copyright © {year} IFMT HUB. All rights reserved.</p>
      </footer>
    </main >
  )
}
