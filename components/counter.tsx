import { animate } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CounterProps {
  from: number
  to: number
  duration: number
  delay?: number
}

export function Counter({ from, to, duration, delay }: CounterProps) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      type: 'spring',
      bounce: 0,
      delay,
      onUpdate(value) {
        setCount(Math.floor(value))
      },
    })

    return () => {
      controls.stop()
    }
  }, [delay, duration, from, to])

  return (
    <span className=''>{count}</span>
  )
}