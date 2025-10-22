"use client";

import { Clock, Loader2, MessageSquare, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { ResponseStage } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  addNote,
  deleteNote,
  deleteResponse,
  editStage,
} from "../../action/response";

type Note = {
  id: string;
  content: string;
  createdAt: Date;
  responseId: string | null;
};

type Response = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  interest: string | null;
  createdAt: Date;
  stage: string;
  notes: Note[];
};

interface ResponseCardProps {
  response: Response;
}

export default function ResponseCard({ response }: ResponseCardProps) {
  const [initialNotes, setInitialNotes] = useState<Note[]>(response.notes);
  const [stage, setStage] = useState<string>(response.stage);
  const [tempStage, setTempStage] = useState<string>(response.stage);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [deletingResponse, setDeletingResponse] = useState(false);
  const [deletingNote, setDeletingNote] = useState(false);
  const [changingStage, setChangingState] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const lastNote = response.notes.length > 0 ? response.notes[0] : null;

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
      const result = await addNote(response.id, newNote);
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
      const result = await deleteNote(response.id, noteId);
      if (result.success) {
        // ✅ Remove the deleted note from the state
        setInitialNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== noteId)
        );

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
      const result = await deleteResponse(response.id);
      if (result.success) {
        setIsDeleteDialogOpen(false);
        toast.success("Response deleted", {
          description: "The response has been deleted successfully.",
        });
      } else {
        toast.error("Error", {
          description: result.error || "Failed to delete response",
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
  const isDirty = tempStage !== stage;

  const handleChangeStage = async () => {
    setChangingState(true);
    try {
      const result = await editStage(response.id, tempStage as ResponseStage);

      if (result.success) {
        toast.success("Stage updated", {
          description: "The response stage has been updated successfully.",
        });
        setStage(tempStage);
      } else {
        toast.error("Error", {
          description: result.error || "Failed to update stage",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setChangingState(false);
    }
  };

  return (
    <Card
      className={cn(
        " overflow-hidden gap-0 py-0 transition-all hover:shadow-md",
        stage === "LEAD" && "bg-blue-100",
        stage === "INTERESTED" && "bg-yellow-100",
        stage === "CONVERTED" && "bg-green-100",
        stage === "CANCELLED" && "bg-red-100"
      )}
    >
      <CardHeader className="py-3">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">{response.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-gray-100 duration-200 transition-all rounded-full"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete response</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="bg-white flex-1">
        <div className="space-y-2 py-4 text-sm">
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Date:</span>
            <span className="col-span-2">{formatDate(response.createdAt)}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Phone:</span>
            <span className="col-span-2">{response.phone}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Email:</span>
            <span className="col-span-2 break-all">{response.email}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Message:</span>
            <span className="col-span-2">{response.message}</span>
          </div>
          <div className="grid grid-cols-3">
            <span className="text-muted-foreground">Interest:</span>
            <span className="col-span-2">{response.interest}</span>
          </div>

          <div className="grid grid-cols-3 items-center gap-2">
            <span className="text-muted-foreground">Stage:</span>
            <div className="col-span-2 flex items-center gap-2">
              <Select value={tempStage} onValueChange={setTempStage}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Change stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LEAD">Lead</SelectItem>
                  <SelectItem value="INTERESTED">Interested</SelectItem>
                  <SelectItem value="CONVERTED">Converted</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              {isDirty && (
                <div className="flex gap-3 flex-wrap items-center">
                  <Button size="sm" onClick={handleChangeStage}>
                    {changingStage && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                  </Button>
                  <Button size="sm" onClick={() => setTempStage(stage)}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {lastNote && (
            <>
              <Separator className="my-3" />
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span>Latest Note</span>
                  <span className="flex items-center ml-auto">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(lastNote.createdAt)}
                  </span>
                </div>
                <p className="text-sm line-clamp-2">{lastNote.content}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 mt-auto pb-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setIsNotesOpen(true)}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          {initialNotes.length > 0
            ? `Manage Notes (${response.notes.length})`
            : "Add Notes"}
        </Button>
      </CardFooter>

      <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Notes for {response.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 my-4 max-h-[300px] overflow-y-auto">
            {initialNotes.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No notes yet
              </p>
            ) : (
              initialNotes.map((note) => (
                <div
                  key={note.id}
                  className="flex flex-col p-3 border rounded-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">{note.content}</div>

                    <Dialog>
                      <DialogTrigger>
                        <div className="h-8 w-8 cursor-pointer hover:bg-gray-100 duration-200 transition-all rounded-full flex items-center justify-center text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete note</span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Delete Response</DialogTitle>
                        </DialogHeader>
                        <DialogFooter className="flex space-x-2 justify-end">
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
                            {deletingNote && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
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
              className="mb-[1px] flex flex-col h-16 cursor-pointer"
              disabled={addingNote || !newNote.trim()}
            >
              {addingNote ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-1" />
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
              Are you sure you want to delete this response from {response.name}
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteResponse}
              disabled={deletingResponse}
            >
              Delete
              {deletingResponse && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
