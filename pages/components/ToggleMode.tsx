import { ActionIcon, MantineNumberSize, useMantineColorScheme } from '@mantine/core';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ToggleModeProps {
  size: MantineNumberSize;
}

const ToggleMode = ({ size = "md" }: ToggleModeProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { setTheme, theme } = useTheme()

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'gray.1' : 'dark'}
      onClick={() => {
        setTheme(dark ? 'light' : 'dark')
        toggleColorScheme()
      }}
      title="Toggle color scheme"
      size={size}
    >
      {dark ? <Sun size="1.1rem" /> : <MoonStar size="1.1rem" />}
    </ActionIcon>
  )
}

export default ToggleMode