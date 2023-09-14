"use client"

import { Card } from '../../components/card'
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));

const array = Array.from(Array(100).keys())

export default function Home() {
  const [arrayTotal, setArrayTotal] = useState(array.slice(0, 10))
  const [isLoading, setIsLoading] = useState(false)

  const refreshPosts = useRef(null)
  const anotherIsInView = useInView(refreshPosts)

  useEffect(() => {
    if (anotherIsInView) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setArrayTotal(array.slice(0, arrayTotal.length + 10))
        setIsLoading(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [anotherIsInView, arrayTotal.length])

  return (

    <main className='xs:px-8 flex flex-col gap-y-8 px-4'>
      {
        arrayTotal.map((_, index) => (
          <Card key={index}
            date={new Intl.DateTimeFormat('pt-BR').format(date)}
            title='Dicas de Estudo Eficientes para o Sucesso Acadêmico'
            authorName='Amanda Silva'
            profileImage='/avatar-1.png'
            img={`https://source.unsplash.com/random/640x${index + 480}`}
            description='Descubra as melhores estratégias de estudo que me ajudaram a conquistar notas excelentes enquanto equilibrava minha vida acadêmica agitada...'
          />
        ))
      }
      {isLoading && (
        <div className="flex items-center justify-center py-2">
          <Loader2 className='animate-spin' size='24' />
        </div>
      )}
      <div ref={refreshPosts} />
    </main>
  )
}
