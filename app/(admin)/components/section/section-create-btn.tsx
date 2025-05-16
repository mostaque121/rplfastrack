"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import SectionForm from "./section-form";

interface Section {
  id: string;
  title: string;
  metaDescription: string;
  index: number;
  imageSquareLink: string;
  imageSquarePublicId: string;
  imageCoverLink: string;
  imageCoverPublicId: string;
  link: string;
}
interface SectionFormProps {
  allSections: Section[];
}

export default function SectionCreateBtn({ allSections }: SectionFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus size={18} />
        Create Section
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="min-w-[calc(100%-100px)] ">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>Write a new Project.</DialogDescription>
          </DialogHeader>
          <SectionForm allSections={allSections} closeForm={setIsDialogOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
