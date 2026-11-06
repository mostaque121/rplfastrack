"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, ArrowUp, ExternalLink, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FieldErrors, FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import SelectCourse from "@/components/custom-ui/select-course";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploaderServer } from "@/components/uploader/image-uploader-server";
import {
  FaqEditor,
  RichTextField,
  SeoFields,
  SlugField,
  TextField,
} from "@/features/courses/components/editor-fields";
import { SaveBar } from "@/features/courses/components/save-bar";
import { slugify } from "@/features/courses/schema";

import { deleteGuide, saveGuide } from "../actions";
import { GuideEditorValues, guideEditorSchema } from "../schema";

type CourseOption = { id: string; title: string; code: string | null; status: string };

const TAB_FIELDS: Record<string, string[]> = {
  basics: [
    "title",
    "slug",
    "status",
    "index",
    "excerpt",
    "imageLink",
    "imageAlt",
  ],
  article: ["body"],
  qualifications: ["courseIds"],
  faqs: ["faqs"],
  seo: ["metaTitle", "metaDescription"],
};

const tabOf = (field: string) =>
  Object.entries(TAB_FIELDS).find(([, fields]) => fields.includes(field.split(".")[0]))?.[0] ??
  "basics";

const words = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

export function GuideEditor({
  guideId,
  initialValues,
  courses,
}: {
  guideId: string | null;
  initialValues: GuideEditorValues;
  courses: CourseOption[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState("basics");
  const [saving, startSaving] = useTransition();
  const [deleting, setDeleting] = useState(false);
  const isNew = !guideId;

  const form = useForm<GuideEditorValues>({
    resolver: zodResolver(guideEditorSchema),
    defaultValues: initialValues,
  });
  const { control, formState, setValue } = form;
  const values = useWatch({ control }) as GuideEditorValues;
  const errorTabs = new Set(Object.keys(formState.errors).map(tabOf));
  const linked = values.courseIds ?? [];
  const courseById = new Map(courses.map((c) => [c.id, c]));
  const setLinked = (ids: string[]) =>
    setValue("courseIds", ids, { shouldDirty: true, shouldValidate: true });

  const onSubmit = (data: GuideEditorValues) =>
    startSaving(async () => {
      const result = await saveGuide(guideId, data);
      if (!result.success) {
        for (const [name, message] of Object.entries(result.fieldErrors ?? {})) {
          form.setError(name as keyof GuideEditorValues, { message });
        }
        const field = Object.keys(result.fieldErrors ?? {})[0];
        if (field) setTab(tabOf(field));
        toast.error(result.message);
        return;
      }
      toast.success(isNew ? "Guide created" : "Guide saved");
      form.reset(data);
      if (isNew) router.replace(`/admin/content/guides/${result.id}`);
      else router.refresh();
    });

  const onInvalid = (errors: FieldErrors<GuideEditorValues>) => {
    const [field, error] = Object.entries(errors)[0] ?? [];
    if (!field) return;
    setTab(tabOf(field));
    toast.error((error as { message?: string })?.message ?? "Check the highlighted fields");
  };

  const onDelete = async () => {
    if (!guideId) return;
    setDeleting(true);
    const result = await deleteGuide(guideId);
    setDeleting(false);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Guide deleted");
    form.reset(initialValues);
    router.replace("/admin/content/guides");
  };

  const label = (name: string) =>
    name === "seo"
      ? "SEO"
      : name === "faqs"
        ? `FAQs (${values.faqs?.length ?? 0})`
        : name === "qualifications"
          ? `Qualifications (${linked.length})`
          : name;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} noValidate>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {Object.keys(TAB_FIELDS).map((name) => (
              <TabsTrigger key={name} value={name} className="relative capitalize">
                {label(name)}
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
                  <FormLabel>Title (H1)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (isNew && !formState.dirtyFields.slug) {
                          setValue("slug", slugify(e.target.value));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SlugField<GuideEditorValues> name="slug" prefix="/guides/" isNew={isNew} />
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft (hidden)</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="index"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position on /guides</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormDescription>Position 1 is the large featured card.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormDescription>
                    1–2 plain sentences, shown under the title and on the guide card.
                  </FormDescription>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 rounded-lg border p-4">
              <p className="font-medium">Cover image (16:9)</p>
              <ImageUploaderServer
                key={values.imageLink ? "has-image" : "empty"}
                uploadPreset="service-cover"
                initialImage={values.imageLink || null}
                onImageUploaded={(link) =>
                  setValue("imageLink", link, { shouldDirty: true, shouldValidate: true })
                }
                aspectRatio={16 / 9}
              />
              <TextField<GuideEditorValues>
                name="imageLink"
                label="Image URL"
                description="Filled in by the uploader. A /images/guides/… path for images kept in the repo also works."
              />
              <TextField<GuideEditorValues> name="imageAlt" label="Alt text" />
            </div>
          </TabsContent>

          <TabsContent value="article" forceMount className="pt-4 data-[state=inactive]:hidden">
            <RichTextField<GuideEditorValues>
              name="body"
              label={`Article (${words(values.body ?? "")} words)`}
              description="Use Heading 2 for main sections: they become the “In this guide” list. Answer each heading’s question in its first sentence, and link to qualification pages with descriptive anchor text."
              minHeight="32rem"
            />
          </TabsContent>

          <TabsContent
            value="qualifications"
            forceMount
            className="space-y-4 pt-4 data-[state=inactive]:hidden"
          >
            <p className="text-sm text-muted-foreground">
              Shown as cards under the article, in this order. The guide is also listed under
              “Helpful guides” on each of these course pages.
            </p>
            <SelectCourse
              key={linked.length}
              courses={courses
                .filter((c) => !linked.includes(c.id))
                .map((c) => ({
                  id: c.id,
                  title: `${c.code ? `${c.code} ` : ""}${c.title}${c.status === "DRAFT" ? " (draft)" : ""}`,
                }))}
              onChange={(id) => id && setLinked([...linked, id])}
              error={formState.errors.courseIds?.message}
            />
            <ol className="divide-y rounded-lg border">
              {linked.length === 0 && (
                <li className="p-4 text-sm text-muted-foreground">No qualifications linked yet.</li>
              )}
              {linked.map((id, i) => {
                const course = courseById.get(id);
                const move = (to: number) => {
                  const next = [...linked];
                  next.splice(i, 1);
                  next.splice(to, 0, id);
                  setLinked(next);
                };
                return (
                  <li key={id} className="flex items-center gap-2 p-2 pl-4">
                    <span className="w-6 text-sm text-muted-foreground tabular-nums">{i + 1}</span>
                    <span className="flex-1 text-sm">
                      {course ? `${course.code ? `${course.code} ` : ""}${course.title}` : id}
                      {course?.status === "DRAFT" && (
                        <span className="ml-2 text-xs text-amber-700">draft, hidden</span>
                      )}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={i === 0}
                      onClick={() => move(i - 1)}
                      aria-label="Move up"
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={i === linked.length - 1}
                      onClick={() => move(i + 1)}
                      aria-label="Move down"
                    >
                      <ArrowDown />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setLinked(linked.filter((x) => x !== id))}
                      aria-label="Remove"
                    >
                      <X />
                    </Button>
                  </li>
                );
              })}
            </ol>
          </TabsContent>

          <TabsContent value="faqs" forceMount className="pt-4 data-[state=inactive]:hidden">
            <FaqEditor<GuideEditorValues> />
          </TabsContent>

          <TabsContent value="seo" forceMount className="pt-4 data-[state=inactive]:hidden">
            <SeoFields<GuideEditorValues>
              path={`/guides/${values.slug || "…"}`}
              fallbackTitle={values.title || "Guide title"}
            />
          </TabsContent>
        </Tabs>

        <SaveBar
          dirty={formState.isDirty}
          saving={saving}
          onDiscard={() => form.reset()}
          extra={
            guideId && (
              <>
                <Button type="button" variant="ghost" asChild>
                  <a
                    href={`/api/admin/preview?path=${encodeURIComponent(`/guides/${initialValues.slug}`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink /> Preview
                  </a>
                </Button>
                <DeleteDialog
                  title="Delete this guide?"
                  description="The guide page will 404 and its links on course pages disappear."
                  onConfirm={onDelete}
                  isLoading={deleting}
                >
                  <Button type="button" variant="ghost" className="text-destructive">
                    <Trash2 /> Delete
                  </Button>
                </DeleteDialog>
              </>
            )
          }
        />
      </form>
    </FormProvider>
  );
}
