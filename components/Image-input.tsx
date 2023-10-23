
import { PlusIcon, Trash } from 'lucide-react'
import Image from 'next/image'
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from 'react'

interface ImageInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string
  label?: string
  className?: string
  containerClassName?: string
  saveImage?: (image: File) => void
  removeImage?: () => void
  setErrors?: (errors: string) => void
  clearErrors?: () => void
  initialImage?: string
}

// eslint-disable-next-line react/display-name
export const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  (props, ref) => {
    const {
      label,
      className,
      error,
      onChange,
      saveImage,
      removeImage,
      setErrors,
      clearErrors,
      initialImage,
      ...rest
    } = props
    const [previewImage, setPreviewImage] = useState<string>(initialImage ?? "")

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event?.target?.files?.[0]) {
        const file = event.target.files[0]

        if (file.size > 15000000) {
          setErrors && setErrors('O tamanho da imagem não pode ser maior que 15MB')
          return
        }

        if (!file.type.includes('image')) {
          setErrors && setErrors('O arquivo deve ser uma imagem')
          return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewImage(reader.result as string)
          saveImage && saveImage(file)
          clearErrors && clearErrors()
        }
        reader.readAsDataURL(file)
      }
    }

    return (
      <div
        className={className}
      >
        {label && <label
          className={`ml-1 font-semibold capitalize md:text-lg ${!!error && 'text-red-500'
            }`}
        >
          {label}
        </label>}
        <main
          className={`group relative mt-2 flex h-48 cursor-pointer items-center justify-center  rounded-md border object-cover ${!!error ? 'border-red-500 text-red-500' : ''
            }`}
        >
          <input
            type='file'
            accept='image/*'
            ref={ref}
            onChange={handleImageChange}
            className={`h-full max-w-full cursor-pointer   opacity-0 ${previewImage && 'hidden'
              } `}
            {...rest}
          />
          {previewImage && (
            <span className='hover:bg-background/70 absolute flex h-full w-full cursor-pointer items-center justify-center rounded bg-transparent  text-transparent transition-all hover:text-red-500'>
              <Trash
                size={42}
                className='rounded-md p-2 hover:bg-red-500/10 active:scale-90'
                onClick={() => {
                  previewImage && setPreviewImage('')
                  removeImage && removeImage()
                }}
              />
            </span>
          )}

          {previewImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewImage}
              alt=''
              className='h-full w-full rounded-md object-cover'
            />
          )}

          {!previewImage && (
            <span
              className={`bg-foreground-soft/10 group-hover:bg-foreground-soft/30 absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-center transition-all`}
            >
              <PlusIcon className='text-foreground/60' />
            </span>
          )}
        </main>
        {error && <p className='ml-1 mt-1 text-sm text-red-500'>{error}</p>}
      </div>
    )
  }
)