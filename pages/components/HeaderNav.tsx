import { Button, useMantineColorScheme } from '@mantine/core'
import { Logo } from './Logo'

export const HeaderNav = () => {
  const { colorScheme } = useMantineColorScheme()

  const isDark = colorScheme === 'dark'

  return (
    <header className='flex items-center justify-center p-8 backdrop-blur-2xl bg-white/90 fixed top-0 w-full z-10'>
      <main className='flex items-center justify-between max-w-screen-xl w-full gap-4'>
        <Logo />

        <Button variant='outline' size='md' color={isDark ? 'gray.0' : 'dark'}>
          Começar a Escrever
        </Button>
      </main>
    </header>
  )
}