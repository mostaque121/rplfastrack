"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import DatePicker from "react-datepicker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "react-datepicker/dist/react-datepicker.css"; // Required CSS

interface CalendarProps {
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  className?: string;
  showOutsideDays?: boolean; // You can ignore, DatePicker shows all days by default
  inline?: boolean; // For always showing calendar inline
}

const Calendar: React.FC<CalendarProps> = ({
  selected,
  onChange,
  className,
  inline = true,
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      inline={inline}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="flex items-center justify-between px-2 py-1">
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className={cn(buttonVariants({ variant: "outline" }), "size-7")}
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-sm font-medium">
            {date.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className={cn(buttonVariants({ variant: "outline" }), "size-7")}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
      dayClassName={(date) =>
        cn(
          "text-sm p-1 rounded-md",
          selected && date.toDateString() === selected.toDateString()
            ? "bg-primary text-primary-foreground"
            : ""
        )
      }
      calendarClassName={cn("p-3", className)}
    />
  );
};

export { Calendar };
