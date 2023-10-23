import * as React from "react"
import { cn } from '../../lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, error, ...props }, ref) => {
    return (
      <div>
        <div className='relative'>
          <input
            type={type}
            className={cn(
              "border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-8",
              rightIcon && "pr-8",
              error && "border-red-500 focus-visible:ring-red-500/30",
              className,
            )}
            ref={ref}
            {...props}
          />

          {leftIcon &&
            <div className='text-foreground-soft hover:text-foreground absolute inset-y-0 left-3 flex  w-4 cursor-pointer items-center active:scale-90'>
              {leftIcon}
            </div>
          }

          {rightIcon &&
            <div className='text-foreground/50 hover:text-foreground absolute inset-y-0 right-3 flex  w-4 cursor-pointer items-center active:scale-90'>
              {rightIcon}
            </div>
          }


        </div>
        {
          error && <p className={`text-xs text-red-500 ${className} mt-1`}>{error}</p>
        }

      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
