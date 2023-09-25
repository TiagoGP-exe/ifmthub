import Image from 'next/image'
import { Outfit } from 'next/font/google'
import Head from 'next/head';
import { Button } from './components/ui/button';

const outfit = Outfit({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-8 ${outfit.className}`}
    >
      <Head>
        <title>Home</title>
      </Head>

      <div className='flex max-w-screen-xl flex-col-reverse items-start justify-center md:flex-row md:gap-8'>

        <div className='w-full md:w-1/2'>
          <h1 className='text-5xl text-white'>
            Compartilhe suas ideias facilmente
          </h1>
          <p className='mb-4 max-w-lg text-xs'>
            Não deixe que a tecnologia complicada atrapalhe sua criatividade e produtividade. Junte-se à comunidade do IFMTHUB e experimente um CMS feito sob medida para estudantes.
          </p>
          <Button className={outfit.className} color='green'>
            Comece a Ler
          </Button>
        </div>

        <div className='w-full md:w-1/2'>
          <Image
            alt='illustration'
            src="/illustration.svg"
            height={400}
            width={600}
            className='aspect-video max-h-60 w-full object-fill sm:max-h-96 md:max-h-none'
          />
        </div>
      </div>

    </main>
  )
}
