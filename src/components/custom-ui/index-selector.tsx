"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Data {
  id: string;
  title: string;
  index: number;
}

interface IndexSelectorProps {
  currentIndex?: number;
  objects: Data[];
  isEditMode: boolean;
  currentId?: string;
  onIndexChange: (index: number) => void;
}

export function IndexSelector({
  currentIndex,
  objects,
  isEditMode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentId,
  onIndexChange,
}: IndexSelectorProps) {
  // Filter out the current service from the list for edit mode

  return (
    <div className="space-y-3">
      <Label htmlFor="index-select">Service Position (Index)</Label>
      <Select
        onValueChange={(value) => {
          onIndexChange(Number.parseInt(value));
        }}
        defaultValue={currentIndex?.toString()}
      >
        <SelectTrigger id="index-select" className="w-full">
          <SelectValue placeholder="Select a position" />
        </SelectTrigger>
        <SelectContent>
          {!isEditMode && (
            <SelectItem value={(objects.length + 1).toString()}>
              New position ({objects.length + 1})
            </SelectItem>
          )}
          {[...objects]
            .sort((a, b) => b.index - a.index)
            .map((object) => (
              <SelectItem key={object.id} value={object.index.toString()}>
                Position {object.index}: {object.title}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        {isEditMode
          ? "Selecting a different position will adjust other value' positions accordingly"
          : "Selecting an existing position will shift that value and all following value down"}
      </p>
    </div>
  );
}
