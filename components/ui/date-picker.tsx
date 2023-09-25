"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Calendar } from './calendar'

interface DatePickerProps {
  placeholder: string
  customSetDate: (date: Date) => void
  error?: string
}

export function DatePicker({
  placeholder,
  customSetDate,
  error
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
            error && "border-red-500 text-red-500"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          defaultMonth={date}
          mode="single"
          selected={date}
          onSelect={(e) => {
            if (!e) return
            customSetDate(e)
            setDate(e)
          }}
          initialFocus
        />
      </PopoverContent>
      {
        error && <span className="text-xs text-red-500">{error}</span>
      }
    </Popover>
  )
}
