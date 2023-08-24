import Image from 'next/image'
import { Button } from '@mantine/core';
import Head from 'next/head';
import HeaderNav from './components/HeaderNav';
import { TrendingUp } from 'lucide-react';
import HighlightPost from './components/HighlightPost';

import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })



const fakePosts = [{
  title: 'Como criar um site com Next.js',
  date: '2021-08-01',
  image: '/illustration.svg',
  slug: 'como-criar-um-site-com-nextjs',
}, {
  title: 'Como criar um site com Next.js',
  date: '2021-08-01',
  image: '/illustration.svg',
  slug: 'como-criar-um-site-com-nextjs',
},
{
  title: 'Como criar um site com Next.js',
  date: '2021-08-01',
  image: '/illustration.svg',
  slug: 'como-criar-um-site-com-nextjs',
},
{
  title: 'Como criar um site com Next.js',
  date: '2021-08-01',
  image: '/illustration.svg',
  slug: 'como-criar-um-site-com-nextjs',
},
{
  title: 'Como criar um site com Next.js',
  date: '2021-08-01',
  image: '/illustration.svg',
  slug: 'como-criar-um-site-com-nextjs',
}, {
  title: 'Como criar um site com Next.js',
  date: '2021-08-01',
  image: '/illustration.svg',
  slug: 'como-criar-um-site-com-nextjs',
}


]


export default function Home() {
  const year = new Date().getFullYear()

  return (
    <main
      className={`flex min-h-screen flex-col items-center md:justify-between pt-32  w-full z-10 ${outfit.className}`}
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
        <div className='flex items-center gap-x-4 justify-center'>
          <TrendingUp size={32} />
          <h2 className='text-3xl font-bold text-center'>
            Tendências
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 w-full'>
          {fakePosts.map(({ title, date, image, slug }, index) =>
            <HighlightPost
              key={index}
              title={title}
              date={date}
              image={image}
              slug={slug}
              index={index + 1}
            />)}
        </div>
      </section>

      <footer className='bg-black/10 w-full font-semibold  h-14 flex justify-center items-center  '>
        <p className='opacity-60 text-center'>Copyright © {year} IFMT HUB. All rights reserved.</p>
      </footer>
    </main >
  )
}
