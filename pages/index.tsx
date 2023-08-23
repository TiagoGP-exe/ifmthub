import Image from 'next/image'
import { Outfit } from 'next/font/google'
import { Button } from '@mantine/core';
import Head from 'next/head';

const outfit = Outfit({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-8 ${outfit.className}`}
    >
      <Head>
        <title>Home</title>
      </Head>

      <div className='flex-col-reverse md:flex-row flex items-start md:gap-8 justify-center max-w-screen-xl'>

        <div className='w-full md:w-1/2'>
          <h1 className='text-white text-5xl'>
            Compartilhe suas ideias facilmente
          </h1>
          <p className='text-xs max-w-lg mb-4'>
            Não deixe que a tecnologia complicada atrapalhe sua criatividade e produtividade. Junte-se à comunidade do IFMTHUB e experimente um CMS feito sob medida para estudantes.
          </p>
          <Button className={outfit.className} color='green' size='md'>
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

    </main>
  )
}
