"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { GetPostByIdProps } from '../../../lib/services/post'
import Link from 'next/link'
import { Edit, Eye, Trash } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../../components/ui/alert-dialog'


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export const columns: ColumnDef<GetPostByIdProps>[] = [
  {
    accessorKey: "title",
    header: () => <div >Titulo</div>,
    cell: ({ row }) => {
      const value = row.getValue("title") as string;
      return <div className='text-xs sm:text-base'>{value}</div>
    },
  },
  {
    accessorKey: "dateCreated",
    header: () => <div>Data Criada</div>,
    cell: ({ row }) => {
      const amount = row.getValue("dateCreated") as string;
      const formatted = amount ? new Intl.DateTimeFormat("pt-BR")?.format(new Date(amount)) : "";

      return <div className='text-xs sm:text-base'>{formatted}</div>
    },
  }, {
    accessorKey: "idPost",
    header: () => <div className="text-center">Ação</div>,
    cell: ({ row }) => {

      const id = row.getValue("idPost")

      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/post/${id}`}
            className='hover:bg-muted rounded-md border p-2 transition-all active:scale-95'
          >
            <Eye className='h-4 w-4' />
          </Link>
          <Link
            href={`/editor/${id}`}
            className='hover:bg-muted rounded-md border p-2 transition-all active:scale-95'
          >
            <Edit className='h-4 w-4' />
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <div
                className='hover:bg-muted rounded-md border p-2 transition-all active:scale-95'
              >
                <Trash className='h-4 w-4' />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirma a ação?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cuidado, essa ação não pode ser desfeita, você tem certeza que deseja continuar?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <Link href={`?delete=${id}`}>
                  <AlertDialogAction >Remover</AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

      )
    },
  },
]

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
