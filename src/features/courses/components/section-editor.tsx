"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FieldErrors, FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { deleteSection, saveSection } from "../actions";
import { SectionEditorValues, sectionEditorSchema, slugify } from "../schema";
import { FaqEditor, ImageFields, RichTextField, SeoFields, SlugField } from "./editor-fields";
import { SaveBar } from "./save-bar";

const TAB_FIELDS: Record<string, string[]> = {
  basics: ["title", "link", "index", "imageSquareLink", "imageCoverLink", "imageAlt"],
  intro: ["intro"],
  faqs: ["faqs"],
  seo: ["metaTitle", "metaDescription"],
};

const tabOf = (field: string) =>
  Object.entries(TAB_FIELDS).find(([, fields]) => fields.includes(field.split(".")[0]))?.[0] ??
  "basics";

export function SectionEditor({
  sectionId,
  initialValues,
  courseCount,
}: {
  sectionId: string | null;
  initialValues: SectionEditorValues;
  courseCount: number;
}) {
  const router = useRouter();
  const [tab, setTab] = useState("basics");
  const [saving, startSaving] = useTransition();
  const [deleting, setDeleting] = useState(false);
  const isNew = !sectionId;

  const form = useForm<SectionEditorValues>({
    resolver: zodResolver(sectionEditorSchema),
    defaultValues: initialValues,
  });
  const { control, formState } = form;
  const values = useWatch({ control }) as SectionEditorValues;
  const errorTabs = new Set(Object.keys(formState.errors).map(tabOf));

  const onSubmit = (data: SectionEditorValues) =>
    startSaving(async () => {
      const result = await saveSection(sectionId, data);
      if (!result.success) {
        for (const [name, message] of Object.entries(result.fieldErrors ?? {})) {
          form.setError(name as keyof SectionEditorValues, { message });
        }
        const field = Object.keys(result.fieldErrors ?? {})[0];
        if (field) setTab(tabOf(field));
        toast.error(result.message);
        return;
      }
      toast.success(isNew ? "Section created" : "Section saved");
      form.reset(data);
      if (isNew) router.replace(`/admin/content/sections/${result.id}`);
      else router.refresh();
    });

  const onInvalid = (errors: FieldErrors<SectionEditorValues>) => {
    const [field, error] = Object.entries(errors)[0] ?? [];
    if (!field) return;
    setTab(tabOf(field));
    toast.error((error as { message?: string })?.message ?? "Check the highlighted fields");
  };

  const onDelete = async () => {
    if (!sectionId) return;
    setDeleting(true);
    const result = await deleteSection(sectionId);
    setDeleting(false);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Section deleted");
    form.reset(initialValues);
    router.replace("/admin/content/sections");
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} noValidate>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {Object.keys(TAB_FIELDS).map((name) => (
              <TabsTrigger key={name} value={name} className="relative capitalize">
                {name === "seo"
                  ? "SEO"
                  : name === "faqs"
                    ? `FAQs (${values.faqs?.length ?? 0})`
                    : name}
                {errorTabs.has(name) && (
                  <span className="absolute top-1 right-1 size-1.5 rounded-full bg-destructive" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value="basics"
            forceMount
            className="space-y-6 pt-4 data-[state=inactive]:hidden"
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (isNew && !formState.dirtyFields.link) {
                          form.setValue("link", slugify(e.target.value));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SlugField<SectionEditorValues> name="link" prefix="/section/" isNew={isNew} />
            <FormField
              control={control}
              name="index"
              render={({ field }) => (
                <FormItem className="max-w-48">
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ImageFields<SectionEditorValues> />
          </TabsContent>

          <TabsContent value="intro" forceMount className="pt-4 data-[state=inactive]:hidden">
            <RichTextField<SectionEditorValues>
              name="intro"
              label="Intro"
              description="200–400 words about this industry: who RPL suits, common roles, how the qualifications differ."
              minHeight="16rem"
            />
          </TabsContent>

          <TabsContent value="faqs" forceMount className="pt-4 data-[state=inactive]:hidden">
            <FaqEditor<SectionEditorValues> />
          </TabsContent>

          <TabsContent value="seo" forceMount className="pt-4 data-[state=inactive]:hidden">
            <SeoFields<SectionEditorValues>
              path={`/section/${values.link || "…"}`}
              fallbackTitle={values.title || "Section title"}
            />
          </TabsContent>
        </Tabs>

        <SaveBar
          dirty={formState.isDirty}
          saving={saving}
          onDiscard={() => form.reset()}
          extra={
            sectionId && (
              <DeleteDialog
                title="Delete this section?"
                description={
                  courseCount > 0
                    ? `It still has ${courseCount} course(s). Move them to another section first.`
                    : "The section page will 404."
                }
                onConfirm={onDelete}
                isLoading={deleting}
              >
                <Button type="button" variant="ghost" className="text-destructive">
                  <Trash2 /> Delete
                </Button>
              </DeleteDialog>
            )
          }
        />
      </form>
    </FormProvider>
  );
}
