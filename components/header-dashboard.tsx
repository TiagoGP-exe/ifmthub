import Image from 'next/image'
import { ButtonIcon } from './button-icon'
import { ModeToggle } from './mode-toggle'

export const HeaderDashboard = () => (
  <header className='py-5 px-4 border-b flex items-center justify-between mb-8 sticky -top-2 bg-background/80 backdrop-blur-md xs:px-8'>
    <ButtonIcon
      className='hidden md:block'
      name='add'
    />

    <div className='flex flex-row-reverse md:flex-row items-center flex-1 md:flex-none gap-4 justify-between md:justify-center'>
      <ModeToggle />

      <div className='flex items-center gap-2 '>
        <Image alt='profile' src='/avatar-1.png' width={36} height={36} className='rounded-md object-cover aspect-square border-2 border-foreground bg-foreground' />
        <div className='flex flex-col'>
          <span className='text-[0.6rem] opacity-70'>Bem vindo de volta </span>
          <p className='leading-5  text-lg font-bold'>PAMELA CURREY</p>
        </div>
      </div>
    </div>
  </header>
)
