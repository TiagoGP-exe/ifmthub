import { Button, useMantineColorScheme } from '@mantine/core'
import Logo from './Logo'
import ToggleMode from './ToggleMode'
import { useMediaQuery } from '@mantine/hooks'

const HeaderNav = () => {
  const { colorScheme } = useMantineColorScheme()
  const matches = useMediaQuery('(min-width: 768px)')

  const isDark = colorScheme === 'dark'

  return (
    <header className={`flex items-center justify-center py-8 backdrop-blur-lg  fixed top-0 w-full z-10 ${isDark ? "bg-[#1A1B1E]/95" : "bg-white/95"}`}>
      <main className='flex items-center justify-between px-8 max-w-screen-xl w-full gap-4'>
        <Logo />

        <div className='flex items-center justify-center gap-2'>
          <ToggleMode size={matches ? 'xl' : 'md'} />

          <Button variant='outline' size={matches ? 'md' : 'xs'} color={isDark ? 'gray.0' : 'dark'}>
            Começar a Escrever
          </Button>
        </div>
      </main>
    </header>
  )
}

export default HeaderNav