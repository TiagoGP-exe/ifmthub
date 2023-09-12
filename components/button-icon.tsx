import { FC } from 'react'
import { Icons } from './icons'
import { cva } from 'class-variance-authority'

interface ButtonIconProps {
  name: keyof typeof Icons
  size?: number
  color?: string
  active?: boolean
  onClick?: () => void
  className?: string
  paddingSize?: "default" | "sm" | "lg"
}

const buttonIconVariants = cva(" flex  justify-center items-center  md:hover:bg-accent active:translate-y-0.5 transition-all hover:text-foreground rounded", {
  variants: {
    variant: {
      active: "",
      default: "opacity-50  hover:opacity-100",
    },
    size: {
      default: "p-2",
      sm: "p-0.5",
      lg: "p-3",
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
})

export const ButtonIcon: FC<ButtonIconProps> = ({
  name,
  size = 24,
  color,
  active = false,
  onClick,
  className,
  paddingSize = "default",
}) => {

  const Icon = Icons[name]

  return (
    <button className={
      buttonIconVariants({
        variant: active ? "active" : "default",
        size: paddingSize,
        className
      })
    }
      onClick={onClick}
    >
      <Icon
        color={color}
        size={size}
      />
    </button>
  )
}