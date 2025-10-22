"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import DatePicker from "react-datepicker";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import "react-datepicker/dist/react-datepicker.css";

interface DateRangeType {
  from: Date | null;
  to: Date | null;
}

interface DatePickerWithRangeProps {
  date: DateRangeType | undefined;
  onDateChange: (date: DateRangeType | undefined) => void;
  className?: string;
}

export function DatePickerWithRange({
  date,
  onDateChange,
  className,
}: DatePickerWithRangeProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !date?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DatePicker
            selected={date?.from || null}
            onChange={(update: [Date | null, Date | null]) => {
              const [from, to] = update;
              onDateChange({ from, to });
            }}
            startDate={date?.from || null}
            endDate={date?.to || null}
            selectsRange
            inline
            monthsShown={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
