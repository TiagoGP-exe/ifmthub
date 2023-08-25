import Image from 'next/image'

const colorsHighlight = {
  1: 'text-yellow-500',
  2: 'text-gray-400',
  3: 'text-yellow-700',
  4: 'text-gray-500',
}

const returnColorByIndex = (index: unknown) => {

  if (Number(index) < 4) {
    const color = index as keyof typeof colorsHighlight

    return colorsHighlight[color]
  }

  return colorsHighlight[4]
}

export interface HighlightPostProps {
  title: string;
  date: string;
  image: string;
  slug: string;
  index: number;
}

const HighlightPost = ({ title, date, image, slug, index }: HighlightPostProps) => (
  <div onClick={() => console.log(slug)} className='flex flex-col items-start max-w-xs cursor-pointer'>
    <div className='flex items-center justify-center gap-x-4'>
      <h2 className={`text-2xl font-bold  ${returnColorByIndex(index)}`}>
        {index}º
      </h2>
      <Image
        unoptimized
        alt='Ilustração de uma pessoa escrevendo em um quadro'
        src={image}
        height={36}
        width={36}
        className="object-cover rounded-md"
      />
      <h1 className='text-xl font-heading'>
        Pamela Currey
      </h1>
    </div>

    <p className='text-xl text-ellipsis font-bold py-4'>
      {title}
    </p>

    <span className='text-sm opacity-70 '>
      {new Date(date).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
      }
    </span>

  </div>
)

export default HighlightPost