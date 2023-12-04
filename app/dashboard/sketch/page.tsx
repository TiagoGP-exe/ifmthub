import { redirect, } from 'next/navigation';
import { DataTable, columns } from './data-table';
import { cookies } from 'next/headers'
import { api } from '../../../lib/api';


interface SketchProps {
  params: {};
  searchParams: { delete?: string }
}


const getAll = async () => {
  const token = cookies().get('authToken')?.value

  const { data } = await api.get('/post/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data
}

export default async function Sketch({ searchParams }: SketchProps) {
  let defaultData: string | any[] = [];

  if (searchParams.delete) {
    const token = cookies().get('authToken')?.value

    try {
      await api.delete(`post/${searchParams.delete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const test = await getAll()

      defaultData.push(...test)

    } catch (error) {

    }

  }


  try {
    const data = await getAll()

    return (
      <main className='xs:px-8 flex flex-col gap-y-8 px-4'>
        <h1 className='font-heading'>
          Sketch
        </h1>

        <DataTable columns={columns} data={defaultData.length > 0 ? defaultData : data} />
      </main>
    )
  } catch (error) {
    redirect('/dashboard')
  }
}
