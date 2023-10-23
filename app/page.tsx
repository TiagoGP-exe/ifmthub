
import Image from 'next/image'
import { TrendingUp } from 'lucide-react';

import { Outfit } from 'next/font/google'
import HighlightPost from '../components/HighlightPost';
import { HeaderNav } from '../components/header-nav';
import { buttonVariants } from '../components/ui/button';
import Link from 'next/link';
import { getTendency } from '../lib/services/post';
import { Metadata } from 'next';
const outfit = Outfit({ subsets: ['latin'] })

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const year = new Date().getFullYear()
  const tendency = await getTendency()

  return (
    <main
      className={`z-10 flex min-h-screen w-full flex-col items-center  pt-32 md:justify-between ${outfit.className}`}
    >
      <HeaderNav />

      <div className='flex max-w-screen-xl flex-col-reverse items-start justify-center md:w-11/12 md:flex-row md:gap-8'>
        <div className='flex w-full flex-col items-center gap-3 md:w-1/2 md:items-start'>
          <h1 className='font-heading mt-4 max-w-xs text-center text-4xl md:max-w-none md:text-start md:text-5xl  lg:text-6xl'>
            Compartilhe suas ideias facilmente
          </h1>
          <p className='mb-2 max-w-xs px-10 text-center text-sm opacity-70 md:max-w-sm md:pl-0 md:text-start'>
            Junte-se à comunidade do IFMTHUB e experimente um CMS feito sob medida para estudantes.
          </p>

          <Link
            href='/dashboard'
            className={buttonVariants({
              className: 'mx-auto md:mx-0',
            })}
          >
            Comece a Ler
          </ Link>
        </div>

        <div className='w-full md:w-1/2'>
          <Image
            alt='Ilustração de uma pessoa escrevendo em um quadro'
            src="/illustration.svg"
            height={400}
            width={600}
            className='aspect-video max-h-60 w-full object-fill sm:max-h-96 md:max-h-none'
          />
        </div>
      </div>

      <section className='mt-10 flex w-full max-w-screen-xl flex-col justify-center md:w-11/12 md:items-start'>
        <div className='mb-8 flex items-center justify-center gap-x-4'>
          <TrendingUp size={32} />
          <h2 className='font-heading text-center text-3xl '>
            Tendências
          </h2>
        </div>

        <div className='mb-8 grid w-full grid-cols-1 place-items-center gap-8 md:grid-cols-2 md:place-items-start lg:grid-cols-3'>
          {tendency.map(({ title, dateCreated, author: { photo, idUser, fullName } }, index) =>
            <HighlightPost
              key={index}
              title={title}
              date={dateCreated}
              image={`data:image/png;base64, ${photo}`}
              slug={idUser.toString()}
              index={index + 1}
              name={fullName}
            />)}
        </div>
      </section>

      <footer className='flex h-14 w-full  items-center justify-center bg-black/10 font-semibold  '>
        <p className='text-center opacity-60'>Copyright © {year} IFMT HUB. All rights reserved.</p>
      </footer>
    </main >
  )
}
