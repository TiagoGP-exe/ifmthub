"use client"

import Image from 'next/image'
import Head from 'next/head';
import { TrendingUp } from 'lucide-react';

import { Outfit } from 'next/font/google'
import HighlightPost from '../components/HighlightPost';
import { HeaderNav } from '../components/header-nav';
import { buttonVariants } from '../components/ui/button';
import Link from 'next/link';
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

      <div className='flex-col-reverse md:flex-row flex items-start md:gap-8 justify-center max-w-screen-xl md:w-11/12'>
        <div className='flex flex-col w-full md:w-1/2 gap-3 items-center md:items-start'>
          <h1 className='text-4xl text-center mt-4 md:text-start md:text-5xl font-heading lg:text-6xl max-w-xs  md:max-w-none'>
            Compartilhe suas ideias facilmente
          </h1>
          <p className='text-center md:text-start text-sm opacity-70 md:max-w-sm px-10 md:pl-0 mb-2 max-w-xs'>
            Junte-se à comunidade do IFMTHUB e experimente um CMS feito sob medida para estudantes.
          </p>

          <Link className={buttonVariants({
            variant: 'primary',
            className: 'mx-auto md:mx-0',
          })} href='/dashboard' >
            Comece a Ler
          </ Link>
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

      <section className='flex flex-col w-full justify-center md:items-start max-w-screen-xl md:w-11/12 mt-10'>
        <div className='flex items-center gap-x-4 justify-center mb-8'>
          <TrendingUp size={32} />
          <h2 className='text-3xl text-center font-heading '>
            Tendências
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 w-full place-items-center md:place-items-start'>
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
