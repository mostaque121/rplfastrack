"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Circle, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FieldErrors, FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { RichText } from "@/components/rich-text/rich-text";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { deleteCourse, saveCourse } from "../actions";
import { courseCompleteness, MIN_FAQS } from "../completeness";
import { CourseEditorValues, courseEditorSchema, slugify } from "../schema";
import {
  FaqEditor,
  ImageFields,
  RichTextField,
  SeoFields,
  SlugField,
  TextField,
} from "./editor-fields";
import { SaveBar } from "./save-bar";

type Option = { id: string; title: string };

const TABS = {
  basics: [
    "title",
    "code",
    "sectionId",
    "link",
    "index",
    "status",
    "qualificationStatus",
    "replacedById",
    "isPopular",
    "imageUrl",
    "imageAlt",
  ],
  content: [
    "heroIntro",
    "whoIsItFor",
    "evidenceExamples",
    "licensingInfo",
    "description",
    "jobOpportunity",
    "entryRequirement",
    "packagingRule",
    "coreUnits",
    "electiveUnits",
    "duration",
    "deliveryMode",
  ],
  faqs: ["faqs"],
  seo: ["metaTitle", "metaDescription", "searchAliases"],
} as const;

type TabName = keyof typeof TABS | "preview";

function tabOf(field: string): TabName {
  const root = field.split(".")[0];
  for (const [tab, fields] of Object.entries(TABS)) {
    if ((fields as readonly string[]).includes(root)) return tab as TabName;
  }
  return "basics";
}

function firstError(errors: FieldErrors): [string, string] | null {
  for (const [key, value] of Object.entries(errors)) {
    if (!value) continue;
    if (typeof value.message === "string") return [key, value.message];
    const nested = firstError(value as FieldErrors);
    if (nested) return [`${key}.${nested[0]}`, nested[1]];
  }
  return null;
}

const PREVIEW_BLOCKS: [keyof CourseEditorValues, string][] = [
  ["heroIntro", "Intro"],
  ["whoIsItFor", "Who it's for"],
  ["evidenceExamples", "Evidence examples"],
  ["licensingInfo", "Licensing"],
  ["description", "Qualification description"],
  ["jobOpportunity", "Job opportunities"],
  ["entryRequirement", "Entry requirements"],
  ["packagingRule", "Packaging rules"],
  ["coreUnits", "Core units"],
  ["electiveUnits", "Elective units"],
];

