import { Skeleton } from '../../../../components/ui/skeleton';


export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 px-4">
      <Skeleton className="h-16 w-full max-w-screen-sm" />
      <div className="flex w-full max-w-screen-sm items-center gap-4">
        <Skeleton className="h-16 w-16" />
        <Skeleton className="h-16 flex-1" />
      </div>
      <Skeleton className="mb-4 h-8 w-full max-w-screen-sm" />
      <Skeleton className="h-16 w-full max-w-screen-sm" />
      <Skeleton className="h-12 w-full max-w-screen-sm" />
      <Skeleton className="h-8 w-full max-w-screen-sm" />
    </div>
  )
}
