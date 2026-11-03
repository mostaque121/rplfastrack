"use client";

import { Clock, Loader2, MessageSquare, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { addNote, deleteEligibility, deleteNote } from "../../action/eligibility";

type Note = {
  id: string;
  content: string;
  createdAt: Date;
  eligibilitySubmissionId: string | null;
};

type Eligibility = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message?: string | null;
  industry: string;
  qualification: string;
  yearsOfExperience: number;
  stateLivedIn: string;
  createdAt: Date;
  notes: Note[];
};

interface EligibilityCardProps {
  eligibility: Eligibility;
}

export default function EligibilityCard({ eligibility }: EligibilityCardProps) {
  const [initialNotes, setInitialNotes] = useState<Note[]>(eligibility.notes);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [deletingResponse, setDeletingResponse] = useState(false);
  const [deletingNote, setDeletingNote] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const lastNote = eligibility.notes.length > 0 ? eligibility.notes[0] : null;

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setAddingNote(true);
    try {
      const result = await addNote(eligibility.id, newNote);
      if (result.success && result.addedNote) {
        setNewNote("");
        setInitialNotes((prevNotes) => [result.addedNote, ...prevNotes]);
        toast.success("Note added", {
          description: "Your note has been added successfully.",
        });
      } else {
        toast.error("Error", {
          description: result.error || "Failed to add note",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setAddingNote(false);
    }
  };

  const confirmDeleteNote = async (noteId: string) => {
    setDeletingNote(true);
    try {
      const result = await deleteNote(eligibility.id, noteId);
      if (result.success) {
        // ✅ Remove the deleted note from the state
        setInitialNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

        toast.success("Note deleted", {
          description: "The note has been deleted successfully.",
        });
      } else {
        toast.error("Error", {
          description: result.error || "Failed to delete note",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setDeletingNote(false);
    }
  };
  const confirmDeleteResponse = async () => {
    setDeletingResponse(true);
    try {
      const result = await deleteEligibility(eligibility.id);
      if (result.success) {
        setIsDeleteDialogOpen(false);
        toast.success("Eligibility deleted", {
          description: "The Eligibility has been deleted successfully.",
        });
      } else {
        toast.error("Error", {
          description: result.error || "Failed to delete Eligibility",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setDeletingResponse(false);
    }
  };

  return (
    <Card className="overflow-hidden py-0 transition-all hover:shadow-md">
      <CardHeader className="bg-slate-50 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{eligibility.fullName}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-destructive transition-all duration-200 hover:bg-gray-100 hover:text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete response</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Date:</span>
            <span className="col-span-2">{formatDate(eligibility.createdAt)}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Phone:</span>
            <span className="col-span-2">{eligibility.phoneNumber}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Email:</span>
            <span className="col-span-2 break-all">{eligibility.email}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Message:</span>
            <span className="col-span-2">{eligibility.message}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Industry:</span>
            <span className="col-span-2">{eligibility.industry}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Qualification:</span>
            <span className="col-span-2">{eligibility.qualification}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Experience:</span>
            <span className="col-span-2">{eligibility.yearsOfExperience}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Current City:</span>
            <span className="col-span-2">{eligibility.stateLivedIn}</span>
          </div>

          {lastNote && (
            <>
              <Separator className="my-3" />
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span>Latest Note</span>
                  <span className="ml-auto flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {formatDate(lastNote.createdAt)}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm">{lastNote.content}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-auto bg-slate-50 pt-3 pb-4">
        <Button variant="outline" size="sm" className="w-full" onClick={() => setIsNotesOpen(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {initialNotes.length > 0 ? `Manage Notes (${eligibility.notes.length})` : "Add Notes"}
        </Button>
      </CardFooter>

      <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Notes for {eligibility.fullName}</DialogTitle>
          </DialogHeader>

          <div className="my-4 max-h-[300px] space-y-4 overflow-y-auto">
            {initialNotes.length === 0 ? (
              <p className="py-4 text-center text-muted-foreground">No notes yet</p>
            ) : (
              initialNotes.map((note) => (
                <div key={note.id} className="flex flex-col rounded-md border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">{note.content}</div>

                    <Dialog>
                      <DialogTrigger>
                        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-destructive transition-all duration-200 hover:bg-gray-100">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete note</span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Delete Response</DialogTitle>
                        </DialogHeader>
                        <DialogFooter className="flex justify-end space-x-2">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            onClick={() => confirmDeleteNote(note.id)}
                            disabled={deletingNote}
                          >
                            {deletingNote && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {formatDate(note.createdAt)}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="new-note">Add a note</Label>
              <Textarea
                id="new-note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Type your note here..."
                className="mt-3 max-h-16"
                disabled={addingNote}
              />
            </div>
            <Button
              onClick={handleAddNote}
              className="mb-[1px] flex h-16 cursor-pointer flex-col"
              disabled={addingNote || !newNote.trim()}
            >
              {addingNote ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-1 h-4 w-4" />
              )}
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Response Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Response</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this response from {eligibility.fullName}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteResponse}
              disabled={deletingResponse}
            >
              Delete
              {deletingResponse && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