export function CourseEditor({
  courseId,
  initialValues,
  savedLink,
  savedStatus,
  sections,
  courses,
}: {
  courseId: string | null;
  initialValues: CourseEditorValues;
  savedLink?: string;
  savedStatus?: "DRAFT" | "PUBLISHED";
  sections: Option[];
  courses: (Option & { code: string | null })[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<TabName>("basics");
  const [saving, startSaving] = useTransition();
  const [deleting, setDeleting] = useState(false);
  const isNew = !courseId;

  const form = useForm<CourseEditorValues>({
    resolver: zodResolver(courseEditorSchema),
    defaultValues: initialValues,
  });
  const { control, formState } = form;
  const values = useWatch({ control }) as CourseEditorValues;
  const completeness = courseCompleteness({ ...values, faqCount: values.faqs?.length ?? 0 });

  const errorTabs = new Set(Object.keys(formState.errors).map(tabOf));

  const onSubmit = (data: CourseEditorValues) =>
    startSaving(async () => {
      const result = await saveCourse(courseId, data);
      if (!result.success) {
        for (const [name, message] of Object.entries(result.fieldErrors ?? {})) {
          form.setError(name as keyof CourseEditorValues, { message });
        }
        const field = Object.keys(result.fieldErrors ?? {})[0];
        if (field) setTab(tabOf(field));
        toast.error(result.message);
        return;
      }
      toast.success(isNew ? "Course created" : "Course saved");
      form.reset(data);
      if (isNew) router.replace(`/admin/content/courses/${result.id}`);
      else router.refresh();
    });

  const onInvalid = (errors: FieldErrors<CourseEditorValues>) => {
    const error = firstError(errors);
    if (!error) return;
    setTab(tabOf(error[0]));
    toast.error(error[1]);
  };

  const onDelete = async () => {
    if (!courseId) return;
    setDeleting(true);
    const result = await deleteCourse(courseId);
    setDeleting(false);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Course deleted");
    form.reset(initialValues); // no unsaved-changes prompt on the way out
    router.replace("/admin/content/courses");
  };

  const sitePath = savedLink ? `/courses/${savedLink}` : null;
  const viewHref =
    sitePath &&
    (savedStatus === "PUBLISHED"
      ? sitePath
      : `/api/admin/preview?path=${encodeURIComponent(sitePath)}`);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} noValidate>
        <div className="flex flex-col gap-6 xl:flex-row-reverse">
          <aside className="xl:sticky xl:top-16 xl:w-64 xl:self-start">
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">
                Completeness{" "}
                <span className="tabular-nums">
                  {completeness.score}/{completeness.total}
                </span>
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {completeness.checks.map((check) => (
                  <li key={check.label} className="flex items-center gap-2">
                    {check.ok ? (
                      <CheckCircle2 className="size-4 shrink-0 text-green-700" />
                    ) : (
                      <Circle className="size-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className={cn(!check.ok && "text-muted-foreground")}>{check.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <Tabs value={tab} onValueChange={(v) => setTab(v as TabName)} className="min-w-0 flex-1">
            <TabsList>
              {(["basics", "content", "faqs", "seo", "preview"] as const).map((name) => (
                <TabsTrigger key={name} value={name} className="relative capitalize">
                  {name === "faqs"
                    ? `FAQs (${values.faqs?.length ?? 0})`
                    : name === "seo"
                      ? "SEO"
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
                          // New courses: the slug follows the title until edited
                          if (isNew && !formState.dirtyFields.link) {
                            form.setValue("link", slugify(e.target.value), {
                              shouldValidate: false,
                            });
                          }
                        }}
                        placeholder="Certificate III in Carpentry"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-6 md:grid-cols-3">
                <TextField<CourseEditorValues>
                  name="code"
                  label="National code"
                  placeholder="CPC30220"
                />
                <FormField
                  control={control}
                  name="sectionId"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Section</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a section" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sections.map((section) => (
                            <SelectItem key={section.id} value={section.id}>
                              {section.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SlugField<CourseEditorValues> name="link" prefix="/courses/" isNew={isNew} />
              <div className="grid gap-6 md:grid-cols-3">
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
                      <FormDescription>
                        Drafts 404 publicly and stay out of the sitemap.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="index"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position in section</FormLabel>
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
                <FormField
                  control={control}
                  name="isPopular"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Popular</FormLabel>
                      <div className="flex h-9 items-center gap-2">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <span className="text-sm text-muted-foreground">
                          Feature in popular lists
                        </span>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <FormField
                  control={control}
                  name="qualificationStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualification status</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CURRENT">Current</SelectItem>
                          <SelectItem value="SUPERSEDED">Superseded</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {values.qualificationStatus === "SUPERSEDED" && (
                  <FormField
                    control={control}
                    name="replacedById"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Replaced by</FormLabel>
                        <Select
                          value={field.value ?? ""}
                          onValueChange={(v) => field.onChange(v || null)}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose the new qualification" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courses
                              .filter((course) => course.id !== courseId)
                              .map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.code ? `${course.code} · ` : ""}
                                  {course.title}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <ImageFields<CourseEditorValues> description="Optional. Without one, the page shows the section's image." />
            </TabsContent>

            <TabsContent
              value="content"
              forceMount
              className="space-y-8 pt-4 data-[state=inactive]:hidden"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <TextField<CourseEditorValues>
                  name="duration"
                  label="Duration"
                  placeholder="4–8 weeks"
                  description="Typical time from application to certificate."
                />
                <TextField<CourseEditorValues>
                  name="deliveryMode"
                  label="Delivery"
                  placeholder="Online assessment, Australia-wide"
                />
              </div>
              <RichTextField<CourseEditorValues>
                name="heroIntro"
                label="Intro"
                description="2–3 sentences unique to this qualification, shown at the top of the page."
                minHeight="6rem"
              />
              <RichTextField<CourseEditorValues>
                name="whoIsItFor"
                label="Who it's for"
                description="Job titles and experience that suit this qualification."
              />
              <RichTextField<CourseEditorValues>
                name="evidenceExamples"
                label="Evidence examples"
                description="What evidence people typically provide (photos, references, payslips…)."
              />
              <RichTextField<CourseEditorValues>
                name="licensingInfo"
                label="Licensing"
                description="Trades only: what else is needed for a licence, per state. Use a callout for warnings."
              />
              <RichTextField<CourseEditorValues>
                name="description"
                label="Qualification description"
              />
              <RichTextField<CourseEditorValues> name="jobOpportunity" label="Job opportunities" />
              <RichTextField<CourseEditorValues>
                name="entryRequirement"
                label="Entry requirements"
              />
              <RichTextField<CourseEditorValues> name="packagingRule" label="Packaging rules" />
              <RichTextField<CourseEditorValues> name="coreUnits" label="Core units" />
              <RichTextField<CourseEditorValues> name="electiveUnits" label="Elective units" />
            </TabsContent>

            <TabsContent value="faqs" forceMount className="pt-4 data-[state=inactive]:hidden">
              <FaqEditor<CourseEditorValues> minimum={MIN_FAQS} />
            </TabsContent>

            <TabsContent
              value="seo"
              forceMount
              className="space-y-6 pt-4 data-[state=inactive]:hidden"
            >
              <SeoFields<CourseEditorValues>
                path={`/courses/${values.link || "…"}`}
                fallbackTitle={values.title || "Course title"}
              />
              <FormField
                control={control}
                name="searchAliases"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search aliases</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        value={field.value.join("\n")}
                        onChange={(e) => field.onChange(e.target.value.split("\n"))}
                        onBlur={() =>
                          field.onChange(field.value.map((v) => v.trim()).filter(Boolean))
                        }
                        placeholder={"cert 3 carpentry\ncarpentry rpl"}
                      />
                    </FormControl>
                    <FormDescription>
                      One per line. Other names people search for; used by site search and related
                      links (not meta keywords).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm text-muted-foreground">
                Search Console stats for this page arrive with the analytics update.
              </p>
            </TabsContent>

            <TabsContent value="preview" className="pt-4">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>Unsaved content, with the live page styles.</span>
                {viewHref && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={viewHref} target="_blank" prefetch={false}>
                      <ExternalLink />
                      {savedStatus === "PUBLISHED" ? "View live page" : "Preview saved draft"}
                    </Link>
                  </Button>
                )}
              </div>
              <article className="space-y-8 rounded-lg border p-6">
                <h1 className="text-3xl font-bold">{values.title || "Untitled course"}</h1>
                {PREVIEW_BLOCKS.map(([field, label]) =>
                  values[field] ? (
                    <section key={field}>
                      <h2 className="mb-3 text-xl font-semibold text-emerald-800">{label}</h2>
                      <RichText html={values[field] as string} />
                    </section>
                  ) : null,
                )}
                {values.faqs?.length > 0 && (
                  <section>
                    <h2 className="mb-3 text-xl font-semibold text-emerald-800">FAQs</h2>
                    <div className="space-y-4">
                      {values.faqs.map((faq, i) => (
                        <div key={i}>
                          <h3 className="font-semibold">{faq.question}</h3>
                          <RichText html={faq.answer} className="mt-1" />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            </TabsContent>
          </Tabs>
        </div>

        <SaveBar
          dirty={formState.isDirty}
          saving={saving}
          onDiscard={() => form.reset()}
          extra={
            courseId && (
              <DeleteDialog
                title="Delete this course?"
                description="This also deletes its reviews and FAQs, and the page will 404. To hide it instead, set it to Draft."
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
